import { EmployeeDto } from "../dto/employee.dto";
import EmployeeOperationHandler from "../handler/employee/employee-operation.handler";

class EmployeeOperationService {
    private static employeeOperationService: EmployeeOperationService;
    private employeeOperationHandler:EmployeeOperationHandler = EmployeeOperationHandler
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
        return await this.employeeOperationHandler.add(employee);
    }
    
}

export default EmployeeOperationService;