/**
 * Created by Calin on 8/9/2016.
 */
function capitalize() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
}
