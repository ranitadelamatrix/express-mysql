

// Obtener todos los productos

const express = require('express');
const app = express();
const { obtenerIntegrantes, crearIntegrantes } = require('./conexionpostre'); // Ruta al archivo del módulo
const router = express.Router()
app.use(express.json());

// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await obtenerIntegrantes();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    const { nombre, apellido } = req.body;
    if (!nombre || !apellido) {
        return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
    }
    try {
        const nuevoUsuario = await crearIntegrantes(nombre, apellido);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

module.exports = router

