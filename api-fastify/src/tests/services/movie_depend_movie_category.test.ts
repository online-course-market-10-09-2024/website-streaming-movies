import MovieDependMovieCategoryService from "@/api/services/movie_depend_movie_category"
import { EnumMessage, ReturnMessage } from "@/types/message"
import { MovieDependMovieCategory } from "@/types/movie_depend_movie_category"

// Define test users
let currentId: string = ""

describe("MovieDependMovieCategoryService Integration Tests", () => {
  let service: MovieDependMovieCategoryService

  beforeAll(async () => {
    service = new MovieDependMovieCategoryService()
  })

  describe("Create", () => {
    it("should create a movie depend movie category successfully", async () => {
      const testCreated: MovieDependMovieCategory = {
        id: "",
        movieCategoryId: "360d60a6-3f3a-4c00-927a-04aa35410acc",
        movieId: "0bc66ff1-15ec-4d54-8830-1baf807b8091",
      }
      const result: ReturnMessage = await service.Create(testCreated)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.CREATE_SUCCESS)
      expect(result.data).not.toBeUndefined()
      expect(typeof result.data.id).toBe("string")
      expect(typeof result.data.movieCategoryId).toBe("string")
      expect(typeof result.data.movieId).toBe("string")
      expect(result.data.movieCategoryId).toBe(testCreated.movieCategoryId)
      expect(result.data.movieId).toBe(testCreated.movieId)
      currentId = result.data.id
    })

    it("should create a movie depend movie category failed", async () => {
      const testCreated: MovieDependMovieCategory = {
        id: "",
        movieCategoryId: "360d60a6-3f3a-4c00-927a-04aa35410acc",
        movieId: "0bc66ff1-15ec-4d54-8830-1baf807b8091",
      }
      const result: ReturnMessage = await service.Create(testCreated)
      expect(result.success).toBe(false)
      expect(result.message).toBe(EnumMessage.CREATE_FAILED)
      expect(result.data).toBeUndefined()
    })
  })

  describe("Remove", () => {
    it("should remove a movie depend movie category successfully", async () => {
      const result: ReturnMessage = await service.Remove(currentId)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.REMOVE_SUCCESS)
      expect(result.data).not.toBeUndefined()
    })
  })
})
