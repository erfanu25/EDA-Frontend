import FileContentListHandler from "../handler/fileInfoList.handler";
import { IFileInfo } from "../model/fileInfo.model";

class FileContentService {
    private static fileContentService: FileContentService;
    private fileContentListHandler:FileContentListHandler = FileContentListHandler
                                                           .getHandlerInstance();
    private constructor() {
    }

    public static getServiceInstance() {
        if (!this.fileContentService) {
            this.fileContentService = new FileContentService();
        }
        return this.fileContentService;
    }

    public async getList(): Promise<IFileInfo[]> {
        return await this.fileContentListHandler.getList();
        //console.log("testing..........hello get list")
        //return null;
    }

    public async create(filesInfo:IFileInfo[]): Promise<IFileInfo[]> {
        return await this.fileContentListHandler.create(filesInfo);
    
    }
    
}

export default FileContentService;