import { EmployeeDto } from "../dto/employee.dto";
import EmployeeGetSingleHandler from "../handler/employee/employee-get-single.handler";
import EmployeeListHandler from "../handler/employee/employee-list.handler";
import EmployeeOperationHandler from "../handler/employee/employee-operation.handler";
import QueryBuilderHandler from "../handler/query-builder/query-builder";

class EmployeeOperationService {
    private static employeeOperationService: EmployeeOperationService;
    private employeeOperationHandler:EmployeeOperationHandler = EmployeeOperationHandler
                                                           .getHandlerInstance();
    private employeeGetSingleHandler:EmployeeGetSingleHandler = EmployeeGetSingleHandler
    .getHandlerInstance();  
    private employeeListleHandler:EmployeeListHandler = EmployeeListHandler
    .getHandlerInstance();  
    private queryBuildHandler:QueryBuilderHandler = QueryBuilderHandler
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
        return "Employee Email Already Exist.";
    }
    public async GetList(){
        return await this.employeeListleHandler.getList();
    }
    public async GetSortedList(modelName,sortBy, sortType, pageSize, pageIndex,payload){
        let query=await this.queryBuildHandler.build(payload);
        return await this.employeeListleHandler.getSortedList(modelName,sortBy, sortType, pageSize, pageIndex,query);
    }

    public async GetSearchedEmployeeList( minRange, maxRange, searchedText){

        return await this.employeeListleHandler.getSearchedEmployeeList(minRange, maxRange, searchedText);
    }
    public async CountEmployees(modelName,payload){
        let query=await this.queryBuildHandler.build(payload);
        return await this.employeeListleHandler.countEmployees(modelName,query);
    }
}

export default EmployeeOperationService;