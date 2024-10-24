import { FastifyRequest, FastifyReply } from "fastify"

import { ReturnMessage } from "@/types/message"
import MovieDependMovieDirectorService from "@/api/services/movie_depend_movie_director"
import { MovieDependMovieDirector } from "@/types/movie_depend_movie_director"
import { HttpStatus } from "@/types/http_status"

export default class MovieDependMovieDirectorController {
  private service: MovieDependMovieDirectorService

  constructor() {
    this.service = new MovieDependMovieDirectorService()
  }

  public async Create(
    request: FastifyRequest<{ Body: MovieDependMovieDirector }>,
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
