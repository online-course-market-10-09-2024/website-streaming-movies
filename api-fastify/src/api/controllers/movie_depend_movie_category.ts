import { FastifyRequest, FastifyReply } from "fastify"

import { ReturnMessage } from "@/types/message"
import MovieDependMovieCategoryService from "@/api/services/movie_depend_movie_category"
import { MovieDependMovieCategory } from "@/types/movie_depend_movie_category"
import { HttpStatus } from "@/types/http_status"

export default class MovieDependMovieCategoryController {
  private service: MovieDependMovieCategoryService

  constructor() {
    this.service = new MovieDependMovieCategoryService()
  }

  public async Create(
    request: FastifyRequest<{ Body: MovieDependMovieCategory }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.service.Create(request.body)
    this.sendResponse(reply, result)
  }

  public async Remove(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.service.Remove(request.params.id)
    this.sendResponse(reply, result)
  }

  private sendResponse = (reply: FastifyReply, result: ReturnMessage): void => {
    if (result.success) {
      reply.code(HttpStatus.OK).send(result)
    } else {
      reply.code(HttpStatus.SERVER_ERROR).send(result)
    }
  }
}
