import { ICompanyDto } from "../../dto/company.dto";
import { ICompany } from "../../model/company.model";
import CompanyAddRepo from "../../repo/company/company-add.repo";

class CompanyOperationHandler {
    private static CompanyOperationHandler: CompanyOperationHandler;
    private CompanyAddRepo:CompanyAddRepo = CompanyAddRepo.getRepoInstance();

    private constructor() {
    }
    public static getHandlerInstance() {
        if (!this.CompanyOperationHandler) {
            this.CompanyOperationHandler = new CompanyOperationHandler();
            return this.CompanyOperationHandler;
        }
        return this.CompanyOperationHandler;
    }
    public async add(companyDto:ICompanyDto){
        var company: ICompany = {
            email: companyDto.email, name: companyDto.name, address: companyDto.address,
            revenue: companyDto.revenue,
            telephone: companyDto.telephone,
            contactPerson: companyDto.contactPerson,
            taxNumber: companyDto.taxNumber
        };
        return await this.CompanyAddRepo.Add(company);
    }
}

export default CompanyOperationHandler;
