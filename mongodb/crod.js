async function main() {
    const MongoClient = require("mongodb").MongoClient;
    let uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);
    try {
      removeErrorById(client);
      await client.connect();
    } catch (error) {
      console.log("oops something went wrong" + error);
    } finally {
      client.close();
      console.log("the connection was close");
    }
  }
  
 
  async function removeErrorById(client) {
    let mongodb = require("mongodb");
    const removeError = await client
      .db("Customers")
      .collection("projects")
      .deleteOne({ _id: mongodb.ObjectID("629f84ab10add99a8c651fc4") });
    console.log(removeError);
  }

  
 
  async function addProjectToError(client, projectName, error) {
    const setError = await client
      .db("Customers")
      .collection("projects")
      .updateOne({ name: projectName }, { $set: { ErrorId: error } });
    console.log(setError);
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
  

  
  async function findProjectsByError(collection, _id) {
    try {
      let Result = await collection.find({ Error: errorId }).forEach((result) => {
        console.log(Result);
      });
      console.log("Finish");
    } catch (error) {
      console.log("there is no error");
    }
  }
  
  main();