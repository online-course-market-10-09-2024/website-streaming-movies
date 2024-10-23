import MovieService from "@/api/services/movie"
import { EnumMessage, ReturnMessage } from "@/types/message"
import { Movie } from "@/types/movie"

// Define test users
let currentId: string = ""

describe("MovieService Integration Tests", () => {
  let service: MovieService

  beforeAll(async () => {
    service = new MovieService()
  })

  describe("Count", () => {
    it("should return the count of movies", async () => {
      const result: ReturnMessage = await service.Count()
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(typeof result.data).toBe("number")
      expect(result.data).toBeGreaterThan(0)
    })
  })

  describe("GetAll", () => {
    it("should return data of movies by default", async () => {
      const result: ReturnMessage = await service.GetAll("", 10, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
      let countData: number = 0
      result.data.forEach((movie: Movie) => {
        expect(typeof movie.id).toBe("string")
        expect(typeof movie.name).toBe("string")
        expect(typeof movie.initialDate).toBe("object");
        expect(typeof movie.thumbnailImage).toBe("string")
        expect(typeof movie.trailerVideoUrl).toBe("string")
        expect(typeof movie.description).toBe("string")
        expect(movie.id).not.toBe("")
        expect(movie.name).not.toBe("")
        expect(!isNaN(movie.initialDate.getTime())).toBe(true);
        countData += 1
      })
      expect(countData).toBe(10)
    })

    it("should return data of movie less than 20 values when searching", async () => {
      const result: ReturnMessage = await service.GetAll("category 1", 20, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
      let countData: number = 0
      result.data.forEach((movie: Movie) => {
        expect(typeof movie.id).toBe("string")
        expect(typeof movie.name).toBe("string")
        expect(typeof movie.initialDate).toBe("object");
        expect(typeof movie.thumbnailImage).toBe("string")
        expect(typeof movie.trailerVideoUrl).toBe("string")
        expect(typeof movie.description).toBe("string")
        expect(movie.id).not.toBe("")
        expect(movie.name).not.toBe("")
        expect(!isNaN(movie.initialDate.getTime())).toBe(true);
        countData += 1
      })
      expect(countData).toBeLessThanOrEqual(20)
    })

    it("should return data of movie with 10 values when limit = 9", async () => {
      const result: ReturnMessage = await service.GetAll("", 9, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
      let countData: number = 0
      result.data.forEach((movie: Movie) => {
        expect(typeof movie.id).toBe("string")
        expect(typeof movie.name).toBe("string")
        expect(typeof movie.initialDate).toBe("object");
        expect(typeof movie.thumbnailImage).toBe("string")
        expect(typeof movie.trailerVideoUrl).toBe("string")
        expect(typeof movie.description).toBe("string")
        expect(movie.id).not.toBe("")
        expect(movie.name).not.toBe("")
        expect(!isNaN(movie.initialDate.getTime())).toBe(true);
        countData += 1
      })
      expect(countData).toBe(10)
    })

    it("should return data of movie with 50 values when limit = 51", async () => {
      const result: ReturnMessage = await service.GetAll("", 51, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
      let countData: number = 0
      result.data.forEach((movie: Movie) => {
        expect(typeof movie.id).toBe("string")
        expect(typeof movie.name).toBe("string")
        expect(typeof movie.initialDate).toBe("object");
        expect(typeof movie.thumbnailImage).toBe("string")
        expect(typeof movie.trailerVideoUrl).toBe("string")
        expect(typeof movie.description).toBe("string")
        expect(movie.id).not.toBe("")
        expect(movie.name).not.toBe("")
        expect(!isNaN(movie.initialDate.getTime())).toBe(true);
        countData += 1
      })
      expect(countData).toBe(50)
    })

    it("should return data of movie when page = -1", async () => {
      const result: ReturnMessage = await service.GetAll("", 10, -1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
      let countData: number = 0
      result.data.forEach((movie: Movie) => {
        expect(typeof movie.id).toBe("string")
        expect(typeof movie.name).toBe("string")
        expect(typeof movie.initialDate).toBe("object");
        expect(typeof movie.thumbnailImage).toBe("string")
        expect(typeof movie.trailerVideoUrl).toBe("string")
        expect(typeof movie.description).toBe("string")
        expect(movie.id).not.toBe("")
        expect(movie.name).not.toBe("")
        expect(!isNaN(movie.initialDate.getTime())).toBe(true);
        countData += 1
      })
      expect(countData).toBe(10)
    })
  })

  describe("Create", () => {
    it("should create a movie successfully", async () => {
      const testCreated: Movie = {
        id: "",
        name: "test movie is 1",
        initialDate: new Date(),
        thumbnailImage: "image.png",
        trailerVideoUrl: "trailer-url",
        description: "description about test movie is 1"
      }
      const result: ReturnMessage = await service.Create(testCreated)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.CREATE_SUCCESS)
      expect(result.data).not.toBeUndefined()
      expect(typeof result.data.id).toBe("string")
      expect(typeof result.data.name).toBe("string")
      expect(typeof result.data.initialDate).toBe("object");
      expect(typeof result.data.thumbnailImage).toBe("string")
      expect(typeof result.data.trailerVideoUrl).toBe("string")
      expect(typeof result.data.description).toBe("string")
      expect(result.data.id).not.toBe(undefined)
      expect(result.data.name).toBe(testCreated.name)
      expect(!isNaN(result.data.initialDate.getTime())).toBe(true);
      expect(result.data.thumbnailImage).toBe(testCreated.thumbnailImage)
      expect(result.data.trailerVideoUrl).toBe(testCreated.trailerVideoUrl)
      expect(result.data.description).toBe(testCreated.description)
      currentId = result.data.id
    })
  })

  describe("Update", () => {
    it("should update a movie successfully with id and name", async () => {
      const testUpdated: Movie = {
        id: currentId,
        name: "this is test movie 1",
        initialDate: new Date(),
        thumbnailImage: "test-movie-image.png",
        trailerVideoUrl: "test-movie-image-trailer",
        description: "test movie 1 description"
      }
      const result: ReturnMessage = await service.Update(testUpdated)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.UPDATE_SUCCESS)
      expect(result.data).not.toBeUndefined()
      expect(typeof result.data.id).toBe("string")
      expect(typeof result.data.name).toBe("string")
      expect(typeof result.data.initialDate).toBe("object");
      expect(typeof result.data.thumbnailImage).toBe("string")
      expect(typeof result.data.trailerVideoUrl).toBe("string")
      expect(typeof result.data.description).toBe("string")
      expect(result.data.id).toBe(testUpdated.id)
      expect(result.data.name).toBe(testUpdated.name)
      expect(!isNaN(result.data.initialDate.getTime())).toBe(true);
      expect(result.data.thumbnailImage).toBe(testUpdated.thumbnailImage)
      expect(result.data.trailerVideoUrl).toBe(testUpdated.trailerVideoUrl)
      expect(result.data.description).toBe(testUpdated.description)
      currentId = result.data.id
    })
  })

  describe("Remove", () => {
    it("should remove a movie successfully", async () => {
      const resultBeforeCount: ReturnMessage = await service.Count()
      const result: ReturnMessage = await service.Remove(currentId)
      const resultAfterCount: ReturnMessage = await service.Count()
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.REMOVE_SUCCESS)
      expect(result.data).not.toBeUndefined()
      expect(resultBeforeCount.data).toBeGreaterThan(0)
      expect(resultAfterCount.data).toBeGreaterThan(0)
      expect(resultBeforeCount.data).toBeGreaterThan(resultAfterCount.data)
    })
  })
})
