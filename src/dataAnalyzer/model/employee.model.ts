import mongoose from "mongoose";
import  { Schema, Document } from "mongoose"

 
export interface IEmployee {
    email:string,
    name: string;
    age: number;
    salary: number;
}

const EmployeeSchema: Schema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    salary: { type: Number, required: true },
})
// const empl= mongoose.model("Employee", EmployeeSchema)


export default mongoose.model<IEmployee>("Employee", EmployeeSchema)
