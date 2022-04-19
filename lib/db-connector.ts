import { connect } from "mongoose";
let db = null;
export const init = async () => {
  if (!db) {
    db = await connect(process.env["CosmosDbConnectionString"]);
  }
};
