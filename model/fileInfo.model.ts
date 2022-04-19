import mongoose,{ Schema,Types,model} from "mongoose";
import { IStatus } from "./status.model";
// 1. Create an interface representing a document in MongoDB.
export interface IFileInfo {
    name: string,
    status: IStatus,
    createdAt :number,
    scheduleAt : number,
    path : string

}
//Create a Schema corresponding to the document interface.
const fileInfoSchema = new Schema<IFileInfo>({
    name: { type: String, required: true },
    status: {
        type: Types.ObjectId,
        ref : "status" 
        
    },
    createdAt: { type: Number, required: true },
    scheduleAt: { type: Number, required: false },
    path:{type : String, required:true}
  });

  export default model.call(require('mongoose'), 'FileInfo', fileInfoSchema);

 //export default mongoose.model<IFileInfo>("FileInfo", fileInfoSchema)

  