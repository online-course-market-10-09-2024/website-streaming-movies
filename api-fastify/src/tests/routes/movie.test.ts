import fastify from "fastify"
import MovieRoutes from "@/api/routes/movie"
import { Movie } from "@/types/movie"
import { HttpStatus } from "@/types/http_status"

describe("MovieRoutes", () => {
  let app: ReturnType<typeof fastify>
  let id: string = ""

  beforeAll(async () => {
    app = fastify()
    app.register(MovieRoutes)
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe("POST /movies", () => {
    it("should create a movie director", async () => {
      const input: Movie = {
        id: "",
        name: "test movie is 1",
        initialDate: new Date(),
        thumbnailImage: "image.png",
        trailerVideoUrl: "trailer-url",
        description: "description about test movie is 1"
      }

      const response = await app.inject({
        method: "POST",
        url: "/movies",
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

  describe("PATCH /movies", () => {
    it("should update a movie director", async () => {
      const input: Movie = {
        id: id,
        name: "this is test movie 1",
        initialDate: new Date(),
        thumbnailImage: "test-movie-image.png",
        trailerVideoUrl: "test-movie-image-trailer",
        description: "test movie 1 description"
      }

      const response = await app.inject({
        method: "PATCH",
        url: "/movies",
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

  describe("DELETE /movies/:id", () => {
    it("should remove a movie director", async () => {
      const response = await app.inject({
        method: "DELETE",
        url: `/movies/${id}`,
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
    })
  })

  describe("GET /movies/count", () => {
    it("should count movie directors", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/movies/count",
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
      expect(typeof result.data).toBe("number")
    })
  })

  describe("GET /movies", () => {
    it("should get all movie directors", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/movies?search=&limit=10&page=1",
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
      let countData: number = 0
      result.data.forEach((movie: Movie) => {
        expect(typeof movie.id).toBe("string")
        expect(typeof movie.name).toBe("string")
        expect(movie.id).not.toBe("")
        expect(movie.name).not.toBe("")
        countData += 1
      })
      expect(countData).toBe(10)
    })
  })
})
