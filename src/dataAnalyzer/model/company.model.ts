import mongoose from "mongoose";
import  { Schema, Document } from "mongoose"
export interface ICompany {
    name: string;
    address: string;
    telephone: string;
    contactPerson: string;
    email: string;
    taxNumber: string;
    revenue: number;
}


const CompanySchema: Schema = new Schema({

    name: { type: String, required: true },
    address: { type: String, required: true },
    telephone: { type: String, required: true },
    contactPerson: { type: String, required: false },
    email: { type: String, required: true },
    taxNumber: { type: String, required: true },
    revenue: { type: Number, required: false },

})

export default mongoose.model<ICompany>("Company", CompanySchema)
