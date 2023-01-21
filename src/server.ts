import "reflect-metadata";
import "./database";
import express from "express";
require("dotenv").config();
import cors from "cors";

import { routes } from "./routes";
import validateApiKey from "./middlewares/xApiKey";
const app = express();

app.use(express.json());
app.use(validateApiKey);
app.use(cors({ origin: "http://localhost:3000" }));
app.use(routes);

app.listen(3000, () => console.log("running at http://localhost:3000"));
