var counter = function(arr) {
    return "There are " + arr.length + " elements in array";
}

var adder = function(a,b) {
    return `there sum of the 2 numbers is ${a+b}`;
}
// console.log(counter(["ruby", "nodeJs", "react"]));

var pi = 3.14;
module.exports = {
    counter: counter,
    adder: adder,
    pi: pi
} 