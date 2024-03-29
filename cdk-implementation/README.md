

## prerequisites

- install cdklocal npm package
    ```
    npm install -g aws-cdk-local aws-cdk
    ```
-   Verify it installed correctly
    ```
    cdklocal --version
    # e.g. 1.65.5
    ```
- install docker & docker compose e.g.:
   ```
   curl -fsSL https://get.docker.com | sh && \
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
   sudo chmod +x /usr/local/bin/docker-compose

   ```

## how to run via localstack (in docker) 

-  configure AWS account (add profile name ls to aws config file)
    ```
    ./configure_aws_profile.sh 
    ```

-   run 
    ```
    docker compose up -d
    ```


-   check cloudformation code generated by ckdloacal
    ```
    cdklocal synth > tmp.yml
    ```
-   To deploy above code 
    ```
    cdklocal bootstrap --profile ls
    ```    




## useful commands  
** (!use *cdklocal* instead of *cdk* to run locally!)

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

The `cdk.json` file tells the CDK Toolkit how to execute your app.