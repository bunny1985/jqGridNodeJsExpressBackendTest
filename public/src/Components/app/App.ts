import {Inject,Component } from "angular1_typescript_decorators/Decorators";
import {grid }from "../../modules/application/common/Services/GridService";

@Component("App" , "ingApp",{
    template: require("./App.tpl.html")
})
//@Inject("GridResource")
export default class AppComponent{
    /**
     *
     */
    // constructor(public gridResource : grid.GridResource ) {
    //     this.gridResource.url = "/api/grid";
    //     this.gridResource.apply();
    // }
    public res= {
        catImg : require("file!./cat.jpg")
    };
}   