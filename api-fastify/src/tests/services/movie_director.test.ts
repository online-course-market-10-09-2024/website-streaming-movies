import MovieDirectorService from "@/api/services/movie_director"
import { EnumMessage, ReturnMessage } from "@/types/message"
import { MovieDirector } from "@/types/movie_director"

// Define test users
let currentId: string = ""

describe("MovieDirectorService Integration Tests", () => {
  let service: MovieDirectorService

  beforeAll(async () => {
    service = new MovieDirectorService()
  })

  describe("Count", () => {
    it("should return the count of movie directors", async () => {
      const result: ReturnMessage = await service.Count()
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(typeof result.data).toBe("number")
      expect(result.data).toBeGreaterThan(0)
    })
  })

  describe("GetAll", () => {
    it("should return data of movie directors by default", async () => {
      const result: ReturnMessage = await service.GetAll("", 10, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
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

    it("should return data of movie directors less than 20 values when searching", async () => {
      const result: ReturnMessage = await service.GetAll("director 1", 20, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
      let countData: number = 0
      result.data.forEach((movie_director: MovieDirector) => {
        expect(typeof movie_director.id).toBe("string")
        expect(typeof movie_director.name).toBe("string")
        expect(movie_director.id).not.toBe("")
        expect(movie_director.name).not.toBe("")
        countData += 1
      })
      expect(countData).toBeLessThanOrEqual(20)
    })

    it("should return data of movie directors with 10 values when limit = 9", async () => {
      const result: ReturnMessage = await service.GetAll("", 9, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
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

    it("should return data of movie directors with 50 values when limit = 51", async () => {
      const result: ReturnMessage = await service.GetAll("", 51, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
      let countData: number = 0
      result.data.forEach((movie_director: MovieDirector) => {
        expect(typeof movie_director.id).toBe("string")
        expect(typeof movie_director.name).toBe("string")
        expect(movie_director.id).not.toBe("")
        expect(movie_director.name).not.toBe("")
        countData += 1
      })
      expect(countData).toBe(50)
    })

    it("should return data of movie directors when page = -1", async () => {
      const result: ReturnMessage = await service.GetAll("", 10, -1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
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

  describe("Create", () => {
    it("should create a movie director successfully", async () => {
      const testCreated: MovieDirector = {
        id: "",
        name: "test movie director 1",
      }
      const result: ReturnMessage = await service.Create(testCreated)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.CREATE_SUCCESS)
      expect(result.data).not.toBeUndefined()
      expect(typeof result.data.id).toBe("string")
      expect(typeof result.data.name).toBe("string")
      expect(result.data.name).toBe(testCreated.name)
      currentId = result.data.id
    })
  })

  describe("Update", () => {
    it("should update a movie director successfully", async () => {
      const testUpdated: MovieDirector = {
        id: currentId,
        name: "test update movie director",
      }
      const result: ReturnMessage = await service.Update(testUpdated)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.UPDATE_SUCCESS)
      expect(result.data).not.toBeUndefined()
      expect(typeof result.data.id).toBe("string")
      expect(typeof result.data.name).toBe("string")
      expect(result.data.id).toBe(testUpdated.id)
      expect(result.data.name).toBe(testUpdated.name)
    })
  })

  describe("Remove", () => {
    it("should remove a movie director successfully", async () => {
      const result: ReturnMessage = await service.Remove(currentId)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.REMOVE_SUCCESS)
      expect(result.data).not.toBeUndefined()
    })
  })
})
