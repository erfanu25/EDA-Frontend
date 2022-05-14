
class QueryBuilderHandler {
    private static queryBuilderHandler: QueryBuilderHandler;

    private constructor() {
    }
    public static getHandlerInstance() {
        if (!this.queryBuilderHandler) {
            this.queryBuilderHandler = new QueryBuilderHandler();
            return this.queryBuilderHandler;
        }
        return this.queryBuilderHandler;
    }
    public async build(payload): Promise<any> {
        const queries = [];
        if(payload){
            payload.forEach(element => {
                if (element.operator=="Equals") {
                    queries.push({ [element["field"]]: element.value });
                }
                if (element.operator=="Contains") {
                    queries.push({ [element["field"]]: {$regex : element.value}});
                } 
                if (element.operator=="Starts_with") {
                    queries.push({ [element["field"]] : {$regex :`^${element.value}`}});
                }
                if (element.operator=="Ends_with") {
                    queries.push({ [element["field"]] : {$regex :`${element.value}$`}});
                }  
                if (element.operator=="Not_contains") {
                    queries.push({ [element["field"]] : { $not: {$regex:`${element.value}` }  }});
                }  
                if (element.operator=="Not_equals") {
                    queries.push({ [element["field"]] :{$ne :element.value} });
                }
                if (element.operator=="Less_than_or_equal_to") {
                    queries.push({ [element["field"]] : { $lte :element.value} });
                }
                if (element.operator=="Greater_than") {
                    queries.push({ [element["field"]] : { $gt :element.value} });
                }
                if (element.operator=="Greater_than_or_equal_to") {
                    queries.push({ [element["field"]] : { $gte :element.value} });
                }
                if (element.operator=="Date_is") {
                    queries.push({ [element["field"]] : new Date(element.value).toISOString() });
                }
                if (element.operator=="Date_is_BEFORE") {
                    queries.push({ [element["field"]] : { $lt : new Date(element.value).toISOString()} });
                }
                if (element.operator=="Greater_than_and_less_than") {
                    queries.push({ [element["field"]] : {$gt:element.value1, $lt:element.value2} });
                }
                if (element.operator=="Number_Range") {
                    queries.push({ [element["field"]] : {$gt:element.value1, $lt:element.value2} });
                }
            });
        }
        let query = {};
        if (queries.length === 1) {
            query = { ...queries[0] };
        }
        if (queries.length > 1) {
            query = { $and: queries };
        }
        return query;
    }
}

export default QueryBuilderHandler;
