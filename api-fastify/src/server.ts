import fastify from "fastify"
import UserAccountRoutes from "@/api/routes/user_account"
import cors from "@fastify/cors"

const server = fastify()
const prefix: string = "/api/"

// Libraries routes and middlewares
server.register(cors, {
  origin: ["http://localhost:5172"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
})

// Defined routes and middlewares
server.register(UserAccountRoutes, { prefix: prefix })

server.listen({ port: 5000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
