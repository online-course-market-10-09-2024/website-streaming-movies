import { EnumMessage, ReturnMessage } from "@/types/message"
import pool from "@/libs/config/database_postgres"
import { MovieDirector } from "@/types/movie_director"

export default class MovieDirectorService {
  public async Create(input: MovieDirector): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM create_movie_director($1)",
          [input.name],
        )
        const id: string = result.rows[0].create_movie_director
        return { success: true, message: EnumMessage.CREATE_SUCCESS, data: id }
      })
      .catch((error) => this.handleError(error, EnumMessage.CREATE_FAILED))
  }

  public async Update(input: MovieDirector): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM update_movie_director($1, $2)",
          [input.id, input.name],
        )

        if (!Array.isArray(result.rows) || result.rows.length === 0)
          throw new Error("Update failed, no movie category returned.")

        const row = result.rows[0]
        const movie_director: MovieDirector = {
          id: row.id,
          name: row.name,
        }

        return {
          success: true,
          message: EnumMessage.UPDATE_SUCCESS,
          data: movie_director,
        }
      })
      .catch((error) => this.handleError(error, EnumMessage.UPDATE_FAILED))
  }

  public async Remove(id: string): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM remove_movie_director($1)",
          [id],
        )
        const removeId: string = result.rows[0].remove_movie_director
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
          "SELECT * FROM count_movie_director()",
        )
        const data: number = parseInt(result.rows[0].count_movie_director)
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
          "SELECT * FROM get_all_movie_director($1, $2, $3)",
          [search, limit, page - 1],
        )

        let data: MovieDirector[] = Array.isArray(result.rows)
          ? result.rows.map((row) => {
              return {
                id: row.id,
                name: row.name,
              } as MovieDirector
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
