const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");
const {
  PutCommand,
  ScanCommand,
  GetCommand,
} = require("@aws-sdk/lib-dynamodb");
const { getAgentResponse } = require("./agent");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION_1,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_1,
    secretAccessKey: process.env.AWS_SECRET_KEY_1,
  },
});

const ddbDocClient = DynamoDBDocumentClient.from(client);

const getAllRuns = async (req, res) => {
  try {
    console.log(process.env.DYNAMODB_TABLE_NAME);
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
    };
    const data = await ddbDocClient.send(new ScanCommand(params));
    res.status(200).json(data.Items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createRun = async (req, res) => {
  let data = {
    issue: req.body.issue,
    description: req.body.description,
  };

  const totalRums = await getTotalRuns();
  if (totalRums > daysPassed() * 100) {
    return res
      .status(400)
      .json({ message: "You have reached the limit of 100 runs per day" });
  }

  let system = await getAgentResponse(data);
  system = JSON.parse(system);
  console.log(
    "system",
    system,
    typeof system,
    system.resolution,
    system.resolution_description,
    system.confidence_score
  );

  const item = {
    id: Math.floor(Math.random() * 1000) + "",
    customer_name: req.body.customer_name,
    customer_email: req.body.customer_email,
    issue: req.body.issue,
    issue_description: req.body.description,
    resolution: system.resolution,
    resolution_description: system.resolution_description,
    confidence_score: system.confidence_score,
    date: new Date().toISOString(),
  };

  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Item: item,
  };

  try {
    await ddbDocClient.send(new PutCommand(params));
    res.status(201).json(item);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getRun = async (req, res) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE_NAME,
    Key: {
      id: req.params.id,
    },
  };

  try {
    const data = await ddbDocClient.send(new GetCommand(params));
    res.status(200).json(data.Item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get total number of runs
const getTotalRuns = async () => {
  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE_NAME,
    };
    const data = await ddbDocClient.send(new ScanCommand(params));
    return data.Items.length;
  } catch (error) {
    console.log(error);
  }
};

const daysPassed = () => {
  const today = new Date();
  const startDate = new Date("2021-09-14");
  const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  return daysPassed;
};

module.exports = {
  getAllRuns,
  createRun,
  getRun,
};
