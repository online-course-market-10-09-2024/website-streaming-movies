import { EnumMessage, ReturnMessage } from "@/types/message"
import pool from "@/libs/config/database_postgres"
import { MovieDependMovieDirector } from "@/types/movie_depend_movie_director"

export default class MovieDependMovieDirectorService {
  public async Create(input: MovieDependMovieDirector): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM create_movie_depend_movie_director($1, $2)",
          [
            input.movieDirectorId,
            input.movieId,
          ],
        )

        if (!Array.isArray(result.rows) || result.rows.length === 0)
          throw new Error("Created failed, no movie depend movie category returned.")

        const row = result.rows[0]
        const movie_depend_movie_director: MovieDependMovieDirector = {
          id: row.id,
          movieDirectorId: row.movie_director_id,
          movieId: row.movie_id,
        }

        return { success: true, message: EnumMessage.CREATE_SUCCESS, data: movie_depend_movie_director }
      })
      .catch((error) => this.handleError(error, EnumMessage.CREATE_FAILED))
  }

  public async Remove(id: string): Promise<ReturnMessage> {
    return pool
      .withClient(async (client) => {
        const result = await client.query(
          "SELECT * FROM remove_movie_depend_movie_director($1)",
          [id],
        )
        const removeId: string = result.rows[0].remove_movie_depend_movie_director
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
