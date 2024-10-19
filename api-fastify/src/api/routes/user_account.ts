import { FastifyInstance } from "fastify"
import UserAccountController from "@/api/controllers/user_account"

export default async function UserAccountRoutes(fastify: FastifyInstance) {
  const controller: UserAccountController = new UserAccountController()

  fastify.post("/users", controller.create.bind(controller))
  fastify.put("/users", controller.update.bind(controller))
  fastify.delete("/users/:id", controller.remove.bind(controller))
  fastify.get("/users/count", controller.count.bind(controller))
  fastify.get("/users/:id", controller.getProfile.bind(controller))
}
