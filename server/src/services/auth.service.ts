import { User } from '../models/User';
import { signToken } from '../utils/jwt';
import { UserRole } from '../types';

export const registerService = async (data: any) => {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || UserRole.Sales,
  });

  const token = signToken({ userId: user._id.toString(), role: user.role as UserRole });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const loginService = async (data: any) => {
  const { email, password } = data;

  const user: any = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid credentials');
  }

  const token = signToken({ userId: user._id.toString(), role: user.role as UserRole });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};