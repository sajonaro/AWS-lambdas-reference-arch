import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayEvent ): Promise<APIGatewayProxyResult> => {
    
  console.log(`healthChecker event: ${event}`);

  return {
    statusCode: 200,
    body: JSON.stringify({ "status" : "healthy" })
  };
}