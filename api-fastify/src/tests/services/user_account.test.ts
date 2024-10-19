import UserService from "@/api/services/user_account"
import { EnumMessage, ReturnMessage } from "@/types/message"
import { UserAccount, UserAccountUpdated } from "@/types/user_account"

// Define test users
let currentId: string = ""
const testUser: UserAccount = {
  id: "",
  username: "testuseraccount",
  email: "testuseraccount@example.com",
  password: "testuseraccount",
  displayName: "Test User Account",
  createdAt: new Date().toString(),
}

describe("UserService Integration Tests", () => {
  let service: UserService

  beforeAll(async () => {
    service = new UserService()
  })

  describe("count", () => {
    it("should return the count of users", async () => {
      const result: ReturnMessage = await service.count()
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.GET_SUCCESS)
      expect(typeof result.data).toBe("number")
      expect(result.data).toBeGreaterThan(0)
    })
  })

  describe("create", () => {
    it("should create a user successfully", async () => {
      const result: ReturnMessage = await service.create(testUser)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.CREATE_SUCCESS)
      expect(result.data).not.toBeUndefined()
      currentId = result.data
    })
  })

  describe("update", () => {
    it("should update a user successfully", async () => {
      let newUser: UserAccount = testUser
      newUser.id = currentId

      const result: ReturnMessage = await service.update(newUser)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.UPDATE_SUCCESS)
      //expect(result.data).not.toBeUndefined() // return data failed please fix this
    })
  })

  describe("remove", () => {
    it("should remove a user successfully", async () => {
      const result: ReturnMessage = await service.remove(currentId)
      expect(result.success).toBe(true)
      expect(result.message).toBe(EnumMessage.REMOVE_SUCCESS)
      expect(result.data).not.toBeUndefined()
    })
  })
})
