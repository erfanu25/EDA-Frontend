import { CriteriaViewDto } from "../../dto/criteriaView.dto";
import { ICriteriaView } from "../../model/criteria-view.model";
import CriteriaAddRepo from "../../repo/criteriaView/criteria-add.repo";
import CriteriaDeleteRepo from "../../repo/criteriaView/criteria-delete.repo";

class CriteriaOperationHandler {
    private static criteriaOperationHandler: CriteriaOperationHandler;
    private criteriaAddRepo:CriteriaAddRepo = CriteriaAddRepo.getRepoInstance();
    private criteriaDeleteRepo:CriteriaDeleteRepo = CriteriaDeleteRepo.getRepoInstance();

    private constructor() {
    }
    public static getHandlerInstance() {
        if (!this.criteriaOperationHandler) {
            this.criteriaOperationHandler = new CriteriaOperationHandler();
            return this.criteriaOperationHandler;
        }
        return this.criteriaOperationHandler;
    }
    public async add(criteriaViewDto:CriteriaViewDto):Promise<any>{
        var criteria: ICriteriaView = {name: criteriaViewDto.name,content: criteriaViewDto.content, tableName:criteriaViewDto.tableName   };
        return await this.criteriaAddRepo.Add(criteria);
    }
    public async Delete(id):Promise<any>{
        return await this.criteriaDeleteRepo.Delete(id);
    }
}

export default CriteriaOperationHandler;
