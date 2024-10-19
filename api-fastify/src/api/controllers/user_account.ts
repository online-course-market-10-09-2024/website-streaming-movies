import { FastifyRequest, FastifyReply } from "fastify"
//import status from "http-status";

//const httpStatus = import("http-status");

import { UserAccount } from "@/types/user_account"
import UserAccountService from "@/api/services/user_account"
import { ReturnMessage } from "@/types/message"

export default class UserAccountController {
  private service: UserAccountService

  constructor() {
    this.service = new UserAccountService()
  }

  async create(
    request: FastifyRequest<{ Body: UserAccount }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.service.create(request.body)
    this.sendResponse(reply, result)
  }

  async update(
    request: FastifyRequest<{ Body: UserAccount }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.service.update(request.body)
    this.sendResponse(reply, result)
  }

  async remove(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ): Promise<void> {
    const result = await this.service.remove(request.params.id)
    this.sendResponse(reply, result)
  }

  async count(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const result = await this.service.count()
    this.sendResponse(reply, result)
  }

  async getProfile(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ): Promise<void> {
    const input = request.params.id
    const result = await this.service.getProfile(input)
    this.sendResponse(reply, result)
  }

  private sendResponse = (reply: FastifyReply, result: ReturnMessage): void => {
    if (result.success) {
      reply.code(200).send(result)
    } else {
      reply.code(500).send(result)
    }
  }
}
