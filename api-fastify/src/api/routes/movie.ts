import { FastifyInstance } from "fastify"
import MovieController from "@/api/controllers/movie"

export default async function MovieDirectorRoutes(fastify: FastifyInstance) {
  const controller: MovieController = new MovieController()

  fastify.post("/movies", controller.Create.bind(controller))
  fastify.patch("/movies", controller.Update.bind(controller))
  fastify.delete("/movies/:id", controller.Remove.bind(controller))
  fastify.get("/movies/count", controller.Count.bind(controller))
  fastify.get("/movies", controller.GetAll.bind(controller))
}
