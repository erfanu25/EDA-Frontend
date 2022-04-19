import mongoose,{ Schema,Types,model} from "mongoose";
import { IStatus } from "./status.model";
// 1. Create an interface representing a document in MongoDB.
export interface IFileContent {
    name: string,
    status: IStatus,
    createdAt :number,
    scheduleAt : number,
    path : string

}
//Create a Schema corresponding to the document interface.
const fileContentSchema = new Schema<IFileContent>({
    name: { type: String, required: true },
    status: {
        type: Types.ObjectId,
        ref : "status" 
        
    },
    createdAt: { type: Number, required: true },
    scheduleAt: { type: Number, required: false },
    path:{type : String, required:true}
  });

  export default model.call(require('mongoose'), 'FileContent', fileContentSchema);

 //export default mongoose.model<IFileInfo>("FileInfo", fileInfoSchema)

  