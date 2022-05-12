import { IStatus } from './../model/status.model';
import { IFileContent } from "../model/fileContent.model";
import statusModel from "../model/status.model";
import FileContentRepo from "../repo/fileContent.repo";

class FileContentListHandler {
    private static fileContentListHandler: FileContentListHandler;
    private fileContentRepo:FileContentRepo = FileContentRepo.getRepoInstance();

    private constructor() {
    }

    public static getHandlerInstance() {
        if (!this.fileContentListHandler) {
            this.fileContentListHandler = new FileContentListHandler();
            return this.fileContentListHandler;
        }
        return this.fileContentListHandler;
    }

    public async getList(page : number,size : number) {
        let totalContents = 0;
        totalContents = await this.fileContentRepo.getTotalContents();
        let contents = await this.fileContentRepo.getList(page,size);
        return {
            data : contents,
            total : totalContents
        }

    }

    public async create(fContent:IFileContent): Promise<IFileContent[]> {
        let dbStatus : IStatus  = await statusModel.findOne({'name' : 'UNMAPPED'});
        fContent.createdAt = Date.now();
        fContent.status = dbStatus;
        return await this.fileContentRepo.create(fContent);
    }

    
}

export default FileContentListHandler;
