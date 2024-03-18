import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userType: { type: String, enum: ['admin', 'customer'], required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String },
  street: { type: String },
  postalCode: { type: String },
  role: { type: String }
});

export default mongoose.model('User', userSchema);