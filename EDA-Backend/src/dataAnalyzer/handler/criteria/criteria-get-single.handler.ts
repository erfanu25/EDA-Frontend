import { CriteriaViewDto } from "../../dto/criteriaView.dto";
import { ICriteriaView } from "../../model/criteria-view.model";
import CriteriaAddRepo from "../../repo/criteriaView/criteria-add.repo";
import CriteriaGetSingleRepo from "../../repo/criteriaView/criteria-get-single.repo";

class CriteriaGetSingleHandler {
    private static criteriaGetSingleHandler: CriteriaGetSingleHandler;
    private criteriaGetSingleRepo:CriteriaGetSingleRepo = CriteriaGetSingleRepo.getRepoInstance();

    private constructor() {
    }
    public static getHandlerInstance() {
        if (!this.criteriaGetSingleHandler) {
            this.criteriaGetSingleHandler = new CriteriaGetSingleHandler();
            return this.criteriaGetSingleHandler;
        }
        return this.criteriaGetSingleHandler;
    }
    public async Get(name:string):Promise<any>{
        return await this.criteriaGetSingleRepo.Get(name);
    }
}

export default CriteriaGetSingleHandler;
