import { genToken } from 'Utils/Authentication';
import userModel from './user.model';
import { comparePass, encryptPass } from '../../../Utils/cryptPass';

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  const isMatch = await comparePass(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      message: 'Invalid credentials',
    });
  }
  const token = genToken(user._id);
  return res.header('auth-token', token).json({
    message: 'Login success'
  });
};

export const createUser = async (req, res) => {
  const { name, username, password } = req.body;
  const user = await userModel.findOne({ username });
  if (user) {
    return res.status(409).json({
      message: 'User already exists',
    });
  }
  const newUser = {
    name,
    username,
    password: await encryptPass(password),
  };
  try {
    const data = await userModel.create(newUser);
    return res.status(201).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error al crear el usuario',
      code: 500,
    });
  }
};

export const updateUser = async (req, res) => {
  const { idUser } = req;
  const { name, username, password } = req.body;
  const actualUser = await userModel.findById(idUser);
  const user = await userModel.findOne({ username });
  if (user && actualUser.username !== username) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }
  const updatedUser = {
    name,
    username,
    password: await encryptPass(password),
  };
  try {
    const data = await userModel.findByIdAndUpdate(idUser, updatedUser);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error updating user',
      code: 500,
    });
  }
};
