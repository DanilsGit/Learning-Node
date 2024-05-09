const { Router } = require('express');
const router = Router();

const {getUsers, CreateUser, getUserById, deleteUserById, updateUserById} = require('../controllers/index.controller');

router.get('/api/users', getUsers);
router.post('/api/users', CreateUser);
router.get('/api/users/:id', getUserById);
router.delete('/api/users/:id', deleteUserById);
router.put('/api/users/:id', updateUserById);

module.exports = router;