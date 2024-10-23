import { EnumMessage, ReturnMessage } from "@/types/message"
import pool from "@/libs/config/database_postgres"
import {  Movie } from "@/types/movie"

export default class MovieService {
  public async Create(input: Movie): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM create_movie($1, $2, $3, $4, $5)",
          [
            input.name,
            input.initialDate,
            input.thumbnailImage,
            input.trailerVideoUrl,
            input.description,
          ],
        )

        if (!Array.isArray(result.rows) || result.rows.length === 0)
          throw new Error("Created failed, no movie returned.")

        const row = result.rows[0]
        const movie: Movie = {
          id: row.id,
          name: row.name,
          initialDate: new Date(row.initial_date),
          thumbnailImage: row.thumbnail_image,
          trailerVideoUrl: row.trailer_video_url,
          description: row.description,
        }

        return { success: true, message: EnumMessage.CREATE_SUCCESS, data: movie }
      })
      .catch((error) => this.handleError(error, EnumMessage.CREATE_FAILED))
  }

  public async Update(input: Movie): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM update_movie($1, $2, $3, $4, $5, $6)",
          [
            input.id,
            input.name,
            input.initialDate,
            input.thumbnailImage,
            input.trailerVideoUrl,
            input.description,
          ],
        )

        if (!Array.isArray(result.rows) || result.rows.length === 0)
          throw new Error("Update failed, no movie returned.")

        const row = result.rows[0]
        const movie: Movie = {
          id: row.id,
          name: row.name,
          initialDate: new Date(row.initial_date),
          thumbnailImage: row.thumbnail_image,
          trailerVideoUrl: row.trailer_video_url,
          description: row.description,
        }

        return {
          success: true,
          message: EnumMessage.UPDATE_SUCCESS,
          data: movie,
        }
      })
      .catch((error) => this.handleError(error, EnumMessage.UPDATE_FAILED))
  }

  public async Remove(id: string): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM remove_movie($1)",
          [id],
        )
        const removeId: string = result.rows[0].remove_movie
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
          "SELECT * FROM count_movie()",
        )
        const data: number = parseInt(result.rows[0].count_movie)
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
          "SELECT * FROM get_all_movie($1, $2, $3)",
          [search, limit, page - 1],
        )

        let data: Movie[] = Array.isArray(result.rows)
          ? result.rows.map((row) => {
              return {
                id: row.id,
                name: row.name,
                initialDate: new Date(row.initial_date),
                thumbnailImage: row.thumbnail_image,
                trailerVideoUrl: row.trailer_video_url,
                description: row.description,
              } as Movie
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
