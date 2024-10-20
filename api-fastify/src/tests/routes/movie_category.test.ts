import fastify from "fastify"
import MovieCategoryRoutes from "@/api/routes/movie_category"
import { MovieCategory } from "@/types/movie_category"
import { HttpStatus } from "@/types/http_status"

describe("MovieCategoryRoutes", () => {
  let app: ReturnType<typeof fastify>
  let id: string = ""

  beforeAll(async () => {
    app = fastify()
    app.register(MovieCategoryRoutes)
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe("POST /movie-categories", () => {
    it("should create a movie category", async () => {
      const input: MovieCategory = {
        id: "",
        name: "Test Created Movie Category",
      }

      const response = await app.inject({
        method: "POST",
        url: "/movie-categories",
        payload: input,
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
      expect(typeof result.data).toBe("string")
      id = result.data
    })
  })

  describe("PATCH /movie-categories", () => {
    it("should update a movie category", async () => {
      const input: MovieCategory = { id: id, name: "Test Updated Movie Category" }

      const response = await app.inject({
        method: "PATCH",
        url: "/movie-categories",
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

  describe("DELETE /movie-categories/:id", () => {
    it("should remove a movie category", async () => {
      const response = await app.inject({
        method: "DELETE",
        url: `/movie-categories/${id}`,
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
    })
  })

  describe("GET /movie-categories/count", () => {
    it("should count movie categories", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/movie-categories/count",
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
      expect(typeof result.data).toBe("number")
    })
  })

  describe("GET /movie-categories", () => {
    it("should get all movie categories", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/movie-categories?search=&limit=10&page=1",
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
      let countData: number = 0
      result.data.forEach((movie_category: MovieCategory) => {
        expect(typeof movie_category.id).toBe("string")
        expect(typeof movie_category.name).toBe("string")
        expect(movie_category.id).not.toBe("")
        expect(movie_category.name).not.toBe("")
        countData += 1
      })
      expect(countData).toBe(10)
    })
  })
})
