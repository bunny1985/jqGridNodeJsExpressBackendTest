import {Bootstraper } from "angular1_typescript_decorators/Decorators";
import "./components/header/HeaderComponent";
import "./components/footer/FooterComponent";
import {grid} from  "./Services/GridService";

var common = angular.module("IngCommon" , ["ui.bootstrap"]);
Bootstraper.BootstrapModule(common);
common.factory("GridResourceFactory" , grid.GridResourceFactory);

