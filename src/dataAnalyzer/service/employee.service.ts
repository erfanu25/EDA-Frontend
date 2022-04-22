import { EmployeeDto } from "../dto/employee.dto";
import EmployeeGetSingleHandler from "../handler/employee/employee-get-single.handler";
import EmployeeOperationHandler from "../handler/employee/employee-operation.handler";

class EmployeeOperationService {
    private static employeeOperationService: EmployeeOperationService;
    private employeeOperationHandler:EmployeeOperationHandler = EmployeeOperationHandler
                                                           .getHandlerInstance();
    private employeeGetSingleHandler:EmployeeGetSingleHandler = EmployeeGetSingleHandler
    .getHandlerInstance();  

    private constructor() {
    }

    public static getServiceInstance() {
        if (!this.employeeOperationService) {
            this.employeeOperationService = new EmployeeOperationService();
        }
        return this.employeeOperationService;
    }
    public async Add(employee:EmployeeDto){
        var existData=await this.employeeGetSingleHandler.Get(employee.email);
        if(existData.length == 0){
            return await this.employeeOperationHandler.add(employee);
        }
        return "Employee Email Already Existed";
    }
}

export default EmployeeOperationService;