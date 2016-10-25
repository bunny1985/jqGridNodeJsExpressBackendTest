
import {Service , Inject,  } from "angular1_typescript_decorators/Decorators";
import "../directives/grid/sorting/jqSort"
import "../components/pager/PagerComponent"

export module grid {

    /**
     * Objects sended to backend - here are paging and filters rules 
     */
     export class JqGirResModelSettings {
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
            this.filters = new JqGirResModelSettingsFilter();
            this._search = true;
            this.rows = 25; //default Value
            this.page = 1;
            this.sidx = null;
            this.sord = "asc";
        }
    }
    export class JqGirResModelSettingsFilter {
        
        constructor() {
            this.groupOp = "AND" ;
            this.rules = [] ;
            this.groups = []; 
        }
        groupOp: String;
        rules: Array<JqGirResModelSettingsFilterRule>;
        groups: Array<any>;
    }
    export interface JqGirResModelSettingsFilterRule {
        data: any;
        field: string;
        op: string;
    }
    export class JqGridResourceObject {
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
    
    
    export function GridResourceFactory($http, $httpParamSerializer){
        return (url: string ) :GridResource => 
        {
            let service = new GridResource($http ,$httpParamSerializer );
            service.url = url;
            return service;
        }
    }
    GridResourceFactory.$inject = ["$http" , "$httpParamSerializer"];


    @Inject('$http', '$httpParamSerializer')
    @Service("IngCommon" ,"GridResource")
    export class GridResource {

            constructor( private $http : ng.IHttpService, private $httpParamSerializer: ng.IHttpParamSerializer) {
                this.working = false;
                this.error = false;
                this.settings = new JqGirResModelSettings();
                this.model = new JqGridResourceObject();
                
            }
            public url : any
            public working: boolean;
            public error: boolean;

            public apply(): ng.IPromise<{}>{
                 var uri = this.getUri();
                 let promise =  this.makeRequest(uri, this.settings);
                 
                  promise.then( 
                   (response: ng.IHttpPromiseCallbackArg<Object>)  => {
                      this.model = ( response.data as JqGridResourceObject);
                  });
                 return promise;
            }
            toggleSorting(colName: string): string{
                this.settings.page = 1;
                if (this.settings.sidx == null || this.settings.sidx != colName) {
                    this.settings.sidx = colName;
                    this.settings.sord = "asc";
                    this.apply();
                    return "asc";
                } else {
                    if (this.settings.sord == "asc") {
                        this.settings.sord = "desc";
                        this.apply();
                        return "desc";
                    } else {
                        this.settings.sidx = null;
                        this.settings.sord = "asc";
                        this.apply();
                        return "";
                    }
                }
            }
            addRule(rule : JqGirResModelSettingsFilterRule  , apply: boolean = true){
                this.removeRule(rule.field);
                this.settings.filters.rules.push(rule);
                if(apply){
                    this.apply();
                }
            }
            
            getFirstElemetnVisibleNumber(): number{
                 return ((this.settings.page - 1) * this.settings.rows) + 1;
                 
            }
            getLastElementVisibleNumber(): number{
                let lastonBaseOnPage = this.settings.page * this.settings.rows;
                if (lastonBaseOnPage > this.model.records) {
                    return this.model.records;
                }
                return lastonBaseOnPage;
            }
            removeRule(fieldName: string): void{
                var removed = false;
                 angular.forEach(this.settings.filters.rules,  (item, key) =>  {
                     if (removed) return;
                     if (item.field == fieldName) {
                         this.settings.filters.rules.splice(key, 1);
                         removed = true;
                     }
                 });
            }
        
            settings: JqGirResModelSettings;
            model: JqGridResourceObject;


            private makeRequest = function (url, data):ng.IPromise<{}> {
                var req = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: this.$httpParamSerializer(data)
                };
                this.working = true;
                this.error = false;
                let q = this.$http(req);
                q.then( () =>  {
                    this.working = false;
                    this.ready = true;
                });
                q.error(
                     () =>  {
                        this.working = false;
                        this.error = true;
                    }
                );
                return q;
            };

            private  getUri():string {
                let uri :string ="";;

                //It is possible now to set url property as string or function
                if (angular.isFunction(this.url)) {
                    uri = (this.url() as string);
                } else {
                    uri = (this.url as string);
                }
                return uri as string;
            }
    }



}





