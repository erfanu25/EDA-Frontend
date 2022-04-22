import mongoose from "mongoose";
import  { Schema, Document } from "mongoose"

 
export interface ICompany {
    title: string;
    type: string;
    address: string;
    status: string;

}

const CompanySchema: Schema = new Schema({
    name: {
        type: String
    },
    status: {
        _id: false,
        title: String,
        type: String,
        address: String,
        status: String,
    }
})

export default mongoose.model<ICompany>("Company", CompanySchema)