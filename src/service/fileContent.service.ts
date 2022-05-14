import FileContentListHandler from "../handler/fileContentList.handler";
import { IFileContent } from "../model/fileContent.model";

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

    public async getList(page: number,size : number) {
        return await this.fileContentListHandler.getList(page,size);
        //console.log("testing..........hello get list")
        //return null;
    }

    public async create(fContent:IFileContent): Promise<IFileContent[]> {
        return await this.fileContentListHandler.create(fContent);
    
    }
    
}

export default FileContentService;