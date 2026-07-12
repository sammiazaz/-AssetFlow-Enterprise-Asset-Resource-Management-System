import { prisma } from '@/lib/prisma';

export class CategoryService {
  static async getAllCategories() {
    const categories = await prisma.category.findMany();
    
    return categories.map(cat => ({
      ...cat,
      fields: JSON.parse(cat.fields)
    }));
  }

  static async createCategory(body: any) {
    const fieldsArray = Array.isArray(body.fields) ? body.fields : [];
    
    const category = await prisma.category.create({
      data: {
        name: body.name,
        fields: JSON.stringify(fieldsArray),
      },
    });

    return {
      ...category,
      fields: JSON.parse(category.fields)
    };
  }
}
