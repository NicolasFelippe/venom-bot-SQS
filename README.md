# whats-notification

Messages are sent to the SQS fifo queue, and then consumed by polling nodejs, which is encapsulated inside the venom bot after start.

## IMPORTANT!
Use this project at your own risk. Project was made to send notifications to customers of an establishment, a way to not have to spend on SMS sending.

## RUN
1. npm i <br/>
2. Create queue on AWS - SQS <br/>
3. copy the .env.example file to create the .env file <br/>
4. npm run dev <br/>
5. npm run test (send SQS message test queue) <br/>
