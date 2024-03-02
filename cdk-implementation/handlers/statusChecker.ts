import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (event: APIGatewayEvent ): Promise<APIGatewayProxyResult> => {
    
   //const payload =  new JSON(event.body)  ;

  //TODO
  // extract ticket_id & receipt_id from event
  // get status from DB by ticket_id & receipt_id
  const status = "PROCESSING";

  console.log(`'statusChecker event: ${event}', returning status ${status}`);

  return {
    statusCode: 200,
    body: JSON.stringify({
         "ticket_id" : event.body,
         "status" : status,
         "receipt_id" : "1234-5678-9012-3456"
    }),
  };
}