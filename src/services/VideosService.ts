import { getRepository, Like } from "typeorm";
import { Category } from "../entities/Category";
import { Video } from "../entities/Video";
import { VideoUpdateReq } from "../types/videos";

export default class VideosService {
  async create({
    name,
    duration,
    description,
    category_id,
  }: any): Promise<Error | Video> {
    const repo = getRepository(Video);
    const repoCategory = getRepository(Category);

    try {
      await repoCategory.findOneOrFail(category_id);
    } catch (error) {
      return new Error("Category does not exists!");
    }

    const video = repo.create({ name, duration, description, category_id });
    await repo.save(video);

    return video;
  }

  async delete(id: string) {
    const repo = getRepository(Video);

    const video = await repo.findOne(id);

    if (!video) {
      return new Error("Video does not exists");
    }

    await repo.delete(id);
  }

  async getAll({ page, limit }) {
    const repo = getRepository(Video);

    const videos = await repo.find({
      relations: ["category"],
      take: limit,
      skip: (page - 1) * limit,
    });

    return videos;
  }

  async getAllByName({ name, page, limit }) {
    const repo = getRepository(Video);

    const videos = await repo.find({
      where: { name: Like(`%${name}%`) },
      relations: ["category"],
      take: limit,
      skip: (page - 1) * limit,
    });

    return videos;
  }

  async getAllByCategoryName({ categoryName, page, limit }) {
    const repo = getRepository(Video);
    const categoryRepo = getRepository(Category);

    const category = await categoryRepo.findOne({
      where: { name: categoryName },
    });
    if (!category) {
      return new Error("Category not found");
    }

    const videos = await repo.find({
      where: { category: category },
      take: limit,
      skip: (page - 1) * limit,
    });

    return videos;
  }

  async update({ id, name, duration, description }: VideoUpdateReq) {
    const repo = getRepository(Video);

    const video = await repo.findOne(id);

    if (!video) {
      return new Error("Video does not exists");
    }

    video.name = name ? name : video.name;
    video.duration = duration ? duration : video.duration;
    video.description = description ? description : video.description;

    await repo.save(video);

    return video;
  }
}
