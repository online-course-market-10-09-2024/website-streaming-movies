import fastify from "fastify"
import MovieDependMovieCategoryRoutes from "@/api/routes/movie_depend_movie_category"
import { MovieDependMovieCategory } from "@/types/movie_depend_movie_category"
import { HttpStatus } from "@/types/http_status"

describe("MovieCategoryRoutes", () => {
  let app: ReturnType<typeof fastify>
  let id: string = ""

  beforeAll(async () => {
    app = fastify()
    app.register(MovieDependMovieCategoryRoutes)
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe("POST /movie-depend-movie-categories", () => {
    it("should create a movie depend movie category", async () => {
      const input: MovieDependMovieCategory = {
        id: "",
        movieCategoryId: "360d60a6-3f3a-4c00-927a-04aa35410acc",
        movieId: "0bc66ff1-15ec-4d54-8830-1baf807b8091",
      }

      const response = await app.inject({
        method: "POST",
        url: "/movie-depend-movie-categories",
        payload: input,
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
      expect(typeof result.data.id).toBe("string")
      expect(typeof result.data.movieCategoryId).toBe("string")
      expect(typeof result.data.movieId).toBe("string")
      expect(result.data.movieCategoryId).toBe(input.movieCategoryId)
      expect(result.data.movieId).toBe(input.movieId)
      id = result.data.id
    })
  })

  describe("DELETE /movie-depend-movie-categories/:id", () => {
    it("should remove a movie depend movie category", async () => {
      const response = await app.inject({
        method: "DELETE",
        url: `/movie-depend-movie-categories/${id}`,
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
    })
  })
})
