import { Router } from "express";
import { CategoriesController } from "./controllers/CategoriesController";
import { VideosController } from "./controllers/VideosController";

const routes = Router();

routes.post("/categories", new CategoriesController().create);
routes.get("/categories", new CategoriesController().getAll);
routes.put("/categories/:id", new CategoriesController().update);
routes.delete("/categories/:id", new CategoriesController().delete);

routes.post("/videos", new VideosController().create);
routes.get("/videos", new VideosController().getAll);
routes.put("/videos/:id", new VideosController().update);
routes.delete("/videos/:id", new VideosController().delete);

routes.get("/search/category", new VideosController().getAllByCategoryName);
routes.get("/search/videos", new VideosController().getAllByName);

export { routes };
