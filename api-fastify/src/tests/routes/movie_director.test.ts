import fastify from "fastify"
import MovieDirectorRoutes from "@/api/routes/movie_director"
import { MovieDirector } from "@/types/movie_director"
import { HttpStatus } from "@/types/http_status"

describe("MovieDirectorRoutes", () => {
  let app: ReturnType<typeof fastify>
  let id: string = ""

  beforeAll(async () => {
    app = fastify()
    app.register(MovieDirectorRoutes)
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe("POST /movie-directors", () => {
    it("should create a movie director", async () => {
      const input: MovieDirector = {
        id: "",
        name: "Test Created Movie Director",
      }

      const response = await app.inject({
        method: "POST",
        url: "/movie-directors",
        payload: input,
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
      expect(typeof result.data.id).toBe("string")
      expect(typeof result.data.name).toBe("string")
      expect(result.data.name).toBe(input.name)
      id = result.data.id
    })
  })

  describe("PATCH /movie-directors", () => {
    it("should update a movie director", async () => {
      const input: MovieDirector = { id: id, name: "Test Updated Movie Director" }

      const response = await app.inject({
        method: "PATCH",
        url: "/movie-directors",
        payload: input,
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
      expect(typeof result.data.id).toBe("string")
      expect(typeof result.data.name).toBe("string")
      expect(result.data.id).toBe(input.id)
      expect(result.data.name).toBe(input.name)
    })
  })

  describe("DELETE /movie-directors/:id", () => {
    it("should remove a movie director", async () => {
      const response = await app.inject({
        method: "DELETE",
        url: `/movie-directors/${id}`,
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
    })
  })

  describe("GET /movie-directors/count", () => {
    it("should count movie directors", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/movie-directors/count",
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
      expect(typeof result.data).toBe("number")
    })
  })

  describe("GET /movie-directors", () => {
    it("should get all movie directors", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/movie-directors?search=&limit=10&page=1",
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
      let countData: number = 0
      result.data.forEach((movie_director: MovieDirector) => {
        expect(typeof movie_director.id).toBe("string")
        expect(typeof movie_director.name).toBe("string")
        expect(movie_director.id).not.toBe("")
        expect(movie_director.name).not.toBe("")
        countData += 1
      })
      expect(countData).toBe(10)
    })
  })
})
