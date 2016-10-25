     import { GridResourceSettingsFilter , GridResourceSettingsFilterRule }  from "./gridResourceSettingsFilter"
     
     export  { GridResourceSettingsFilter , GridResourceSettingsFilterRule} ;
     
     
     export class GridResourceSettings {
        _search: boolean;
        rows: number;
        page: number;
        /**
         * Sort Column (or columns- more details in jqgrid documentation)
         */
        sidx: string;
        /**
         * Sort Order
         */
        sord: string;
        filters: JqGirResModelSettingsFilter;
        constructor() {
            this.filters = new GridResourceSettingsFilter();
            this._search = true;
            this.rows = 25; //default Value
            this.page = 1;
            this.sidx = null;
            this.sord = "asc";
        }
    }