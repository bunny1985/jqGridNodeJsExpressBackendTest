import {Service , Inject,  } from "angular1_typescript_decorators/Decorators";
import GridResourceModel from "../models/gridResourceModel"
import { GridResourceSettings , GridResourceSettingsFilter ,GridResourceSettingsFilterRule}   from "../models/gridResourceSettings"

@Inject('$http', '$httpParamSerializer')
@Service("BBGrid" ,"gridResource")
    export class GridResource {

            constructor( private $http : ng.IHttpService, private $httpParamSerializer: ng.IHttpParamSerializer) {
                this.working = false;
                this.error = false;
                this.settings = new GridResourceSettings();
                this.model = new GridResourceModel();
                
            }
            public url : any
            public working: boolean;
            public error: boolean;

            public apply(): ng.IPromise<{}>{
                 var uri = this.getUri();
                 let promise =  this.makeRequest(uri, this.settings);
                 
                  promise.then( 
                   (response: ng.IHttpPromiseCallbackArg<Object>)  => {
                      this.model = ( response.data as GridResourceModel);
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
            addRule(rule : GridResourceSettingsFilterRule  , apply: boolean = true){
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
        
            settings: GridResourceSettings;
            model: GridResourceModel;


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