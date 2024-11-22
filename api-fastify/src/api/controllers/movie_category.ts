import { FastifyRequest, FastifyReply } from "fastify"

import { ReturnMessage } from "@/types/message"
import MovieCategoryService from "@/api/services/movie_category"
import { MovieCategory } from "@/types/movie_category"
import { HttpStatus } from "@/types/http_status"

export default class MovieCategoryController {
  private service: MovieCategoryService

  constructor() {
    this.service = new MovieCategoryService()
  }

  public async Create(
    request: FastifyRequest<{ Body: MovieCategory }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.service.Create(request.body)
    this.sendResponse(reply, result)
  }

  public async Update(
    request: FastifyRequest<{ Body: MovieCategory }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.service.Update(request.body)
    this.sendResponse(reply, result)
  }

  public async Remove(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.service.Remove(request.params.id)
    this.sendResponse(reply, result)
  }

  public async Count(
    request: FastifyRequest<{
      Querystring: { search: string; limit: number; page: number }
}   >,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.service.Count(request.query.search)
    this.sendResponse(reply, result)
  }

  async GetAll(
    request: FastifyRequest<{
      Querystring: { search: string; limit: number; page: number }
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.service.GetAll(
      request.query.search,
      request.query.limit,
      request.query.page,
    )
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
