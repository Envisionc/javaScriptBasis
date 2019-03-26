// console.log("hello world");

// console.log("3 seconds have passed");

// setTimeout(() => {
//     console.log("3 seconds have passed");
// }, 3000);

// let time = 0;
// var timer = setInterval(function() {
//     time += 2;
//     console.log(time + " seconds have passed");
//     if (time > 5) {
//         clearInterval(timer);
//     }
// }, 2000);

// -------------------------------------

// console.log(__dirname);
// console.log(__filename);

// -------------------------------------

// function sayFun(fn) {
//     fn();
// }

// sayFun(sayHi);
// function sayHi() {
//     console.log("Hi");
// }

// sayHi();


// var sayBye = function() {
//     console.log("Bye");
// }

// sayBye();

// -------------------------------
var stuff =  require("./count");
console.log(stuff.counter(["ruby", "node", "react"]));
console.log(stuff.adder(3,6));
console.log(stuff.pi);