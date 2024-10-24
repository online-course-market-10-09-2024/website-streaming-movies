import fastify from "fastify"
import MovieDependMovieDirectorRoutes from "@/api/routes/movie_depend_movie_director"
import { MovieDependMovieDirector } from "@/types/movie_depend_movie_director"
import { HttpStatus } from "@/types/http_status"

describe("MovieDirectorRoutes", () => {
  let app: ReturnType<typeof fastify>
  let id: string = ""

  beforeAll(async () => {
    app = fastify()
    app.register(MovieDependMovieDirectorRoutes)
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe("POST /movie-depend-movie-directors", () => {
    it("should create a movie depend movie director", async () => {
      const input: MovieDependMovieDirector = {
        id: "",
        movieDirectorId: "436d3a76-c367-403d-bc98-c27fd0ae0413",
        movieId: "2292fde6-3594-4924-b6be-d5336d7882ec",
      }

      const response = await app.inject({
        method: "POST",
        url: "/movie-depend-movie-directors",
        payload: input,
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
      expect(typeof result.data.id).toBe("string")
      expect(typeof result.data.movieDirectorId).toBe("string")
      expect(typeof result.data.movieId).toBe("string")
      expect(result.data.movieDirectorId).toBe(input.movieDirectorId)
      expect(result.data.movieId).toBe(input.movieId)
      id = result.data.id
    })
  })

  describe("DELETE /movie-depend-movie-directors/:id", () => {
    it("should remove a movie depend movie director", async () => {
      const response = await app.inject({
        method: "DELETE",
        url: `/movie-depend-movie-directors/${id}`,
      })

      expect(response.statusCode).toBe(HttpStatus.OK)
      const result = response.json()
      expect(result.success).toBe(true)
    })
  })
})