// (function () {
//     "use strict";
//     var ISPApplication = angular.module("JsTools");
//     ISPApplication.factory('GridResource', ['$http', '$httpParamSerializer', '$resource', function ($http, $httpParamSerializer, $resource) {
//         var GridResource = function (url) {
//             var self = this;
//             this.working = false;
//             this.error = false;
//             this.settings = {};
//             //SETTINGS
//             this.settings.filters =
//             {
//                 "groupOp": "AND",
//                 "rules": [],
//                 "groups": []
//             };

//             this.settings._search = true;
//             this.settings.rows = 25; //default Value
//             this.settings.page = 1;
//             this.settings.sidx = null;
//             this.settings.sord = "asc";
//             //MODEL
//             this.model = {
//                 "total": 0, "page": 1, "records": 0, rows: []
//             };
//             this.url = url;// string || () => string;
//             //EXPOSED FUNCTIONS
//             var getFirstElemetnVisibleNumber = function () {
//                 return ((self.settings.page - 1) * self.settings.rows) + 1;
//             };
//             var getLastElementVisibleNumber = function () {
//                 var lastonBaseOnPage = self.settings.page * self.settings.rows;
//                 if (lastonBaseOnPage > self.model.records) {
//                     return self.model.records;
//                 }
//                 return lastonBaseOnPage;
//             };
//             var removeRule = function (fieldName) {
//                 var removed = false;
//                 angular.forEach(self.settings.filters.rules, function (item, key) {
//                     if (removed) return;
//                     if (item.field == fieldName) {
//                         self.settings.filters.rules.splice(key, 1);
//                         removed = true;
//                     }
//                 });
//             }
//             var toggleSorting = function (colName) {
//                 self.settings.page = 1;
//                 if (self.settings.sidx == null || self.settings.sidx != colName) {
//                     self.settings.sidx = colName;
//                     self.settings.sord = "asc";
//                     self.apply();
//                     return "asc";
//                 } else {
//                     if (self.settings.sord == "asc") {
//                         self.settings.sord = "desc";
//                         self.apply();
//                         return "desc";
//                     } else {
//                         self.settings.sidx = null;
//                         self.settings.sord = "asc";
//                         self.apply();
//                         return "";
//                     }
//                 }
//             }
//             var getUri = function () {
//                 var uri = "";
//                 //It is possible now to set url property as string or function
//                 if (angular.isFunction(self.url)) {
//                     uri = self.url();
//                 } else {
//                     uri = self.url;
//                 }
//                 return uri;
//             }
//             var apply = function () {
//                 var uri = getUri();
//                 return makeRequest(uri, self.settings).success(function (data) {
//                     self.model = data;
//                 });
//             };
//             //PRIVATE MEMBERRS
//             var makeRequest = function (url, data) {
//                 var req = {
//                     method: 'POST',
//                     url: url,
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded'
//                     },
//                     data: $httpParamSerializer(data)
//                 };
//                 self.working = true;
//                 self.error = false;
//                 var q = $http(req);
//                 q.then(function () {
//                     self.working = false;
//                     self.ready = true;
//                 });
//                 q.error(
//                     function () {
//                         self.working = false;
//                         self.error = true;
//                     }
//                 );
//                 return q;
//             };
//             // PUBLIC API 
//             this.apply = apply; // ()
//             this.toggleSorting = toggleSorting; //(colName string) => "asc" |"desc" |""
//             this.getFirstElemetnVisibleNumber = getFirstElemetnVisibleNumber;//() => NUMBER
//             this.getLastElementVisibleNumber = getLastElementVisibleNumber;//() => NUMBER
//             this.removeRule = removeRule;//(string fieldName) 
//             //proposal
//             this.$query = apply; // ()
     
//             this.getUrl = getUri;
//         }// GridResource
//         return function (url) {
//             return new GridResource(url);
//         }
//     }]);
// })();