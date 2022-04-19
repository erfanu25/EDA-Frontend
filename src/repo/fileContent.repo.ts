import fileContentModel, { IFileContent } from "../model/fileContent.model";
import statusModel from "../model/status.model";

class FileContentRepo {
    static fileContentRepo: FileContentRepo;
    private constructor() {
    }
    
    public static getRepoInstance() {
        if (!this.fileContentRepo) {
            this.fileContentRepo = new FileContentRepo();
        }
        return this.fileContentRepo;
    }

    public async getList(): Promise<IFileContent[]> {
        return await fileContentModel.find({})
        .populate({ path: 'status', model: statusModel });
        //return await fileInfoModel.find()
        // .then(p=>console.log(p))
        //  .catch(error=>console.log(error));;
    }

    async create(fContents: IFileContent[]): Promise<IFileContent[]> {
        console.log("this is repo")
        return await fileContentModel.insertMany(fContents)
        .then(p => console.log(p))
        .catch(error => console.log(error));
        
    }
    
}

export default FileContentRepo;