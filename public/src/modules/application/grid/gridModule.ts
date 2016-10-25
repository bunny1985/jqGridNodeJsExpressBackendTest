import {Bootstraper } from "angular1_typescript_decorators/Decorators";


import "./services/gridResource"
import "./directives/gridResourceSort"
import "./components/gridResourcePager/gridResourcePager"
var common = angular.module("BBGrid" , ["ui.bootstrap"]);
Bootstraper.BootstrapModule(common);

