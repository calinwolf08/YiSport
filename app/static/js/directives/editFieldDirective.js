/**
 * Created by Calin on 7/26/2016.
 * <div edit-field="text" title="welcome" model="welcomText"></div>
 */
function editField() {

    return {
        scope : {
            model : '=',    //object that will be edited
            title : '@',    //title of object in database
            tag : '@',      //type of object - img or text
        },
        transclude: true,
        templateUrl: "editField.html",
        compile : function (scope, element, attributes) {
            return {
                pre : function(scope, elem, attr) {
                    $(elem).addClass('editable');
                },
                post : function(scope, elem, attr) {

                    elem.bind('mouseenter', function(e) {
                        //show glyphicon
                        $(elem).find('.icon').css('visibility', 'visible');
                    });

                    elem.bind('mouseleave', function(e) {
                        //hide glyphicon
                        $(elem).find('.icon').css('visibility', 'hidden');
                    });
                }
            }

        }
    }
}