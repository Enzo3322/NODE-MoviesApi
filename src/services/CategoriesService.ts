import { getRepository } from "typeorm";
import { Category } from "../entities/Category";
import { CategoryRequest, CategoryUpdateReq } from "../types/categories";

export default class CategoriesService {
  async getAll() {
    const repo = getRepository(Category);

    const categories = await repo.find();

    return categories;
  }

  async create({
    name,
    description,
  }: CategoryRequest): Promise<Category | Error> {
    const repo = getRepository(Category);

    if (await repo.findOne({ name })) {
      return new Error("Category already exists");
    }

    const category = repo.create({
      name,
      description,
    });

    await repo.save(category);

    return category;
  }

  async delete(id: string) {
    const repo = getRepository(Category);

    const category = await repo.findOne(id);

    if (!category) {
      return new Error("Category does not exists");
    }

    await repo.delete(id);
  }

  async update({ id, name, description }: CategoryUpdateReq) {
    const repo = getRepository(Category);

    const category = await repo.findOne(id);

    if (!category) {
      return new Error("Category does not exists");
    }

    category.name = name ? name : category.name;
    category.description = description ? description : category.description;

    await repo.save(category);

    return category;
  }
}
