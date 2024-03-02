#!/usr/bin/env bash

docker compose up -d

export AWS_ACCESS_KEY_ID=000000000000
export AWS_DEFAULT_REGION=us-east-1

yarn build
cdklocal synth  -v
cdklocal bootstrap  -v 
cdklocal deploy  -v  --require-approval never
