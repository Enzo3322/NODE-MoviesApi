import { NextFunction, Request, Response } from "express";

export default function validateApiKey(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({ error: "Missing API key" });
  }

  if (apiKey !== process.env.X_API_KEY) {
    return res.status(401).json({ error: "Invalid API key" });
  }

  next();
}
