import { CriteriaViewDto } from "../../dto/criteriaView.dto";
import CriteriaViewModel from "../../model/criteria-view.model";

class CriteriaListRepo {
    static criteriaInfoRepo: CriteriaListRepo;
    private constructor() {
    }
    
    public static getRepoInstance() {
        if (!this.criteriaInfoRepo) {
            this.criteriaInfoRepo = new CriteriaListRepo();
        }
        return this.criteriaInfoRepo;
    }

    public async getList(tableName:string): Promise<CriteriaViewDto[]> {
        return await CriteriaViewModel.find({ "tableName": tableName });
    }
    
}

export default CriteriaListRepo;