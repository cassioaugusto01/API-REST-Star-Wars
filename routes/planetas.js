let express = require('express');
const router = express.Router();
const PlanetaDB = require('../model/PlanetaDB').default;
const exec = require('./utils');
let fs = require('fs');



// GET em /planetas
router.get('/', exec(async (req, res, next) => {
    let planetas = await PlanetaDB.getPlanetas();
    res.json(planetas);
}));

// GET em /id
router.get('/id/:id', exec(async (req, res, next) => {
    let id = req.params.id;
    let planeta = await PlanetaDB.getPlanetaById(id);
    res.json(planeta)
}));

// DELETE em /id
router.delete('/id/:id', exec(async (req, res, next) => {
    let id = req.params.id;
    let affectedRows = await PlanetaDB.deleteById(id);
    console.log("affectedRows: " , affectedRows);
    res.json({msg: affectedRows > 0 ? 'Planeta deletado com sucesso.' : "Nenhum planeta excluído."});
}));

// GET em /xxx
router.get('/:clima', exec(async (req, res, next) => {
    let clima = req.params.clima;
    let planetas = await PlanetaDB.getPlanetasByClima(clima);
    res.json(planetas);
}));

// GET em /xxx
router.get('/:nome', exec(async (req, res, next) => {
    let nome = req.params.nome;
    let planetas = await PlanetaDB.getPlanetasByNome(nome);
    res.json(planetas);
}));

// POST para salvar um planeta
router.post('/', exec(async (req, res, next) => {
    // Planeta enviado no formato JSON
    let planeta = await PlanetaDB.save(req.body);
    res.json(planeta);
}));

// PUT para atualizar um planeta
router.put('/', exec(async (req, res, next) => {
    // Planeta enviado no formato JSON
    let planeta = await PlanetaDB.update(req.body);
    res.json({msg: 'Planeta atualizado com sucesso.'});
}));

module.exports = router;