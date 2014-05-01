'use strict';

angular.module('angularMask', [])
  .directive('angularMask', function() {
  return {
    restrict : 'A',
    link: function($scope, el, attrs) {
      var format = attrs.angularMask;

      function mask(el, format) {
        var text = el;
        var value = text.value;
        var newValue = "";
        for (var vId = 0, mId = 0 ; mId < format.length ; ) {
          if (mId >= value.length){
            break;
          }
          if (format[mId] == '0' && value[vId].match(/[0-9]/) === null) {
            break;
          }
          while (format[mId].match(/[0\*]/) === null) {
            if (value[vId] == format[mId]){
              break;
            }
            newValue += format[mId++];
          }
          newValue += value[vId++];
          mId++;
        }
        text.value = newValue;
      }

      el.bind('keyup keydown', function(e) {
        var _format = format;
        var _el = el[0];
        mask(_el,_format);
      });
    }
  };
});