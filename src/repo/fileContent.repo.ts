import { IStatus } from './../model/status.model';
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

    public async getList(page: number,size: number): Promise<IFileContent[]> {
        const resultsPerPage : any = size;
        return await fileContentModel.find({})
            .sort({ createdAt:-1 })
            .limit(resultsPerPage)
            .skip(resultsPerPage * page)
            .populate({ path: 'status', model: statusModel });
    

    // return await fileContentModel.find({})
    //     .sort({ name: "asc" })
    //     .limit(resultsPerPage)
    //     .skip(resultsPerPage * page)
    //     .populate({ path: 'status', model: statusModel });
        // return await fileContentModel.find({})
        // .populate({ path: 'status', model: statusModel });
        //return await fileInfoModel.find()
        // .then(p=>console.log(p))
        //  .catch(error=>console.log(error));;
    }

    async getTotalContents() {
        return await fileContentModel.count({});
        
    }

    async create(fContent: IFileContent): Promise<IFileContent[]> {
        console.log("this is repo " + JSON.stringify(fContent) )
        return await fileContentModel.insertMany(fContent)
        .then(p => console.log(p))
        .catch(error => console.log(error));
    }
    async createStatus(fContents: IStatus[]): Promise<IStatus[]> {
        console.log("this is repo")
        return await statusModel.insertMany(fContents);
    }
    
}

export default FileContentRepo;