import { IStatus } from './../model/status.model';
import { IFileContent } from "../model/fileContent.model";
import statusModel from "../model/status.model";
import FileContentRepo from "../repo/fileContent.repo";

class FileContentHandler {
    private static fileContentHandler: FileContentHandler;
    private fileContentRepo: FileContentRepo = FileContentRepo.getRepoInstance();

    private constructor() {
    }

    public static getHandlerInstance() {
        if (!this.fileContentHandler) {
            this.fileContentHandler = new FileContentHandler();
            return this.fileContentHandler;
        }
        return this.fileContentHandler;
    }

    public async updateMappingForFile(fileId, mappingId): Promise<IFileContent> {
        return this.fileContentRepo.updateMappingForFile(fileId, mappingId)
    }

    public async updateFileStatusWithMappedStatus(fileId) {
        return this.fileContentRepo.updateFileStatusWithMappedStatus(fileId)
    }

    public async getFileContentById(fileId): Promise<IFileContent> {
        return this.fileContentRepo.getFileContentById(fileId)
    }


}

export default FileContentHandler;
