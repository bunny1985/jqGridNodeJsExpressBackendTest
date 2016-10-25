    export default class GridResourceModel {
        total: number;
        page: number;
        records: number;
        rows: Array<Object>;
        
        constructor() {
            this.total = 0 ;
            this.page = 1;
            this.records = 0;
            this.rows = [];
        }

    }