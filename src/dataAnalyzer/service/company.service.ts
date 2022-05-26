import { ICompanyDto } from "../dto/company.dto";
import CompanyOperationHandler from "../handler/company/company-operation.handler";

class CompanyOperationService {
    private static companyOperationService: CompanyOperationService;
    private companyOperationHandler:CompanyOperationHandler = CompanyOperationHandler
                                                           .getHandlerInstance();


    private constructor() {
    }

    public static getServiceInstance() {
        if (!this.companyOperationService) {
            this.companyOperationService = new CompanyOperationService();
        }
        return this.companyOperationService;
    }
    public async Add(company:ICompanyDto){
        return await this.companyOperationHandler.add(company);
    }
   
}

export default CompanyOperationService;