import { connect } from "mongoose";
let db = null;
export const init = async () => {
  if (!db) {
    db = await connect(process.env["CosmosDbConnectionString"]);
    // console.log("Database Connection:");
    // console.log(db);
  }
};
