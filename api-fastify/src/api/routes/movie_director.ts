import { FastifyInstance } from "fastify"
import MovieDirectorController from "@/api/controllers/movie_director"

export default async function MovieDirectorRoutes(fastify: FastifyInstance) {
  const controller: MovieDirectorController = new MovieDirectorController()

  fastify.post("/movie-directors", controller.Create.bind(controller))
  fastify.patch("/movie-directors", controller.Update.bind(controller))
  fastify.delete("/movie-directors/:id", controller.Remove.bind(controller))
  fastify.get("/movie-directors/count", controller.Count.bind(controller))
  fastify.get("/movie-directors", controller.GetAll.bind(controller))
}
