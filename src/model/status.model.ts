import mongoose,{ Schema} from "mongoose";
export interface IStatus {
    name : string,
}
const StatusSchema = new Schema<IStatus>({
    name: {
      type: String,
      required: true,
    }
  });
//export default model.call(require('mongoose'), 'Status', StatusSchema);
export default mongoose.model<IStatus>("status", StatusSchema)