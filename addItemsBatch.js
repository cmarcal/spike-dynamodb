import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  BatchWriteCommand,
  DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

function* chunkArray(arr, stride = 1) {
  for (let i = 0; i < arr.length; i += stride) {
    yield arr.slice(i, Math.min(i + stride, arr.length));
  }
}

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const main = async () => {
  const list = '[{"MATERIAL_ID": 1},{"MATERIAL_ID": 2},{"MATERIAL_ID": 3},{"MATERIAL_ID": 4},{"MATERIAL_ID": 5},{"MATERIAL_ID": 6},{"MATERIAL_ID": 7},{"MATERIAL_ID": 8},{"MATERIAL_ID": 9},{"MATERIAL_ID": 10},{"MATERIAL_ID": 11},{"MATERIAL_ID": 12},{"MATERIAL_ID": 13},{"MATERIAL_ID": 14},{"MATERIAL_ID": 15},{"MATERIAL_ID": 16},{"MATERIAL_ID": 17},{"MATERIAL_ID": 18},{"MATERIAL_ID": 19},{"MATERIAL_ID": 20},{"MATERIAL_ID": 21}]'

  const treatedList = JSON.parse(list);

  const listChunks = chunkArray(treatedList, 10);

  for (const chunk of listChunks) {
    const putRequests = chunk.map((item) => ({
      PutRequest: {
        Item: item,
      },
    }));

    const command = new BatchWriteCommand({
      RequestItems: {
        "REPROCESS_MATERIAL": putRequests,
      },
    });

    await docClient.send(command);
  }
};

main();

