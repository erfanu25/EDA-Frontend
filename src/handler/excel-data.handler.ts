import { getBlobFlie, listBlobs } from "../../lib/storage-connector";
import xlsx from 'xlsx';

class ExcelDataHandler {
    private static excelDataHandler: ExcelDataHandler;

    constructor() {
    }

    public static getHandlerInstance() {
        if (!this.excelDataHandler) {
            this.excelDataHandler = new ExcelDataHandler();
            return this.excelDataHandler;
        }
        return this.excelDataHandler;
    }

    public async getMappedExcelData(modelContent, filePath): Promise<any> {
        return await getBlobFlie(filePath).then(data => {

            const ws = this.processExcelDataToJson(data, "A1:ZZ4");
            const excelData = xlsx.utils.sheet_to_json(ws);

            return this.processTableMap(excelData, modelContent);
        });
        return null;
    }

    public async getExcelHeaders(filePath): Promise<any> {
        console.log(filePath);
        return await getBlobFlie(filePath).then(data => {

            const ws = this.processExcelDataToJson(data, "A1:ZZ1");
            const excelHeaders = xlsx.utils.sheet_to_json(ws, { header: 1 })[0];

            return excelHeaders;
        });
    }

    public processExcelDataToJson(data, range) {
        let wb = xlsx.read(data, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        ws['!ref'] = range;
        return ws;
    }

    public processTableMap(excelData, modelContent) {

        var excelHeader: any[] = Object.values(modelContent);
        var tableProperties: any[] = Object.keys(modelContent);

        var mappedData = JSON.parse(JSON.stringify(excelData, excelHeader, 4));

        var proceedData = [];
        mappedData.forEach(data => {
            proceedData.push(this.modifyInput(data, excelHeader, tableProperties));
        })

        return proceedData;
    }


    public modifyInput(data, excelHeader, tableProperties) {
        const modifiedInput = {}
        Object.values(data).forEach((item, index) => {
            modifiedInput[`${excelHeader[index]} (${tableProperties[index]})`] = item
        })
        return modifiedInput
    }


}



export default ExcelDataHandler;