import mongoose from "mongoose";
import  { Schema, Document } from "mongoose"

 
export interface ICriteriaView {
    name: string;
    content: string;
    tableName:string
}

const CriteriaViewSchema: Schema = new Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    tableName: { type: String, required: true },
})

export default mongoose.model<ICriteriaView>("CriteriaView", CriteriaViewSchema)