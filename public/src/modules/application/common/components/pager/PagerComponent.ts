import {Component } from "angular1_typescript_decorators/Decorators";

@Component("IngCommon" , "jqPager" , {
    template: require("./index.tpl.html") , 
    bindings: {
        grid: '=model'
    }
})
export default class JqPager{
    
    private grid; 

    
} 