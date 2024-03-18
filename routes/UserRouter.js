import express from 'express';
import UserService from '../services/UserService.js';

const router = express.Router();

router.post('/users/signup', async (req, res) => {
  try {
    const { userType, firstName, lastName, email, password, city, street, postalCode, role, token } = req.body;
    const result = await UserService.signUp(userType, firstName, lastName, email, password, city, street, postalCode, role, token);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/users/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.signIn(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
