import { EmployeeDto } from "../../dto/employee.dto";
import CriteriaViewModel, { ICriteriaView } from "../../model/criteria-view.model";

class CriteriaAddRepo {
    static criteriaAddRepo: CriteriaAddRepo;
    private constructor() {
    }
    
    public static getRepoInstance() {
        if (!this.criteriaAddRepo) {
            this.criteriaAddRepo = new CriteriaAddRepo();
        }
        return this.criteriaAddRepo;
    }

    public async Add(criteria :ICriteriaView) : Promise<any>{
        const criteriaModel = new CriteriaViewModel({
            name: criteria.name,
            content: criteria.content,
            tableName: criteria.tableName,

        });
        var result= await criteriaModel.save();
        console.log("resutl:");
        console.log(result);
        return result
    }
}

export default CriteriaAddRepo;