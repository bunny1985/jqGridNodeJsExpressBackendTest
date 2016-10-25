    import  GridResourceSettignsFilterRule from "./gridResourceSettignsFilterRule";

    export   { GridResourceSettignsFilterRule };
    
    export  class GridResourceSettingsFilter {
        
        constructor() {
            this.groupOp = "AND" ;
            this.rules = [] ;
            this.groups = []; 
            
        }
        groupOp: String;
        rules: Array<GridResourceSettignsFilterRule>;
        groups: Array<any>;
    }