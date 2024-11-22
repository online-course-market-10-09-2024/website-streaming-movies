import MovieCategoryService from "@/api/services/movie_category"
import { EnumMessage, ReturnMessage } from "@/types/message"
import { MovieCategory } from "@/types/movie_category"

// Define test users
let currentId: string = ""

describe("MovieCategoryService Integration Tests", () => {
  let service: MovieCategoryService

  beforeAll(async () => {
    service = new MovieCategoryService()
  })

  describe("Count", () => {
    it("should return the count of movie categories", async () => {
      const result: ReturnMessage = await service.Count("")
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(typeof result.data).toBe("number")
      expect(result.data).toBeGreaterThan(0)
    })
  })

  describe("GetAll", () => {
    it("should return data of movie categories by default", async () => {
      const result: ReturnMessage = await service.GetAll("", 10, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
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

    it("should return data of movie categories less than 20 values when searching", async () => {
      const result: ReturnMessage = await service.GetAll("category 1", 20, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
      let countData: number = 0
      result.data.forEach((movie_category: MovieCategory) => {
        expect(typeof movie_category.id).toBe("string")
        expect(typeof movie_category.name).toBe("string")
        expect(movie_category.id).not.toBe("")
        expect(movie_category.name).not.toBe("")
        countData += 1
      })
      expect(countData).toBeLessThanOrEqual(20)
    })

    it("should return data of movie categories with 10 values when limit = 9", async () => {
      const result: ReturnMessage = await service.GetAll("", 9, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
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

    it("should return data of movie categories with 50 values when limit = 51", async () => {
      const result: ReturnMessage = await service.GetAll("", 51, 1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
      let countData: number = 0
      result.data.forEach((movie_category: MovieCategory) => {
        expect(typeof movie_category.id).toBe("string")
        expect(typeof movie_category.name).toBe("string")
        expect(movie_category.id).not.toBe("")
        expect(movie_category.name).not.toBe("")
        countData += 1
      })
      expect(countData).toBe(50)
    })

    it("should return data of movie categories when page = -1", async () => {
      const result: ReturnMessage = await service.GetAll("", 10, -1)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(Array.isArray(result.data)).toBe(true)
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

  describe("Create", () => {
    it("should create a movie category successfully", async () => {
      const testCreated: MovieCategory = {
        id: "",
        name: "test movie category 1",
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
    it("should update a movie category successfully", async () => {
      const testUpdated: MovieCategory = {
        id: currentId,
        name: "test update movie category",
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
    it("should remove a movie category successfully", async () => {
      const result: ReturnMessage = await service.Remove(currentId)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.REMOVE_SUCCESS)
      expect(result.data).not.toBeUndefined()
    })
  })
})
