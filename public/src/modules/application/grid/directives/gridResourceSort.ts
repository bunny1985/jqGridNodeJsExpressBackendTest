import {Bootstraper, Inject , Directive} from "angular1_typescript_decorators/Decorators";




@Directive("App" , "gridResourceSort")
@Inject("$compile")
class GridResourceSort implements ng.IDirective {
    restrict = 'A';            
    terminal:boolean=  true;
    priority:number=  1000;
    
    
    

    constructor(private $compile) {
    
    }

    link  (scope: any, element: ng.IAugmentedJQuery, attrs: any) {
                let grid = scope.$eval(attrs.gridResourceSort);
                
                element.removeAttr("grid-resource-sort") //also removing data element  
                element.removeAttr("data-grid-resource-sort") //also removing data element  
                element.addClass("clickable"); // this calss should show cursor on Hover
                element.attr("ng-class", attrs.jqSort + ".settings.sidx=='" + attrs.column + "' ? 'sorted': '' ");
                
                scope.$watch(() => {
                    return grid.settings.sidx
                }, function (newValue, oldvalue) {
                    var ico = element.find("i");
                    if (newValue == attrs.column) {
                        ico.show();
                    } else {
                        ico.hide();
                    }
                });

                element.append(angular.element('<i style="float:right;" class="glyphicon"></i>'));

                element.bind("click", function () {
                    
                    var sortClass = grid.toggleSorting(attrs.column);
                    angular.element(".sorted i ").hide();
                    angular.element(".sorted i ").removeClass("glyphicon-chevron-down");
                    angular.element(".sorted i ").removeClass("glyphicon-chevron-up");
                    element.removeClass("asc");
                    element.removeClass("desc");
                    var ico = element.find("i");
                    ico.removeClass("glyphicon-chevron-down");
                    ico.removeClass("glyphicon-chevron-up");
                    if (sortClass == "asc") {
                        ico.show();
                        ico.addClass("glyphicon-chevron-down");
                    } else if (sortClass == "desc") {
                        ico.show();
                        ico.addClass("glyphicon-chevron-up");
                    }
                    element.addClass(sortClass);
                });
                this.$compile(element)(scope);
            }


}