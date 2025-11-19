// Importa las librerías necesarias
const {onRequest} = require("firebase-functions/v2/https");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");
const {initializeApp, messaging} = require("firebase-admin/app");

// Importa 'cors' para evitar problemas de conexión desde la app
const cors = require("cors")({origin: true});

// Inicializa la conexión con la base de datos (SOLO UNA VEZ)
initializeApp();
const db = getFirestore();

// ENDPOINT NOTIFICACIONES
/**
 * Envía una notificación push a los usuarios suscritos a un estanque.
 *
 * Busca los tokens FCM en Firestore y envía un mensaje multicast.
 *
 * @param {string} pondId - El ID único del estanque.
 * @param {string} currentStatus - El estado actual (ej. "Alerta").
 * @param {object} problematicMetric - Objeto con la métrica problemática.
 * @param {string} problematicMetric.labelDetailed - Nombre de la métrica.
 * @param {number|string} problematicMetric.value - Valor actual de la métrica.
 * @param {number} problematicMetric.level - Nivel de gravedad (0-1).
 * @return {Promise<void>} Una promesa que se resuelve al finalizar el envío.
 */
async function sendPushNotification(pondId, currentStatus, problematicMetric) {
  const tokensSnapshot = await db
      .collection("tokens")
      .where("pondId", "==", pondId)
      .get();

  const tokens = tokensSnapshot.docs.map((doc) => doc.data().fcmToken);

  if (tokens.length === 0) {
    console.log(`No hay tokens registrados para el estanque ${pondId}.`);
    return;
  }

  const title = `⚠️ ${currentStatus} en ${pondId}`;

  const pct = (problematicMetric.level * 100).toFixed(0);
  const body = `${problematicMetric.labelDetailed} en ` +
               `${problematicMetric.value}. Nivel: ${pct}%.`;

  const message = {
    notification: {title, body},
    data: {
      pondId: pondId,
      targetScreen: "detail",
    },
    tokens: tokens,
  };

  try {
    const response = await messaging().sendMulticast(message);
    console.log(
        `${response.successCount} notificaciones enviadas a ${pondId}.`,
    );

    if (response.failureCount > 0) {
      console.error(`Error al enviar a ${response.failureCount} tokens.`);
    }
  } catch (error) {
    console.error("Error general al enviar notificación:", error);
  }
}

// ---
// ENDPOINT 1: Para recibir datos de la Raspberry Pi
// ---
exports.ingestData = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      res.status(405).send("Método no permitido. Usa POST.");
      return;
    }

    const data = req.body;

    const RANGES = {
      ph: 14,
      temp: 50,
      od: 10,
      ec: 3000,
      turb: 100,
    };


    const metricsArray = [
      {id: "ph", value: data.ph, level: data.ph / RANGES.ph},
      {id: "temp", value: data.temp, level: data.temp / RANGES.temp},
      {id: "od", value: data.od, level: data.od / RANGES.od},
      {id: "ec", value: data.ec, level: data.ec / RANGES.ec},
      {id: "turb", value: data.turb, level: data.turb / RANGES.turb},
    ];

    let currentStatus = "Normal";
    let problematicMetric = null;

    const UMBRAL_CRITICO = 0.85;
    const UMBRAL_ADVERTENCIA = 0.60;

    for (const metric of metricsArray) {
      if (metric.level > UMBRAL_ADVERTENCIA) {
        currentStatus = "Advertencia";
        problematicMetric = metric;
      }

      if (metric.level > UMBRAL_CRITICO) {
        currentStatus = "Crítico";
        problematicMetric = metric;
        break;
      }
    }

    if (currentStatus !== "Normal" && problematicMetric && data.pondId) {
      await sendPushNotification(
          data.pondId,
          currentStatus,
          problematicMetric,
      );
    }

    const pondRef = db.collection("ponds").doc(data.pondId);
    await pondRef.set(
        {
          lastUpdate: FieldValue.serverTimestamp(),
          status: currentStatus,
          metrics: metricsArray,
        },
        {merge: true},
    );

    const batch = db.batch();
    const timestamp = FieldValue.serverTimestamp();

    const metricNames = ["ph", "temp", "od", "ec", "turb"];

    metricNames.forEach((metricName) => {
      if (data[metricName] !== undefined) {
        const docRef = db.collection("metrics_history").doc();
        batch.set(docRef, {
          pondId: data.pondId,
          metric: metricName,
          value: data[metricName],
          timestamp: timestamp,
        });
      }
    });

    await batch.commit();

    res.status(200).send({success: true, message: "Datos guardados"});
  });
});

// ---
// ENDPOINT 2: Para que la app móvil lea la lista de estanques
// ---
exports.getPondsList = onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== "GET") {
      res.status(405).send("Método no permitido. Usa GET.");
      return;
    }

    const snapshot = await db.collection("ponds").get();

    const pondsList = [];
    snapshot.forEach((doc) => {
      pondsList.push(doc.data());
    });

    res.status(200).json(pondsList);
  });
});

// ---
// ENDPOINT 3 (Ejemplo): Para leer el historial de una métrica
// ---
exports.getHistory = onRequest(async (req, res) => {
  cors(req, res, async () => {
    const pondId = req.query.pondId;
    const metric = req.query.metric;

    if (!pondId || !metric) {
      res.status(400).send("Faltan parámetros 'pondId' o 'metric'.");
      return;
    }

    const snapshot = await db
        .collection("metrics_history")
        .where("pondId", "==", pondId)
        .where("metric", "==", metric)
        .orderBy("timestamp", "desc")
        .limit(100)
        .get();

    const historyList = [];
    snapshot.forEach((doc) => {
      historyList.push(doc.data());
    });

    res.status(200).json(historyList);
  });
});
