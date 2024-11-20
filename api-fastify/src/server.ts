import fastify from "fastify"
import UserAccountRoutes from "@/api/routes/user_account"
import cors from "@fastify/cors"
import MovieCategoryRoutes from "./api/routes/movie_category"
import { FastifyRequest, FastifyReply } from "fastify"

// Create server with logging configuration
const server = fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
})

const prefix: string = "/api/"

// Add request logging hook
server.addHook('onRequest', async (request: FastifyRequest, reply: FastifyReply) => {
  request.log.info({
    url: request.url,
    method: request.method,
    headers: request.headers,
    query: request.query,
    params: request.params,
  }, 'incoming request')
})

// Add response logging hook
server.addHook('onResponse', async (request: FastifyRequest, reply: FastifyReply) => {
  request.log.info({
    url: request.url,
    method: request.method,
    statusCode: reply.statusCode,
    responseTime: reply.elapsedTime,
  }, 'request completed')
})

// Add error logging hook
server.addHook('onError', async (request: FastifyRequest, reply: FastifyReply, error: Error) => {
  request.log.error({
    url: request.url,
    method: request.method,
    error: {
      message: error.message,
      stack: error.stack,
    },
  }, 'request error occurred')
})

// Libraries routes and middlewares
server.register(cors, {
  origin: ["*"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
})

// Defined routes and middlewares
server.register(UserAccountRoutes, { prefix: prefix })
server.register(MovieCategoryRoutes, { prefix: prefix })

// Graceful shutdown handling
const gracefulShutdown = async () => {
  server.log.info('Shutting down server...')
  try {
    await server.close()
    server.log.info('Server shut down successfully')
    process.exit(0)
  } catch (err) {
    server.log.error(err, 'Error during shutdown')
    process.exit(1)
  }
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)

// Start the server
server.listen({ port: 5000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    server.log.error(err, 'Error starting server')
    process.exit(1)
  }
  server.log.info(`Server listening at ${address}`)
})