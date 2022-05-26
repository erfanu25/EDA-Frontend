import mongoose, { Schema, Document, model } from "mongoose"


export interface IMapper {
    modelName: string,
    tableName: string,
    mapperName: string,
    modelContent: string

}

const MapperSchema: Schema = new Schema({
    modelName: String,
    tableName: String,
    mapperName: String,
    modelContent: String

})

//export default mongoose.model<IMapper>("Mapper", MapperSchema,"Mapper")
export const MapperModel = model("Mapper", MapperSchema);