const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

const ProjetoController = require('../controllers/projeto-controller');

router.get('/', ProjetoController.getProjeto);
router.post('/', ProjetoController.postProjeto);
router.get('/:id', ProjetoController.getProjetoId);
router.patch('/', ProjetoController.patchProjeto);
router.delete('/:id', ProjetoController.deleteProjeto);

module.exports = router;