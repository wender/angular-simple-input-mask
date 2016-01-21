'use strict';

angular.module('angularMask', [])
  .directive('angularMask', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        isModelValueEqualViewValues: '='
      },
      link: function ($scope, el, attrs, model) {
        $scope.$watch(function(){return attrs.angularMask;}, function(value) {
          if (model.$viewValue != null){
            model.$viewValue = mask(String(model.$viewValue).replace(/\D/g, ''));
            el.val(model.$viewValue);
          }
        });

        model.$formatters.push(function (value) {
          return value === null ? '' : mask(String(value).replace(/\D/g, ''));
        });

        model.$parsers.push(function (value) {
          model.$viewValue = mask(value);
          var modelValue = $scope.isModelValueEqualViewValues ? model.$viewValue : String(value).replace(/\D/g, '');
          el.val(model.$viewValue);
          return modelValue;
        });

        function mask(val) {
          var format = attrs.angularMask,
          arrFormat = format.split('|');

          if (arrFormat.length > 1) {
            arrFormat.sort(function (a, b) {
              return a.length - b.length;
            });
          }

          if (val === null || val == '') {
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
            if (!value[nmI]) {
              break;
            }
            if (format[mI].match(/\D/)) {
              newValue += format[mI];
            } else {
              newValue += value[nmI];
              nmI++;
            }
            mI++;
          }
          return newValue;
        }
      }
    };
  });
