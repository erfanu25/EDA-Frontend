
 
export class SearchCriteria {
    public field: string = ""
    public operator: string = ""
    public value: string = ""
    public minValue: string = ""
    public maxValue:string = ""
    public searchType: string = ""
    public constructor(init?:Partial<SearchCriteria>) {
        Object.assign(this, init);
    }
}