import mongoose from "mongoose";
import  { Schema, Document } from "mongoose"

 
export interface IEmployee {
    name: string;
    age: string;
    address: string;
}

const EmployeeSchema: Schema = new Schema({
    name: { type: String, required: true },
    age: { type: String, required: true },
    address: { type: String, required: true },
})
// const empl= mongoose.model("Employee", EmployeeSchema)


export default mongoose.model<IEmployee>("Employee", EmployeeSchema)
