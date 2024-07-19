import { DeleteTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const main = async () => {
  const command = new DeleteTableCommand({
    TableName: "REPROCESS_MATERIAL",
  });

  const response = await client.send(command);
  console.log(response);
  return response;
};

main();

