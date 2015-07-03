'use strict';

angular.module('angularMask', [])
  .directive('angularMask', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function ($scope, el, attrs, model) {
        var format = attrs.angularMask,
          arrFormat = format.split('|');

        if (arrFormat.length > 1) {
          arrFormat.sort(function (a, b) {
            return a.length - b.length;
          });
        }

        model.$formatters.push(function (value) {
          return value === null ? '' : mask(String(value).replace(/\D/g, ''));
        });

        model.$parsers.push(function (value) {
          model.$viewValue = mask(value);
          var modelValue = String(value).replace(/\D/g, '');
          el.val(model.$viewValue);
          return modelValue;
        });

        function mask(val) {
          if (val === null) {
            return '';
          }
          var value = String(val).replace(/\D/g, '');
          if (arrFormat.length > 1) {
            for (var a in arrFormat) {
              if (value.replace(/\D/g, '').length <= arrFormat[a].replace(/\D/g, '').length) {
                format = arrFormat[a];
                break;
              }
            }
          }
          var newValue = '';
          for (var nmI = 0, mI = 0; mI < format.length;) {
            if (format[mI].match(/\D/)) {
              newValue += format[mI];
            } else {
              if (value[nmI] != undefined) {
                newValue += value[nmI];
                nmI++;
              } else {
                break;
              }
            }
            mI++;
          }
          return newValue;
        }
      }
    };
  });
