import { IFileContent } from "../model/fileContent.model";
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

    public async getList(): Promise<IFileContent[]> {
        return await this.fileContentRepo.getList();
    }

    public async create(fContent:IFileContent[]): Promise<IFileContent[]> {
        console.log("this is handler")
        return await this.fileContentRepo.create(fContent);
    
    }

    
}

export default FileContentListHandler;
