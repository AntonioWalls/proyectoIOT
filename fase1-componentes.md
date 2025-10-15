Este primer listado tiene el objetivo de seleccionar/elegir componentes robustos, con un buen soporte de librerias y fáciles de integrar a los ecosistemas de Arduino y Raspberry Pi con un poco de alternativas mas potentes.

# NIVEL DE GATEAY LOCAL.
    1. Minicomputadora: Raspberry Pi 4 Modelo B (4GB o 8GB).
        El modelo 4B ofrece mayor potencia de procesamiento y memoria RAM para manejar múltiples conexiones seriales (varios arduinos), ejecutar scripts de preprocesamiento y mantener conexión MQTT robusta con la nube.
    2. Almacenamiento: Tarjeta MicroSD de 32GB (clase 10 o superior).
        "Suficiente" espacio para el sistema operativo (Raspberry Pi OS), logs de datos y scripts. Una clase de alta velocidad (A1/U3) garantiza un mejor rendimiento y fiabilidad.
    3. Comunicación serial: Cable USB a Micro-USB o adaptador USB a Serial TTL.
        Permite la comunicación por cable directo. El adaptador Serial TTl sera util si consideramos integrar Arduino directmente a los pines GPIO de la Pi, sin usar USB.

# NIVEL DE CAMPO.
## Microcontrolador.
    1. Microcontrolador: ESP32 Dev Kit o Arduino Mega 2560.
        - ESP32. Incluye Wi-Fi y Bluetooth nativos, mayor potencia y más memoria que arduino. Simplificaría la arquitectura si se conecta directamente a la red local (eliminando la necesidad de la Raspberry Pi en entornos con cobertura Wi-Fi), o permite una comunicación más avanzada con el Pi.
        - Arduino Mega. Si el proyecto debe usar muchos sensores que requieren pines analógicos y digitales, la Mega tiene muchos más que un arduino uno. Más robusta y fiables.

## Sensores críticos.
    1. pH: Sonda de pH BNC (tipo industrial).
        Interfaz: Kit de sensor de pH de EZO de Atlas Scientific o DFRobot Gravity: Analog pH sensor Kit.
            » Atlas Scientific es el estándar de la industrial para IoT/DIY, ofrece la mejor precisión y estabilidad con comunicación UART/I2C o analógica. DFRobot es una opción más económica y común con Arduino.
    2. Oxígeno disuelto (OD): Sonda de OD D-500.
        Interfaz. Kit de sensor de OD de EZO de Atlas Scientific o DFRobot Gravity: Analog Dissolved Oxygen Sensor.
            » Al igual que el pH, la interfaz EZO simplifica enormemente la calibración y lectura del sensor de OD, proporcionando datos digitales listos para usar.
    3. Conductividad (CE): Sonda de conductividad (K=1.0 o K=10).
        Interfaz. Kit de sensr de EC de EZO de Atlas Scientific o DFRobot Gravity: Analog EC Sensor Kit.
            » La interfaz es crucial paraa compensar la temperatura de la lectura de CE, ya que la conductividad depende furtemente de ella.

## Sensores comunes.
    1. Temperatura: Sonda DS18B20 (impermeable).
        Muy precisa, utilizaun solo pin digital y es muy robusta en entornos acuáticos.
    2. Turbidez: Sensor de turbidez analógico o digital (FC-100). 
        Mide el nivel de partículas. Asegurate de elegir uno que esté diseñado para una inmersión continua, si es posible, o que sea fácil de limpiar.

## Actuadores.
    1. Control de equipos: Modulo de Relé de 4 u 8 canales (5V, optoacoplado).
        Este tipo de módulos ailan el microcontroldor de la alta tensión de los aireadores/bombas, lo cual será fundamental para la seguridad del sistema. Debe ser capaz de manejar la carga de los equipos que se vayan a controlar.
    2. Fuente de alimentación conmutada (min. 5V/3A) + cargador solar.
        Una fuente fiable para el microcontrolador y los sensores, idealmente respaldada por un sistema solar pequeño o batería, cosiderand la lejanía potencial de las granjas.

# PROTOCOLO INTERNO.
    » Arduino + Raspberry Pi = Comunicación serial.
    » ESP32 - cable = MQTT.
    » Raspberry Pi + ESP32 = HTTP/REST.

# ENCAPSULAMIENTO.
Teniendo en cuenta que el entorno en el que se encontrara el dispositivo es una área salina y húmeda, hay que tener en cuenta la inversión de una caja NEMA-4X (IP66 o IP67), para el microcontrolador y las interfaces de los sensores.