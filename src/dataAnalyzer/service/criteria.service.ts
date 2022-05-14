import { CriteriaViewDto } from "../dto/criteriaView.dto";
import CriteriaGetSingleHandler from "../handler/criteria/criteria-get-single.handler";
import CriteriaListHandler from "../handler/criteria/criteria-list.handler";
import CriteriaOperationHandler from "../handler/criteria/criteria-operation.handler";

class CriteriaOperationService {
    private static criteriaOperationService: CriteriaOperationService;
    private criteriaOperationHandler:CriteriaOperationHandler = CriteriaOperationHandler
                                                           .getHandlerInstance();

    private criteriaListHandler:CriteriaListHandler = CriteriaListHandler
    .getHandlerInstance();

    private criteriaGetSingleHandler:CriteriaGetSingleHandler = CriteriaGetSingleHandler
    .getHandlerInstance();  
    
    private constructor() {
    }

    public static getServiceInstance() {
        if (!this.criteriaOperationService) {
            this.criteriaOperationService = new CriteriaOperationService();
        }
        if (!this.criteriaOperationService) {
            this.criteriaOperationService = new CriteriaOperationService();
        }
        return this.criteriaOperationService;
    }

    public async Add(criteria:CriteriaViewDto):Promise<any>{
        var existData=await this.criteriaGetSingleHandler.Get(criteria.name);
        if(existData.length == 0){
            return await this.criteriaOperationHandler.add(criteria);
        }
        return "Criteria Already Existed";
    }
    public async GetList(){
        return await this.criteriaListHandler.getList();
    }
    public async Delete(id):Promise<any>{
        return await this.criteriaOperationHandler.Delete(id);
    }
}

export default CriteriaOperationService;