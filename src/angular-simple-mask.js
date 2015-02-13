'use strict';

angular.module('angularMask', [])
    .directive('angularMask', function() {
      return {
        restrict : 'A',
        link: function($scope, el, attrs) {
          var format = attrs.angularMask,
              arrFormat = format.split('|');

          if(arrFormat.length > 1){
            arrFormat.sort(function(a, b){
              return a.length - b.length;
            });
          }
          function mask(o) {
            var value = o.value.replace(/\D/g,'');
            if(arrFormat.length > 1){
              for(var a in arrFormat){
                if(value.replace(/\D/g,'').length <= arrFormat[a].replace(/\D/g,'').length){
                  format = arrFormat[a];
                  break;
                }
              }
            }
            var newValue = '';
            for(var nmI = 0, mI = 0; mI < format.length;){
              if(format[mI].match(/\D/)){
                newValue+=format[mI];
              }else{
                if(value[nmI] != undefined){
                  newValue+=value[nmI];
                  nmI++;
                }else{
                  break;
                }
              }
              mI++;
            }
            o.value = newValue;
          }
          el.bind('keyup keydown', function(e) {
            var keyList = [8,37,39,46];
            if(keyList.indexOf(e.keyCode) == -1)mask(this);
          });
        }
      };
    });