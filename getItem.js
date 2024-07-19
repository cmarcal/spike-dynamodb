//https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/dynamodb/command/ScanCommand/

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const main = async () => {
  const command = new ScanCommand({
    TableName: "REPROCESS_MATERIAL",
  });

  const response = await docClient.send(command);
  for (const material of response.Items) {
    console.log(`materialId: ${material.MATERIAL_ID}`);
  }
  return response;
};

main();
