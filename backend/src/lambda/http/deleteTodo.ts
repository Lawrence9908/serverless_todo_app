import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    //getting current user id
    const userId = getUserId(event);
    //DELETING THE TODO ITEM
    const todoItemToDelete = await deleteTodo(userId, todoId)
    // return success status code and deleted item
    return {
      statusCode: 200,
      body: JSON.stringify({
        item: todoItemToDelete
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
