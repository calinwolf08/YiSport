/**
 * Created by Calin on 7/26/2016.
 */
function customLayout() {
    return {
        restrict: 'A',
        link : function(scope, elem, attr) {
            elem.children().each(function (i, e) {
                $(e).addClass('container-fluid');
                /*$(e).css({
                    'border' : 'solid',
                    'border-color' :'#fff',
                    'border-width' : '25px',
                    'border-bottom-width' : '0px'
                });*/

                if (i % 2) { //every other div starting with second
                    $(e).css('background-color', '#fff');
                } else {
                    $(e).css('background-color', '#e6e6e6');
                }
            });
        }
    }
}