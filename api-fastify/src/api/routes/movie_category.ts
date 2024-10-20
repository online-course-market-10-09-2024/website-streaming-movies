import { FastifyInstance } from "fastify"
import MovieCategoryController from "@/api/controllers/movie_category"

export default async function MovieCategoryRoutes(fastify: FastifyInstance) {
  const controller: MovieCategoryController = new MovieCategoryController()

  fastify.post("/movie-categories", controller.Create.bind(controller))
  fastify.patch("/movie-categories", controller.Update.bind(controller))
  fastify.delete("/movie-categories/:id", controller.Remove.bind(controller))
  fastify.get("/movie-categories/count", controller.Count.bind(controller))
  fastify.get("/movie-categories", controller.GetAll.bind(controller))
}
