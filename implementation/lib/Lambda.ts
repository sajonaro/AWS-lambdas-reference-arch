import { Architecture,Runtime } from "aws-cdk-lib/aws-lambda"; 
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { RetentionDays } from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs";
import path = require("path");
export class Lambda extends NodejsFunction {
    constructor(scope: Construct, filename: string) {
        super(scope, filename, {
            runtime: Runtime.NODEJS_18_X,
            architecture: Architecture.X86_64,
            entry: path.join(__dirname,`../handlers/${filename}.ts`),
            logRetention: RetentionDays.ONE_WEEK,
            handler: 'handler',
            bundling: {
                minify: true,
                sourceMap: true,
                externalModules: ['aws-sdk', 'aws-sdk/clients/dynamodb', 'aws-sdk/clients/s3', 'aws-sdk/clients/sqs', 'aws-sdk/clients/sns'],
            },
        });
    }
    }