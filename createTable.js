import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const main = async () => {
  const command = new CreateTableCommand({
    TableName: "REPROCESS_MATERIAL",
    AttributeDefinitions: [
      {
        AttributeName: "MATERIAL_ID",
        AttributeType: "N",
      },
    ],
    KeySchema: [
      {
        AttributeName: "MATERIAL_ID",
        KeyType: "HASH",
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  });

  const response = await client.send(command);
  console.log(response);
  return response;
};

main();