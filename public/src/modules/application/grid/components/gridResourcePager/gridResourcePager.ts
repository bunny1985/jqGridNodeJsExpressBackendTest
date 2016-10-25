import {Component } from "angular1_typescript_decorators/Decorators";

@Component("BBGrid" , "gridResourcePager" , {
    template: require("./index.tpl.html") , 
    bindings: {
        grid: '=model'
    }
})
export default class GridResourcePager{
    
    private grid; 

    
} 