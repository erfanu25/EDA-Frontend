import mongoose from "mongoose";
import { Schema} from "mongoose"


export interface ICompany {
    name: String,
    title: string,
    type: string;
    address: string;
    status: string;
}

const CompanySchema: Schema = new Schema({
    name: String,
    title: String,
    type: String,
    address: String,
    status: String
})

export const Company = mongoose.model("Company", CompanySchema)