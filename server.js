const express = require('express');
const path = require('path');
const app = express();

// Para que el servidor pueda usar archivos dentro de "public" (como CSS o JS)
app.use(express.static(path.join(__dirname, 'public')));


// RUTA HOME
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/dashboard-admin.html'));
});

const PORT = 3000;


app.listen(PORT, () => {
    console.log(`Servidor listo en: http://localhost:${PORT}`);
});