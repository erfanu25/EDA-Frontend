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

    public async getList(): Promise<CriteriaViewDto[]> {
        return await CriteriaViewModel.find();
    }
    
}

export default CriteriaListRepo;