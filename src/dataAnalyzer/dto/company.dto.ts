import mongoose from "mongoose";
import  { Schema, Document } from "mongoose"

 
export interface ICompanyDto {
    title: string;
    type: string;
    address: string;
    status: string;

}
