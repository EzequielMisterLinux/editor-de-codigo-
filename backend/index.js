import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Importa cors

const app = express();
app.use(cors()); // Habilita CORS
app.use(express.json());

// Conectar a la base de datos MongoDB
mongoose.connect("mongodb://admin:password@localhost:27017/arquitecturasistemas?authSource=admin", {
});

// Definir el esquema y modelo
const codeSchema = new mongoose.Schema({
    html: String,
    css: String,
    js: String,
});

const Code = mongoose.model('Code', codeSchema);

// Endpoint para guardar el código
app.post('/guardar', async (req, res) => {
    const { html, css, js } = req.body;

    try {
        const newCode = new Code({ html, css, js });
        await newCode.save();
        res.status(201).send('Código guardado exitosamente');
    } catch (error) {
        res.status(500).send('Error al guardar el código');
    }
});

// Endpoint para obtener los bloques de código
app.get('/', async (req, res) => {
    try {
        const codes = await Code.find({});
        res.json(codes);
    } catch (error) {
        res.status(500).send('Error al obtener los bloques de código');
    }
});

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
