import { Request, Response } from "express";
import VideosService from "../services/VideosService";

export class VideosController {
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, duration } = req.body;

    const service = new VideosService();
    const result = await service
      .update({
        id,
        description,
        name,
        duration,
      })
      .catch((e) => res.send("Something exploded on UpdateVideoController"));
    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async getAll(req: Request, res: Response) {
    const service = new VideosService();
    const { page, limit } = req.query;

    const videos = await service
      .getAll({ page, limit })
      .catch((e) => res.send("Something exploded on GetAllVideoController"));
    return res.json(videos);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const service = new VideosService();

    const result = await service
      .delete(id)
      .catch((e) => res.send("Something exploded on DeleteVideoController"));

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.status(204).send("Video deleted");
  }

  async create(req: Request, res: Response) {
    const { name, description, category_id, duration } = req.body;

    const service = new VideosService();

    const result = await service
      .create({ name, description, category_id, duration })
      .catch((e) => res.send("Something exploded on CreateVideoController"));

    if (result instanceof Error) {
      return res.status(400).json(result.message);
    }

    return res.json(result);
  }

  async getAllByName(req: Request, res: Response) {
    const service = new VideosService();
    const { page, limit, name } = req.query;

    const videos = await service
      .getAllByName({ page, limit, name })
      .catch(() =>
        res.send("Something exploded on GetAllVideosByNameController")
      );
    return res.json(videos);
  }

  async getAllByCategoryName(req: Request, res: Response) {
    const service = new VideosService();
    const { page, limit, categoryName } = req.query;

    const videos = await service
      .getAllByCategoryName({ page, limit, categoryName })
      .catch(() =>
        res.send("Something exploded on GetAllVideosByCategoryController")
      );
    return res.json(videos);
  }
}
