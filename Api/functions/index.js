// Importa las librerías necesarias
const {onRequest} = require("firebase-functions/v2/https");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");
const {initializeApp} = require("firebase-admin/app");

// Importa 'cors' para evitar problemas de conexión desde la app
const cors = require("cors")({origin: true});

// Inicializa la conexión con la base de datos (SOLO UNA VEZ)
initializeApp();
const db = getFirestore();

// ---
// ENDPOINT 1: Para recibir datos de la Raspberry Pi
// ---
exports.ingestData = onRequest(async (req, res) => {
  // Envolvemos la función con CORS
  cors(req, res, async () => {
    // 1. Verificamos que sea un método POST
    if (req.method !== "POST") {
      res.status(405).send("Método no permitido. Usa POST.");
      return;
    }

    // 2. Obtenemos los datos que envía la Raspberry Pi
    const data = req.body;
    // Ej: data = { pondId: "pond1", ph: 7.1, temp: 28, od: 6.5, ... }

    // 3. --- TAREA 1: Actualizar el estado actual en la colección 'ponds' ---

    // Define tus rangos MÁXIMOS para calcular el level (0.0 a 1.0)
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

    // Lógica para determinar el status
    let currentStatus = "Normal";

    const UMBRAL_CRITICO = 0.85; // 85%
    const UMBRAL_ADVERTENCIA = 0.60; // 60%

    for (const metric of metricsArray) {
      if (metric.level > UMBRAL_ADVERTENCIA) {
        currentStatus = "Advertencia";
      }

      if (metric.level > UMBRAL_CRITICO) {
        currentStatus = "Crítico";
        break;
      }
    }

    // Preparamos el documento para 'ponds'
    const pondRef = db.collection("ponds").doc(data.pondId);
    await pondRef.set(
        {
          lastUpdate: FieldValue.serverTimestamp(),
          status: currentStatus,
          metrics: metricsArray,
        },
        {merge: true},
    );

    // Guardar en 'metrics_history'

    const batch = db.batch();
    const timestamp = FieldValue.serverTimestamp();

    const metricNames = ["ph", "temp", "od", "ec", "turb"];

    // Iteramos sobre el array y creamos un documento por cada métrica
    metricNames.forEach((metricName) => {
      if (data[metricName] !== undefined) {
        const docRef = db.collection("metrics_history").doc(); // ID aleatorio
        batch.set(docRef, {
          pondId: data.pondId,
          metric: metricName,
          value: data[metricName],
          timestamp: timestamp,
        });
      }
    });

    // 5. Ejecutamos todas las escrituras a la vez
    await batch.commit();

    // 6. Respondemos a la Raspberry Pi que todo salió bien
    res.status(200).send({success: true, message: "Datos guardados"});
  });
});

// ---
// ENDPOINT 2: Para que la app móvil lea la lista de estanques
// ---
exports.getPondsList = onRequest(async (req, res) => {
  // Envolvemos la función con CORS
  cors(req, res, async () => {
    // 1. Verificamos que sea un método GET
    if (req.method !== "GET") {
      res.status(405).send("Método no permitido. Usa GET.");
      return;
    }

    // 2. Consultamos la colección 'ponds'
    const snapshot = await db.collection("ponds").get();

    // 3. Preparamos el array de respuesta
    const pondsList = [];
    snapshot.forEach((doc) => {
      pondsList.push(doc.data());
    });

    // 4. Enviamos el array como un JSON
    res.status(200).json(pondsList);
  });
});

// ---
// ENDPOINT 3 (Ejemplo): Para leer el historial de una métrica
// ---
exports.getHistory = onRequest(async (req, res) => {
  cors(req, res, async () => {
    // Leemos los parámetros de la URL, ej: /getHistory?pondId=pond1
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
        .orderBy("timestamp", "desc") // Los más nuevos primero
        .limit(100) // Traemos solo los últimos 100
        .get();

    const historyList = [];
    snapshot.forEach((doc) => {
      historyList.push(doc.data());
    });

    res.status(200).json(historyList);
  });
});
