import {Inject,Component } from "angular1_typescript_decorators/Decorators";
import "./Error.scss"

@Component("App" , "ingError" , {
    template: require("./Error.tpl.html"),
    bindings: {
        msg: "@"
    }
})
@Inject("$http")
export default  class ErrorComponent{
    
    constructor(http ) {
        http.get("aa");
    }
    msg:any;
}