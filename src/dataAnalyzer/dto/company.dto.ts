import mongoose from "mongoose";
import  { Schema, Document } from "mongoose"

 
export interface ICompanyDto {
    name: string;
    address: string;
    telephone: string;
    contactPerson: string;
    email: string;
    taxNumber: string;
    revenue: number;

}
