import { Request, Response } from "express";
import CategoriesService from "../services/CategoriesService";

export class CategoriesController {
  async create(req: Request, res: Response) {
    const { name, description } = req.body;

    const service = new CategoriesService();

    const result = await service
      .create({ name, description })
      .catch(() => res.send("Something exploded on CreateCategoriesService"));

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const service = new CategoriesService();

    const result = await service.delete(id);

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.status(204).send("Category deleted");
  }

  async getAll(req: Request, res: Response) {
    const service = new CategoriesService();

    const result = await service.getAll();

    return res.json(result);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    const service = new CategoriesService();

    const result = await service.update({ id, description, name });

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }
}
