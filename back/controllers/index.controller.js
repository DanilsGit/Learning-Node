const { Router } = require('express');
const router = Router();

const { Pool } = require('pg')
const pool = new Pool(
    {
        user: 'postgres',
        host: 'localhost',
        database: 'pruebasAPI',
        password: '123',
    }
)

const getUsers = async (req, res) => {
    const response = await pool.query(
        'SELECT * FROM users',
        (error, result) => {
        if (error) throw error;
        res.json(result.rows);
    });
};

const CreateUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        const response = await pool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
            [name, email]
        );
        const id = response.rows[0].id;
        res.status(201).json({
            user: {id, name, email}
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    // if (response.rows.length === 0) {
    //     return res.status(404).json({ message: 'User not found' });
    // }
    res.json(response.rows[0]);
};

const deleteUserById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query(
        'DELETE FROM users WHERE id = $1',
        [id]
    );
    res.json({ message: 'User deleted' });
};

const updateUserById = async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const response = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id]
    );
    res.json({ message: 'User updated' });
}

module.exports = {
    getUsers,
    CreateUser,
    getUserById,
    deleteUserById,
    updateUserById
};