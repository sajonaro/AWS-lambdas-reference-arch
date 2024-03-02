import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 as uuidv4 } from 'uuid';

export const handler = async (event: APIGatewayEvent ): Promise<APIGatewayProxyResult> => {
    
  const guid = uuidv4();
 
  //TODO
  // extract receipt's schema from event
  // persist the guid and receipt details in the database
  // publish schema to validation queue 

  console.log(`'httpHandler event: ${event}', receipt's processing ticket is ${guid}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
         "ticket" : guid,
         "status" : 'processing'
    }),
  };
}