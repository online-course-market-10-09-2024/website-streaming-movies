import { EnumMessage, ReturnMessage } from "@/types/message"
import pool from "@/libs/config/database_postgres"
import { UserAccount, UserAccountUpdated } from "@/types/user_account"

export default class UserAccountService {
  public async getProfile(input: string): Promise<ReturnMessage> {
    return await pool
      .withClient(async (client) => {
        const result = await client.query("SELECT * FROM get_profile($1)", [input])

        if (result.rows.length === 0 || !result.rows[0].get_profile) {
          return { success: false, message: EnumMessage.GET_FAILED, data: null }
        }

        const userAccount: UserAccount = result.rows[0].get_profile

        const data: UserAccount = {
          id: userAccount.id,
          username: userAccount.username,
          email: userAccount.email,
          password: userAccount.password,
          displayName: userAccount.displayName,
          createdAt: userAccount.createdAt,
        }

        return { data: data, message: EnumMessage.GET_SUCCESS, success: true }
      })
      .catch((error) => this.handleError(error, EnumMessage.GET_FAILED))
  }

  public async create(input: UserAccount): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM create_user_account($1, $2, $3, $4)",
          [input.username, input.email, input.password, input.displayName],
        )
        const id: string = result.rows[0].create_user_account
        return { success: true, message: EnumMessage.CREATE_SUCCESS, data: id }
      })
      .catch((error) => this.handleError(error, EnumMessage.CREATE_FAILED))
  }

  // TODO: bug in return data
  public async update(input: UserAccount): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM update_user_account($1, $2, $3, $4, $5)",
          [
            input.id,
            input.username,
            input.email,
            input.password,
            input.displayName,
          ],
        )
        const user: UserAccountUpdated | undefined = result.rows[0].update_user_account
        return {
          success: true,
          message: EnumMessage.UPDATE_SUCCESS,
          data: user,
        }
      })
      .catch((error) => this.handleError(error, EnumMessage.UPDATE_FAILED))
  }

  public async remove(id: string): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query("SELECT * FROM remove_user_account($1)", [
          id,
        ])
        const removeId: string = result.rows[0].remove_user_account
        return {
          success: true,
          message: EnumMessage.REMOVE_SUCCESS,
          data: removeId,
        }
      })
      .catch((error) => this.handleError(error, EnumMessage.REMOVE_FAILED))
  }

  public async count(): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query("SELECT * FROM count_user_account()")
        const data: number = parseInt(result.rows[0].count_user_account)
        return { success: true, message: EnumMessage.GET_SUCCESS, data: data }
      })
      .catch((error) => this.handleError(error, EnumMessage.GET_FAILED))
  }

  private handleError(error: any, message: EnumMessage): ReturnMessage {
    console.error(error)
    return {
      success: false,
      message,
      data: undefined,
      error_detail: error.message,
    }
  }
}
