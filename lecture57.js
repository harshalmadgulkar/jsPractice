//! Day 57 | Advance JavaScript 2

//? Class and constructor
// class Bottle {
//     constructor() {
//         this.color = "blue"
//         this.material = "plastic"
//         this.price = 132
//         // wrong practice if every instance has same function it should be added in Prototype
//         this.fill = function () {
//             console.log(`${this.color} bottle is filled.`);
//         }
//     }
// }
// console.log(Bottle);

// let B1 = new Bottle();
// console.log(B1);
// console.log(B1.color);
// B1.fill()


// let B2 = {
//     color: "blue",
//     material: "plastic",
//     price: 132
// }
// console.log(B2);


// ? Prototype

// // Class definition (Classes are just syntactic sugar over constructor functions)
// class Sketch {
//     constructor() {
//         // Instance properties
//         // These are created separately for every new object
//         this.character = 'doremon';
//         this.color = 'blue';
//     }

//     // Prototype method
//     // This method is stored on Sketch.prototype
//     // Shared by all instances of Sketch
//     animate() {
//         console.log('sketch animated');
//     }

//     // Instance method (class field syntax)
//     // This function is created again for each instance
//     // It does NOT go on the prototype
//     speak = function () {
//         console.log('sketch speaked');
//     }
// }

// // Logs the class (which is actually a constructor function)
// console.log(Sketch);

// // Adding a method manually to the prototype
// // This method will be shared by all instances
// Sketch.prototype.walk = function () {
//     console.log('sketch walking');
// };

// // Creating a new instance of Sketch
// const s1 = new Sketch();

// // Logs the instance object
// // It contains only instance properties:
// // character, color, and speak
// console.log("s1", s1);

// // These methods are accessible via the prototype chain
// s1.animate(); // from Sketch.prototype
// s1.walk();    // from Sketch.prototype

// // This method exists directly on the instance
// s1.speak();   // own property of s1


// ? "this" value inside
// 1. global --> window
// console.log(this);

// 2. function --> window
// function abcd() {
//     console.log(this)    //window;
// }
// abcd();

// 3. ES 5 function inside object --> object
// let obj1 = {
//     name: '3. ES 5 function inside object --> object',
//     func: function () {
//         console.log(this);  //object
//         console.log(this.name);
//     }
// };
// obj1.func();

// 4. ES 6 function inside object --> window
// let obj2 = {
//     name: '4. ES 6 function inside object --> window',
//     func: () => {
//         console.log(this);  //window
//         console.log(this.name);  //""
//     }
// };
// obj2.func();

// 5. ES 5 function inside ES 5 function inside object --> window
// let obj3 = {
//     name: '5. ES 5 function inside ES 5 function inside object --> window',
//     func: function () {
//         console.log(this);  //object

//         function inner() {
//             console.log(this);  //window
//         }
//         inner();
//     }
// };
// obj3.func();

// 6. ES 6 function inside ES 5 function  inside object --> object
// let obj4 = {
//     name: '6. ES 6 function inside ES 5 function  inside object --> object',
//     func: function () {
//         console.log(this);  //object
//         console.log(this.name); //object

//         inner = () => {
//             console.log(this);  //object
//         };
//         inner();
//     }
// };
// obj4.func();

//* dom examples
// let h1 = document.querySelector("h1");
// h1.addEventListener("click", function () {
//     console.log(this);  //object
// });
// h1.addEventListener("click", () => {
//     console.log(this);  //window
// });

// ? call, apply, bind

// let obj = {
//     name: "harsh",
// };

// function abcd(a, b, c) {
//     console.log(this, a, b, c);
// }
// 1. Normal function call (most common mistake)
// abcd(obj, 1, 2, 3);
// Output: window, obj, 1, 2
// Explanation:
// - this → window (or global object / undefined in strict mode)
// - a → obj    (first argument)
// - b → 1
// - c → 2
// → obj is treated as a normal parameter, NOT as `this`

// 2. Using .call() → sets this + individual arguments
// abcd.call(obj, 1, 2, 3);
// Output: {name: "harsh"}, 1, 2, 3
// Explanation:
// - this    → obj
// - a → 1
// - b → 2
// - c → 3

// 3. Using .apply() → sets this + arguments as array
// abcd.apply(obj, [1, 2, 3]);
// Output: {name: "harsh"}, 1, 2, 3
// Same result as .call(), but arguments passed as array

// 4. Using .bind() → creates a new function with fixed this (and optionally fixed arguments)
// let newFnc = abcd.bind(obj, 1, 2, 3);
// newFnc is now a new function where:
// - this is permanently set to obj
// - first 3 arguments are permanently set to 1, 2, 3

// newFnc();
// Output: {name: "harsh"}, 1, 2, 3

// You can still pass more arguments if the function expects them
// newFnc(99, 100);
// extra arguments are ignored in this case
// still prints: {name: "harsh"}, 1, 2, 3