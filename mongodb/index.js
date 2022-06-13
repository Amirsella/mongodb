// const { MongoClient } = require("mongodb");
console.log("hey");
async function main() {
  const MongoClient = require("mongodb").MongoClient;
  let uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();

   
  } catch (error) {
    console.log("Oops! something went wrong" + error);
  } finally {
    client.close();
    console.log("the connection was close");
  }
}

async function listOfDataBase(client) {
  const databaseList = await client.db().admin().listDatabases();

  databaseList.databases.forEach((db) => {
    console.log("DB Name:" + db.name);
  });
}

async function addProject(
  client,
  projectName,
  leader0,
  leader1,
  ProgrammingLang0,
  ProgrammingLang1,
  ProgrammingLang2,
  ProjectTypeNum
) {
  let project = {
    name: projectName,
    leaders: [leader0, leader1],
    ProgrammingLang: [ProgrammingLang0, ProgrammingLang1, ProgrammingLang2],
    typeProject: ProjectTypeNum,
  };
  const result = await client
    .db("Customers")
    .collection("projects")
    .insertOne(project);
}

async function insertProjectType(
  client,
  projectType,
  location0,
  location1,
  programer0,
  programer1,
  programer2
) {
  let TpeOfProject = {
    name: projectType,
    Location: [location0, location1],
    Team: [programer0, programer1, programer2],
  };
  const result = await client
    .db("Customers")
    .collection("projectType")
    .insertOne(TpeOfProject);
}

async function InsertError(
  client,
  ErrorType,

  If1line0,
  If1line1,

  If2line0,
  If2line1,
  If2line2,
  projetid
) {
  let Errors = {
    type: ErrorType,
    mainFile: [If1line0, If1line1],
    mainFunction: [If2line0, If2line1, If2line2],
    projectId: projetid,
  };
  const result = await client
    .db("Customers")
    .collection("Error")
    .insertOne(Errors);
}

async function addProjectToError(client, projectName, error) {
  const setError = await client
    .db("Customers")
    .collection("projects")
    .updateOne({ name: projectName }, { $set: { ErrorId: error } });
  console.log(setError);
}

async function AddErrorToProject(client, findpError, error) {
  const setError = await client
    .db("Customers")
    .collection("Error")
    .updateOne({ projectId: findpError }, { $set: { projectId: error } });
  console.log(setError);
}

async function typeToProject(client, typeProject, error) {
  const setError = await client
    .db("Customers")
    .collection("projects")
    .updateOne({ typeProject: typeProject }, { $set: { typeProject: error } });
  console.log(setError);
}

main();