import { IFileInfo } from "../model/fileInfo.model";
import FileInfoRepo from "../repo/fileInfo.repo";

class FileInfoListHandler {
    private static fileInfoListHandler: FileInfoListHandler;
    private fileInfoRepo:FileInfoRepo = FileInfoRepo.getRepoInstance();

    private constructor() {
    }

    public static getHandlerInstance() {
        if (!this.fileInfoListHandler) {
            this.fileInfoListHandler = new FileInfoListHandler();
            return this.fileInfoListHandler;
        }
        return this.fileInfoListHandler;
    }

    public async getList(): Promise<IFileInfo[]> {
        return await this.fileInfoRepo.getList();
    }

    public async create(filesInfo:IFileInfo[]): Promise<IFileInfo[]> {
        return await this.fileInfoRepo.create(filesInfo);
    
    }

    
}

export default FileInfoListHandler;
