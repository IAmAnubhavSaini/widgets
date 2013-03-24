/*distance()
it can take points as:
 [ {x:0, y: 0} , {x: 5, y: 5} ] OR
 [ [0,0], [5,5] ]
then it will be able to calculate distance.

example:
*** set points ***
var points = [ [0,0], [5,5] ];
*** update prototype ***
points.constructor.prototype.distance = distance;
*** call function on object ***
points.distance();
*/

var distance = function(){
var pt1 = points[0];

var pt2 = points[1];

var ax = (pt1[0]===undefined) ? pt1.x : pt1[0];

var bx = (pt2[0] === undefined) ? pt2.x : pt2[0];

var ay = (pt1[1] === undefined) ? pt1.y : pt1[1];

var by = (pt2[1] === undefined) ? pt2.y : pt2[1];

var dx = ax-bx

var dy = ay-by;

return Math.sqrt(dx*dx + dy*dy)
}
