# Simple input mask directive for [AngularJS](http://angularjs.org/)

***

Way simple Angular directive to apply mask to input fields also with dynamic/multiple masks to the same field, which means that you can have different masks for different lengths of numbers

Mask format uses 0 
Example: 0000-0000-0000-0000

Directive will look for attribute angular-mask on input
## Example: 
```HTML
<input name="test" maxlengh="19" angular-mask="0000-0000-0000-0000" />
```

### Multiple masks
```HTML
<input name="test" maxlengh="19" angular-mask="(00)00000-0000|(00)0000-0000" />
```
Use | to separate masks


#### Install via bower

    bower install angular-input-mask --save