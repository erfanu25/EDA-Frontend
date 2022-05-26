import FileContentHandler from "../handler/fileContent.handler";
import FileContentListHandler from "../handler/fileContentList.handler";
import { IFileContent } from "../model/fileContent.model";

class FileContentService {
    private static fileContentService: FileContentService;
    private fileContentListHandler: FileContentListHandler = FileContentListHandler
        .getHandlerInstance();

    private fileContentHandler: FileContentHandler = FileContentHandler
        .getHandlerInstance();

    private constructor() {
    }

    public static getServiceInstance() {
        if (!this.fileContentService) {
            this.fileContentService = new FileContentService();
        }
        return this.fileContentService;
    }

    public async getList(page: number, size: number) {
        return await this.fileContentListHandler.getList(page, size);
        //console.log("testing..........hello get list")
        //return null;
    }

    public async create(fContent: IFileContent): Promise<IFileContent[]> {
        return await this.fileContentListHandler.create(fContent);

    }

    public async updateMappingForFile(fileId, mappingId): Promise<IFileContent> {
        return this.fileContentHandler.updateMappingForFile(fileId, mappingId)
    }

    public async updateFileStatusWithMappedStatus(fileId) {
        return this.fileContentHandler.updateFileStatusWithMappedStatus(fileId)
    }

}

export default FileContentService;