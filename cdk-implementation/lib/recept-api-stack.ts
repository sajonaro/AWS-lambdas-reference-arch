import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGateway} from './ApiGateway';
import { Lambda} from './Lambda';
import  * as dynamodb  from "aws-cdk-lib/aws-dynamodb";
import  * as s3  from "aws-cdk-lib/aws-s3";

export class ReceiptApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

     // DynamoDB
    const receiptDynamoTable = new dynamodb.Table(this, "ReceiptTable", {
      tableName: "Receipts",
      partitionKey: { name: "receipt_id", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "state", type: dynamodb.AttributeType.STRING },
    })

    const fullAccessPolicies = [
      new cdk.aws_iam.PolicyStatement({
        effect: cdk.aws_iam.Effect.ALLOW,
        actions: ["dynamodb:SetItem", "dynamodb:GetItem", "dynamodb:DeleteItem", "dynamodb:UpdateItem"],
        resources: [receiptDynamoTable.tableArn],
      })];

    // API Gateway
    const api = new ApiGateway(this);

    //register POST method for /receipts
    const httpHandler = new Lambda(this, "httpHandler",fullAccessPolicies);
    api.addIntegration("POST", "/receipt", httpHandler);


    //register GET method to get receipts
    const dataAccessHandler = new Lambda(this, "dataAccessHandler",fullAccessPolicies);
    api.addIntegration("GET", "/receipts", dataAccessHandler);
    

    //register status checker (GET method for /status)
    const statusChecker = new Lambda(this, "statusChecker",fullAccessPolicies);
    api.addIntegration("GET", "/status/{ticket-id}", statusChecker);

    //register health checker (GET method for /health)
    const healthCheck = new Lambda(this, "healthChecker");
    api.addIntegration("GET", "/health", healthCheck);



    receiptDynamoTable.grantReadWriteData(dataAccessHandler);
    receiptDynamoTable.grantReadWriteData(httpHandler);
    receiptDynamoTable.grantReadWriteData(statusChecker);
  
   //s3 bucket
    const archiveBucket = new s3.Bucket(this, "receipt_archive", {
        bucketName: "receipt_archive",
        removalPolicy: cdk.RemovalPolicy.RETAIN,
    })
    archiveBucket.grantReadWrite(dataAccessHandler);



  
}}
