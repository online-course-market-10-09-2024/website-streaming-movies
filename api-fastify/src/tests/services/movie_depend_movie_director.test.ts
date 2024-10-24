import MovieDependMovieDirectorService from "@/api/services/movie_depend_movie_director"
import { EnumMessage, ReturnMessage } from "@/types/message"
import { MovieDependMovieDirector } from "@/types/movie_depend_movie_director"

// Define test users
let currentId: string = ""

describe("MovieDependMovieDirectorService Integration Tests", () => {
  let service: MovieDependMovieDirectorService

  beforeAll(async () => {
    service = new MovieDependMovieDirectorService()
  })

  describe("Create", () => {
    it("should create a movie depend movie director successfully", async () => {
      const testCreated: MovieDependMovieDirector = {
        id: "",
        movieDirectorId: "436d3a76-c367-403d-bc98-c27fd0ae0413",
        movieId: "2292fde6-3594-4924-b6be-d5336d7882ec",
      }
      const result: ReturnMessage = await service.Create(testCreated)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.CREATE_SUCCESS)
      expect(result.data).not.toBeUndefined()
      expect(typeof result.data.id).toBe("string")
      expect(typeof result.data.movieDirectorId).toBe("string")
      expect(typeof result.data.movieId).toBe("string")
      expect(result.data.movieDirectorId).toBe(testCreated.movieDirectorId)
      expect(result.data.movieId).toBe(testCreated.movieId)
      currentId = result.data.id
    })

    it("should create a movie depend movie director failed", async () => {
      const testCreated: MovieDependMovieDirector = {
        id: "",
        movieDirectorId: "436d3a76-c367-403d-bc98-c27fd0ae0413",
        movieId: "2292fde6-3594-4924-b6be-d5336d7882ec",
      }
      const result: ReturnMessage = await service.Create(testCreated)
      expect(result.success).toBe(false)
      expect(result.message).toBe(EnumMessage.CREATE_FAILED)
      expect(result.data).toBeUndefined()
    })
  })

  describe("Remove", () => {
    it("should remove a movie depend movie director successfully", async () => {
      const result: ReturnMessage = await service.Remove(currentId)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.REMOVE_SUCCESS)
      expect(result.data).not.toBeUndefined()
    })
  })
})
