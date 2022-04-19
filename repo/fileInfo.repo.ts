import fileInfoModel, { IFileInfo } from "../model/fileInfo.model";
import statusModel from "../model/status.model";

class FileInfoRepo {
    static fileInfoRepo: FileInfoRepo;
    private constructor() {
    }
    
    public static getRepoInstance() {
        if (!this.fileInfoRepo) {
            this.fileInfoRepo = new FileInfoRepo();
        }
        return this.fileInfoRepo;
    }

    public async getList(): Promise<IFileInfo[]> {
        return await fileInfoModel.find({})
        .populate({ path: 'status', model: statusModel });
        //return await fileInfoModel.find()
        // .then(p=>console.log(p))
        //  .catch(error=>console.log(error));;
    }

    async create(filesInfo: IFileInfo[]): Promise<IFileInfo[]> {
        return await fileInfoModel.insertMany(filesInfo);
        
    }
    
}

export default FileInfoRepo;