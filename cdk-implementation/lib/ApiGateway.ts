import { RemovalPolicy } from "aws-cdk-lib";
import { LogGroupLogDestination, RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";   
import { IFunction } from "aws-cdk-lib/aws-lambda";
import { LogGroup, RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
export class ApiGateway extends RestApi {
    constructor(scope: Construct) {
        super(scope, "ApiGateway", {
            restApiName: "receipt-api",
            deployOptions: {
                accessLogDestination: new LogGroupLogDestination(new LogGroup(scope,"ApiLogGroup",{
                    logGroupName: "receipts-api",
                    retention: RetentionDays.ONE_WEEK,
                    removalPolicy: RemovalPolicy.DESTROY
                }))

            }

        })
    }
    addIntegration(method: string, path: string, lambda: IFunction) {
        const resource = this.root.resourceForPath(path);
        resource.addMethod(method, new LambdaIntegration(lambda));
    }
}