import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

const UserService = {
  async signUp(firstName, lastName, email, password, city, street, postalCode, token) {
    let userType = 'customer';

    try {
      if (token) {
        jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) => {
          if (err) {
            throw new Error('Invalid token');
          }
          if (decoded.userType === 'admin') {
            userType = 'admin';
          }
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ userType, firstName, lastName, email, password: hashedPassword, city, street, postalCode});
      await user.save();
      return { message: 'User created successfully', userType };
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  },

  async signIn(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Authentication failed');
      }
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Authentication failed');
      }
      const token = jwt.sign({ 
        userId: user._id,
        userType: user.userType,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }, process.env.AUTH_SECRET, { expiresIn: '1h' });
      return { token, firstName: user.firstName, lastName: user.lastName, userType: user.userType, role: user.role, email: user.email };
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      throw new Error(err.message);
    }
  }
};

export default UserService;
