import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const main = async () => {
  const command = new DeleteCommand({
    TableName: "REPROCESS_MATERIAL",
    Key: {
      MATERIAL_ID: "77",
    },
  });

  const response = await docClient.send(command);
  console.log(response);
  return response;
};

main();