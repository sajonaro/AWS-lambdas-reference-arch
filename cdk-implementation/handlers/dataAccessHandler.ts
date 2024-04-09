import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { DynamoDB } from "aws-sdk";

export const handler = async (event: APIGatewayEvent ): Promise<APIGatewayProxyResult> => {
  console.log(`dataAccessHandler event: ${event}, routeKey: ${event.routeKey}`);   
  const dynamo = new DynamoDB.DocumentClient();
  let body;
  let statusCode = 200;
  const headers = {
	"Content-Type": "application/json"
  };
 
  try {
	switch (event.httpMethod) {
        // route  /receipt/status/{receipt_id}
        case "GET":
            statusCode = 200;
            body = await dynamo
            .get({
                TableName: "Receipts",
                Key: {
                    receipt_id: event.pathParameters.receipt_id
                }
            })
            .promise();
            break;
        // route  /receipt    
        case "POST":
            let requestJSON = JSON.parse(event.body);
            await dynamo
            .put({
                TableName: "Receipts",
                Item: {
                    receipt_id: requestJSON.receipt_id,
                    details: requestJSON.receipt_details,
                }
            })
            .promise();
            statusCode = 201;
            body = `Post item ${requestJSON.receipt_details}`;
            break;
        default:
            throw new Error(`Unsupported route: "${event.routeKey}"`);
    }} catch (err: any) {
        statusCode = 400;
        body = err.message;
    } finally {
	    body = JSON.stringify(body);
  }

  return {
	statusCode,
	body,
	headers
  };
};