import { Schema, model, connect,Types } from "mongoose";

let db=null;

export const init = async () => {
  if(!db) {
    db = await connect(process.env["CosmosDbConnectionString"]);
  }
};

// export const addItem = async (doc) => {
//   const modelToInsert = new CategoryModel();
//   modelToInsert["name"] = doc.name;
//   modelToInsert["path"] = doc.path;
//   modelToInsert["status"] = doc.status;
//   modelToInsert["createdAt"] = doc.createdAt;
//   modelToInsert["scheduleAt"] = doc.scheduleAt;

//   return await modelToInsert.save();
// };
// export const findItemById = async (id) => {
//   return await CategoryModel.findById(id);
// };
// export const findItems = async (query = {}) => {
//   return await CategoryModel.find()
//   .populate("status");
//   // .then(p=>console.log(p))
//   // .catch(error=>console.log(error));
// };
// export const deleteItemById = async (id) => {
//   return await CategoryModel.findByIdAndDelete(id);
// };