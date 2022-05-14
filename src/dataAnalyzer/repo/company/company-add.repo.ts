import CompanyModel from "../../model/company.model";
import  { ICompany } from "../../model/company.model";

class CompanyAddRepo {
    static companyAddRepo: CompanyAddRepo;
    private constructor() {
    }
    
    public static getRepoInstance() {
        if (!this.companyAddRepo) {
            this.companyAddRepo = new CompanyAddRepo();
        }
        return this.companyAddRepo;
    }

    public async Add(company :ICompany) : Promise<any>{
        const companyModel = new CompanyModel({
            email: company.email,
            name: company.name,
            address: company.address,
            revenue: company.revenue,
            telephone: company.telephone,
            contactPerson: company.contactPerson,
            taxNumber: company.taxNumber
        });
        var result= await companyModel.save();
        return result
    }
    
}

export default CompanyAddRepo;