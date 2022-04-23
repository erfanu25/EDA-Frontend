import { ICriteriaView } from "../../model/criteria-view.model";
import { IEmployee } from "../../model/employee.model";
import CriteriaListRepo from "../../repo/criteriaView/criteria-list.repo";

class CriteriaListHandler {
    private static criteriaListHandler: CriteriaListHandler;
    private criteriaListRepo:CriteriaListRepo = CriteriaListRepo.getRepoInstance();

    private constructor() {
    }

    public static getHandlerInstance() {
        if (!this.criteriaListHandler) {
            this.criteriaListHandler = new CriteriaListHandler();
            return this.criteriaListHandler;
        }
        return this.criteriaListHandler;
    }

    public async getList(): Promise<ICriteriaView[]> {
        return await this.criteriaListRepo.getList();
    }

    
}

export default CriteriaListHandler;
