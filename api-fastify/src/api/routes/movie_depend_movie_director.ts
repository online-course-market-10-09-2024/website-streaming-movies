import { FastifyInstance } from "fastify"
import MovieDependMovieDirectorController from "@/api/controllers/movie_depend_movie_director"

export default async function MovieDependMovieDirectorRoutes(fastify: FastifyInstance) {
  const controller: MovieDependMovieDirectorController = new MovieDependMovieDirectorController()

  fastify.post("/movie-depend-movie-directors", controller.Create.bind(controller))
  fastify.delete("/movie-depend-movie-directors/:id", controller.Remove.bind(controller))
}
