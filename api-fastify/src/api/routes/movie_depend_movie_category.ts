import { FastifyInstance } from "fastify"
import MovieDependMovieCategoryController from "@/api/controllers/movie_depend_movie_category"

export default async function MovieDependMovieCategoryRoutes(fastify: FastifyInstance) {
  const controller: MovieDependMovieCategoryController = new MovieDependMovieCategoryController()

  fastify.post("/movie-depend-movie-categories", controller.Create.bind(controller))
  fastify.delete("/movie-depend-movie-categories/:id", controller.Remove.bind(controller))
}
