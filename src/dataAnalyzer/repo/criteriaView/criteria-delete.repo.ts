import mongoose from "mongoose";
import { EmployeeDto } from "../../dto/employee.dto";
import CriteriaViewModel, { ICriteriaView } from "../../model/criteria-view.model";

class CriteriaDeleteRepo {
    static criteriaDeleteRepo: CriteriaDeleteRepo;
    private constructor() {
    }
    
    public static getRepoInstance() {
        if (!this.criteriaDeleteRepo) {
            this.criteriaDeleteRepo = new CriteriaDeleteRepo();
        }
        return this.criteriaDeleteRepo;
    }

    public async Delete(id) : Promise<any>{
        const model = await mongoose.models["CriteriaView"].findById(id);
        if (model) {
          const result = await mongoose.models["CriteriaView"].deleteOne({ _id: id });
          return result;
        }
        throw new Error(`CriteriaView not found by the id: ${id}`);
    }
}

export default CriteriaDeleteRepo;