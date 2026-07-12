import { prisma } from '@/lib/prisma';

export class DepartmentService {
  static async getAllDepartments() {
    return prisma.department.findMany();
  }

  static async createDepartment(body: any) {
    return prisma.department.create({
      data: {
        name: body.name,
        headId: body.headId || null,
        parentId: body.parentId || null,
        status: body.status || 'Active',
      },
    });
  }
}
