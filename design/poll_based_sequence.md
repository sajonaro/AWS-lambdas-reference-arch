::: mermaid
sequenceDiagram
    participant client
    participant API Gateway
    participant HTTP Handler
    participant Validation Queue
    participant Validator
    participant SNS topic
    participant Warehouse API Reg
    participant Tax API Reg
    participant Inbound webhook handler

    
    client->>API Gateway : access via poll based api
    API Gateway->>client : return ticket (Id)
    API Gateway->>HTTP Handler: redirect to HTTP handler
    HTTP Handler->>HTTP Handler: save ticket ID to DB
    HTTP Handler->>Validation Queue: publish payload to validation queue

    Validation Queue->>Validator: trigger ticker validator
    Validator->>SNS topic: publish to SNS topic 
    SNS topic->>Validator: publish to SNS topic 
    
    par trigger Tax api handler via queue
        SNS topic->>Tax API Reg: invoke Tax service 
        Tax API Reg->>Tax API Reg: submit and provide webhook URL  
    and trigger warehouse api handler via queue
        SNS topic->>Warehouse API Reg: invoke Warehouse service 
        Warehouse API Reg->>Warehouse API Reg: submit and provide webhook URL  
    end

 
    alt status ! COMPLETE
        client->>API Gateway : poll
        API Gateway->>HTTP Handler: redirect to HTTP handler
        HTTP Handler->>client: return ticket(Id), status PROCESSING
    else ticket status is COMPLETE
        HTTP Handler->>HTTP Handler: check the state in DB
        HTTP Handler->>client: return 200 (OK)    
    end

    

    par POST webhook is called by Tax service
        API Gateway->>API Gateway: POST webhook is called by Tax service
        API Gateway->>Inbound webhook handler: is triggered
        Inbound webhook handler->>Inbound webhook handler: save status COMPLETE to DB
    and POST webhook is called by Warehouse service
        API Gateway->>API Gateway: POST webhook is called by Warehouse service
        API Gateway->>Inbound webhook handler: is triggered
        Inbound webhook handler->>Inbound webhook handler: save status COMPLETE to DB
    end


    
  
       
   




:::








