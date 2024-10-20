import { EnumMessage, ReturnMessage } from "@/types/message"
import pool from "@/libs/config/database_postgres"
import { MovieCategory } from "@/types/movie_category"

export default class MovieCategoryService {
  public async Create(input: MovieCategory): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM create_movie_category($1)",
          [input.name],
        )
        const id: string = result.rows[0].create_movie_category
        return { success: true, message: EnumMessage.CREATE_SUCCESS, data: id }
      })
      .catch((error) => this.handleError(error, EnumMessage.CREATE_FAILED))
  }

  public async Update(input: MovieCategory): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM update_movie_category($1, $2)",
          [input.id, input.name],
        )

        if (!Array.isArray(result.rows) || result.rows.length === 0)
          throw new Error("Update failed, no movie category returned.")

        const row = result.rows[0]
        const movie_category: MovieCategory = {
          id: row.id,
          name: row.name,
        }

        return {
          success: true,
          message: EnumMessage.UPDATE_SUCCESS,
          data: movie_category,
        }
      })
      .catch((error) => this.handleError(error, EnumMessage.UPDATE_FAILED))
  }

  public async Remove(id: string): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM remove_movie_category($1)",
          [id],
        )
        const removeId: string = result.rows[0].remove_movie_category
        return {
          success: true,
          message: EnumMessage.REMOVE_SUCCESS,
          data: removeId,
        }
      })
      .catch((error) => this.handleError(error, EnumMessage.REMOVE_FAILED))
  }

  public async Count(): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM count_movie_category()",
        )
        const data: number = parseInt(result.rows[0].count_movie_category)
        return { success: true, message: EnumMessage.GET_SUCCESS, data: data }
      })
      .catch((error) => this.handleError(error, EnumMessage.GET_FAILED))
  }

  public async GetAll(
    search: string,
    limit: number,
    page: number,
  ): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM get_all_movie_category($1, $2, $3)",
          [search, limit, page - 1],
        )

        let data: MovieCategory[] = Array.isArray(result.rows)
          ? result.rows.map((row) => {
              return {
                id: row.id,
                name: row.name,
              } as MovieCategory
            })
          : []

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
