import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGateway} from './ApiGateway';
import { Lambda} from './Lambda';

export class ReceiptApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // API Gateway
    const api = new ApiGateway(this);

    // API Gateway
    
    //register POST method for /receipts
    const httpHandler = new Lambda(this, "httpHandler");
    api.addIntegration("POST", "/receipt", httpHandler);

    //register status checker (GET method for /status)
    const statusChecker = new Lambda(this, "statusChecker");
    api.addIntegration("GET", "/status/{ticket-id}", statusChecker);

    const healthCheck = new Lambda(this, "healthChecker");
    api.addIntegration("GET", "/health", healthCheck);



}}
