import express from 'express';
import UserService from '../services/UserService.js';
import { publishUserEvent } from '../messages/userMessage.js';

const router = express.Router();

router.post('/users/signup', async (req, res) => {
  const token = req.cookies._auth;
  
  try {
    const {firstName, lastName, email, password, city, street, postalCode} = req.body;
    const result = await UserService.signUp(firstName, lastName, email, password, city, street, postalCode,token);
    console.log(result);
    await publishUserEvent({
      userType: result.userType,
      firstName,
      lastName,
      email
    }, 'created');
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/users/signin', async (req, res) => {
  try {
    const { email, password , frontendUserType} = req.body;
    const result = await UserService.signIn(email, password, frontendUserType);
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
