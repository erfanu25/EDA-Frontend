import mongoose from "mongoose";
import  { Schema, Document } from "mongoose"

 
export interface IEmployee {
    email:string,
    name: string;
    age: number;
    salary: number;
    gender:string;
    mobileNo:string;
    emergencyContactNo:string,
    birthDate:Date,
    address:string
}

const EmployeeSchema: Schema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    salary: { type: Number, required: true },
    gender: { type: String, required: false },
    mobileNo: { type: String, required: false },
    emergencyContactNo: { type: String, required: false },
    birthDate: { type: Date, required: false },
    address: { type: String, required: false },
})
// const empl= mongoose.model("Employee", EmployeeSchema)


export default mongoose.model<IEmployee>("Employee", EmployeeSchema)
