import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';

export class EmployeeService {
  static async getAllEmployees() {
    const employees = await prisma.user.findMany();
    // Omit passwords from the response
    return employees.map(({ password, ...rest }) => rest);
  }

  static async createEmployee(body: any) {
    const existing = await prisma.user.findUnique({
      where: { email: body.email }
    });
    if (existing) {
      throw new Error('Email already exists');
    }

    const defaultPassword = 'password123';
    const passwordHash = await hashPassword(defaultPassword);

    const employee = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: passwordHash,
        role: body.role || 'Employee',
        status: body.status || 'Active',
        departmentId: body.departmentId || null,
      },
    });

    const { password, ...safeEmployee } = employee;
    return safeEmployee;
  }
}
