import { EnumMessage, ReturnMessage } from "@/types/message"
import pool from "@/libs/config/database_postgres"
import { MovieDependMovieCategory } from "@/types/movie_depend_movie_category"

export default class MovieDependMovieCategoryService {
  public async Create(input: MovieDependMovieCategory): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM create_movie_depend_movie_category($1, $2)",
          [
            input.movieCategoryId,
            input.movieId,
          ],
        )

        if (!Array.isArray(result.rows) || result.rows.length === 0)
          throw new Error("Created failed, no movie depend movie category returned.")

        const row = result.rows[0]
        const movie_depend_movie_category: MovieDependMovieCategory = {
          id: row.id,
          movieCategoryId: row.movie_category_id,
          movieId: row.movie_id,
        }

        return { success: true, message: EnumMessage.CREATE_SUCCESS, data: movie_depend_movie_category }
      })
      .catch((error) => this.handleError(error, EnumMessage.CREATE_FAILED))
  }

  public async Remove(id: string): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM remove_movie_depend_movie_category($1)",
          [id],
        )
        const removeId: string = result.rows[0].remove_movie_depend_movie_category
        return {
          success: true,
          message: EnumMessage.REMOVE_SUCCESS,
          data: removeId,
        }
      })
      .catch((error) => this.handleError(error, EnumMessage.REMOVE_FAILED))
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
