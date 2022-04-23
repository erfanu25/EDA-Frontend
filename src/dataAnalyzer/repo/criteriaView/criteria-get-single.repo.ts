import CriteriaViewModel, { ICriteriaView } from "../../model/criteria-view.model";

class CriteriaGetSingleRepo {
    static criteriaGetRepo: CriteriaGetSingleRepo;
    private constructor() {
    }
    
    public static getRepoInstance() {
        if (!this.criteriaGetRepo) {
            this.criteriaGetRepo = new CriteriaGetSingleRepo();
        }
        return this.criteriaGetRepo;
    }

    public async Get(criteriaName :string) : Promise<any>{
        return CriteriaViewModel.find({name:criteriaName}).populate("name");
    }

    
}

export default CriteriaGetSingleRepo;