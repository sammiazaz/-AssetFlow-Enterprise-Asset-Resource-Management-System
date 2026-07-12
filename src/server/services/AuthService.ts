import { prisma } from '@/lib/prisma';
import { hashPassword, comparePassword, generateToken, verifyToken } from '@/lib/auth';
import { loginSchema, registerSchema } from '@/lib/validation';

export class AuthService {
  static async login(body: any) {
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      throw new Error(JSON.stringify({ type: 'ValidationFailed', details: result.error.flatten() }));
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  static async register(body: any) {
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      throw new Error(JSON.stringify({ type: 'ValidationFailed', details: result.error.flatten() }));
    }

    const { email, password, name, departmentId } = result.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: passwordHash,
        name,
        role: 'Employee',
        status: 'Active',
        departmentId: departmentId || null,
      },
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  static async getCurrentUser(token: string) {
    const decoded = verifyToken(token);
    if (!decoded) {
      throw new Error('Invalid or expired token');
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: {
        department: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
