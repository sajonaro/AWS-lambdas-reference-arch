#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ReceiptApiStack } from '../lib/recept-app-stack';

const app = new cdk.App();
new ReceiptApiStack(app, 'ReceiptApiStack', {
    env: {
        account: process.env.AWS_ACCESS_KEY_ID,
        region:  process.env.AWS_DEFAULT_REGION
      }
});