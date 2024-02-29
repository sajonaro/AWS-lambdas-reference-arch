#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ReceiptApiStack } from '../lib/recept-app-stack';

const app = new cdk.App();
new ReceiptApiStack(app, 'ReceiptApiStack', {
});