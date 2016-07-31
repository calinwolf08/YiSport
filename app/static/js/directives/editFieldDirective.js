/**
 * Created by Calin on 7/26/2016.
 */
function editField() {
    return {
        link : function(scope, elem, attr) {
            console.log(elem);
            elem.hover(
                function () {
                    //$(this).css('visibility', 'hidden');
                },
                function () {
                    //$(this).css('visibility', 'visible');
                }
            );
        }
    }
}