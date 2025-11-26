
const express = require('express');
const app = express();

// Configuración de puerto. Usa el puerto de entorno o 3000 por defecto.
const port = process.env.PORT || 3000;

// ====================================================================
// Rutas Estáticas y Principal (Para cumplir con la UX básica)
// ====================================================================

// Ruta de inicio simple para mostrar la funcionalidad de la API.
app.get('/', (req, res) => {
  res.send(`
    <body style="font-family: sans-serif; background-color: #f4f4f9; padding: 20px; text-align: center;">
      <div style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h1 style="color: #4CAF50;">Request Header Parser Microservice</h1>
        <p style="color: #555;">Accede a <code>/api/whoami</code> para ver la información de tu encabezado de solicitud (Header).</p>
        <p style="margin-top: 25px;"><strong>Ejemplo de uso:</strong></p>
        <code style="display: inline-block; padding: 10px 15px; background-color: #eee; border-radius: 6px; font-size: 1em;">
          <a href="/api/whoami" style="color: #007BFF; text-decoration: none;">/api/whoami</a>
        </code>
        <p style="margin-top: 20px; font-size: 0.9em; color: #777;">La respuesta será un objeto JSON con tu IP, idioma y software.</p>
      </div>
    </body>
  `);
});

// ====================================================================
// Lógica del Microservicio: /api/whoami
// ====================================================================

app.get('/api/whoami', (req, res) => {
  // 1. Obtener la IP del cliente.
  // req.ip es la forma recomendada en Express, a menudo configurada para proxies.
  // Usamos un simple ajuste para limpiar el prefijo IPv6 si está presente.
  let ipaddress = req.ip;
  if (ipaddress.startsWith('::ffff:')) {
    ipaddress = ipaddress.substring(7);
  }

  // 2. Obtener el idioma preferido del cliente (Accept-Language header)
  // El header puede contener múltiples idiomas (e.g., "es-ES,es;q=0.9,en;q=0.8").
  // Solo se toma el primer idioma (el de mayor prioridad).
  const languageHeader = req.headers['accept-language'];
  const language = languageHeader ? languageHeader.split(',')[0] : 'Unknown';

  // 3. Obtener la información del software/sistema operativo (User-Agent header)
  const software = req.headers['user-agent'] || 'Unknown';

  // Devolver el objeto JSON requerido.
  res.json({
    ipaddress: ipaddress,
    language: language,
    software: software
  });
});

// ====================================================================
// Iniciar el Servidor
// ====================================================================

app.listen(port, () => {
  console.log(`Wartot está escuchando en el puerto: ${port}`);
  console.log(`Accede a http://localhost:${port}`);
});
