import {Inject,Component } from "angular1_typescript_decorators/Decorators";
import {GridResource }from "../../modules/application/grid/services/gridResource";

@Component("App" , "grid",{
    template: require("./index.tpl.html")
})
@Inject("gridResource")
export default class AppComponent{
    constructor(public gridResource : GridResource ) {
         this.gridResource.url = "/api/grid";
         this.gridResource.apply();
    }
}   