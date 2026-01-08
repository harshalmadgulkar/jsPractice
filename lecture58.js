//! Day 58 | Advance JavaScript 3
// ? Class Expression
// info when declared using variable we can't use it before declaration (avoid hoisting)
// This would throw an error (ReferenceError: Cannot access 'Animal' before initialization)
// let Animal1 = new Animal();
// console.log(Animal1);
// let Animal = class {
//     constructor() {
//         this.name = 'dodo';
//         this.breed = 'dog';
//     }
// };

// let Animal2 = new Animal();
// console.log(Animal2);

// ? inheritence

// class Animal {
//     constructor() {
//         this.hands = 2;
//         this.legs = 2;
//     }

//     eat() {
//         console.log("Animal eating");
//     }
//     breathe() {}
// }

// class kekda extends Animal {
//     constructor() {
//         super();
//         this.legs = 8;
//         this.hands = 0;
//     }

//     swim() {}
// }

// let k1 = new kekda();
// k1.eat();
// console.log(k1);

// ? getter & setter
// class Animal {
//     constructor() {
//         this._age = 12;          // convention: _age means "private" (but not really private)
//     }

//     // Setter
//     set age(val) {
//         if (val < 0) {
//             console.log("Age cannot be negative!");
//             return;               // ← good validation
//         }
//         this._age = val;
//         // return this._age;      // ← usually NOT needed in setters
//     }

//     // Getter
//     get age() {
//         return this._age;
//     }
// }

// let a1 = new Animal();

// a1.age = 3;                    // calls setter → this._age becomes 3
// console.log(a1);               // Animal { _age: 3 }
// console.log(a1.age);           // 3          ← calls getter

// a1._age = 32;                  // ← bypasses setter! (this is the problem)
// console.log(a1);               // Animal { _age: 32 }
// console.log(a1.age);           // 32         ← getter returns the changed value

// ? Important Points & Best Practices (2025)
// info Getters & Setters don't make properties truly private The _age convention is just a signal to other developers: "Please don't touch this directly" But JavaScript still allows a1._age = 999 → setter is bypassed Modern recommendation: Use # private fields (true privacy – since ES2022)

// class Animal {
//     #age = 12;          // true private field

//     constructor() {
//         this.#age = 12;  // also fine here
//     }

//     // Public getter
//     get age() {
//         return this.#age;
//     }

//     // Public setter with validation
//     set age(val) {
//         if (val < 0) {
//             console.log("Age cannot be negative!");
//             return;
//         }
//         this.#age = val;
//     }
// }

// const a = new Animal();
// a.age = 25;          // ✓ calls setter
// console.log(a.age);  // 25

// // a.#age = 999;     // ✗ SyntaxError at runtime + TS error

// ? Most Common Cases – Visual Explanation

// class Person {
//     // 1. Class field (modern syntax) → created per instance
//     species = "human";                    // ← automatically this.species = "human"

//     // 2. Static field → belongs to class, not instances
//     static count = 0;

//     constructor(name) {
//         // 3. Properties created in constructor → per instance
//         this.name = name;
//         this.age = 25;

//         Person.count++;                   // updating static
//     }

//     // 4. Method → lives on prototype (shared)
//     sayHello() {
//         console.log(`Hi, I'm ${this.name}`);
//     }
// }

// // ────────────────────────────────────────────────

// const p1 = new Person("Ankit");
// const p2 = new Person("Sara");

// console.log(p1.species);      // "human"     ← created fresh for p1
// console.log(p2.species);      // "human"     ← created fresh for p2

// console.log(p1.name);         // "Ankit"     ← from constructor
// console.log(p2.name);         // "Sara"      ← from constructor

// console.log(Person.count);    // 2           ← shared static counter

// console.log(p1.sayHello === p2.sayHello);   // true  ← same function (shared on prototype)

// ? Key Points to Remember

// info Everything you write with this. inside the constructor → is created fresh for each new instance
// info Class fields (the modern field = value; syntax without this.) → are basically syntactic sugar for doing this.field = value at the beginning of the constructor → also created fresh per instance

// These two classes are almost identical today
// class Old {
//     constructor() {
//         this.x = 10;
//     }
// }

// class Modern {
//     x = 10;           // ← same effect as above
// }

// ? Bottom Line – Very Simple Rule
// When you do new MyClass():

// Everything that ends up on this.xxx
// → either written in constructor
// → or written as class field (xxx = value)
// → gets created fresh for that particular instance
// Methods and static things → shared (not copied)

// So yes — both constructor properties and modern class fields are created new every time you create an instance.


// ! Problem solving Question Set PART 1

// ! SECTION 1: Objects and OOPS Thinking (Foundation)
// ?	1.	Create a user object that stores name and email and has a login method which prints “User logged in”.
// let user1 = {
//     name: 'Harshal',
//     email: 'harshal.madgulkar725@gmail.com',
//     login: function() {
//         console.log("User logged in");
//     }
// };


// ?	2.	Imagine you now have 5 users.
// ? First, think how you would manage them without using a class.
// let user2 = {
//     name: 'Harshal',
//     email: 'harshal.madgulkar725@gmail.com',
//     login: function() {
//         console.log("User logged in");
//     }
// };
// let user3 = {
//     name: 'Harshal',
//     email: 'harshal.madgulkar725@gmail.com',
//     login: function() {
//         console.log("User logged in");
//     }
// };
// let user4 = {
//     name: 'Harshal',
//     email: 'harshal.madgulkar725@gmail.com',
//     login: function() {
//         console.log("User logged in");
//     }
// };
// let user5 = {
//     name: 'Harshal',
//     email: 'harshal.madgulkar725@gmail.com',
//     login: function() {
//         console.log("User logged in");
//     }
// };

// ? Then convert the same logic using a class and observe how the code becomes cleaner. Write code for both approaches.

// class User {
//     constructor(name, email) {
//         this.name = name;
//         this.email = email;
//     }

//     login() {
//         console.log(`${this.name} is logged in`);
//     };
// }
// let u1 = new User("Yash", "harshal@gmail.com");
// let u2 = new User("Ayush", "harshal@gmail.com");
// console.log(u1);
// console.log(u2);
// u1.login();
// u2.login();

// ?	3.	Create a product object that stores name and price and has a method which returns the final price after discount.

// let product = {
//     name: "Bike",
//     price: 1000,
//     finalPrice: function(discountPercentage) {
//         let discountInAmount = this.price * discountPercentage / 100;
//         return this.price - discountInAmount;
//     }
// };

// console.log(product.finalPrice(10));

// info The goal of this section is to understand why keeping data and behavior together makes code easier to manage.

// ⸻

// SECTION 2: Classes and Objects
// ? 4. Create a Car class with the following:
// ? brand
// ? speed
// ? a drive method that prints the car brand and speed

// class Car {
//     constructor(name = 'BMW', speed = 0) {
//         this.name = name;
//         this.speed = speed;
//     }
//     drive() {
//         console.log(`${this.name} is driving with speed of ${this.speed} km/h`);
//     };
// }

// ? 5.	Create two different car objects from the same class and verify that their data is different.
// let car1 = new Car();
// console.log(car1);
// car1.drive();

// let car2 = new Car("Honda", 80);
// console.log(car2);
// car2.drive();

// ? 6.	Answer this in your own words:
// ? If classes did not exist, how would you write this logic and what problems might occur when the project becomes large?

// SECTION 3: Constructor and this keyword
// ? 7.	Create a Student class whose constructor accepts name and roll number.
// ? Add a method introduce that prints both values.
// ? 8.	Inside the constructor, set values using this.
// ? Then try removing this and notice what error occurs and why.

// class Student {
//     constructor(name, rollNo) {
//         this.name = name;
//         // name = name;
//         this.rollNo = rollNo;
//     }
//     introduce() {
//         console.log(`${this.name} - ${this.rollNo}`);
//     }
// }

// let st1 = new Student("Raj", 23);
// console.log(st1);
// st1.introduce();

// ? 9.	Create an object with two methods:
// ? One method using a normal function
// ? One method using an arrow function
// ? Inside both, print this and observe the difference.

// let obj = {
//     normalFunction: function() {
//         console.log(this);  //object
//     },
//     arrowFunction: () => {
//         console.log(this);  //global
//     }
// };

// obj.normalFunction();
// obj.arrowFunction();

// info The goal is to clearly understand how this works and when it changes.

// ⸻

// SECTION 4: Constructor Functions and Prototypes
// ? 10. Create a User constructor function (do not use class syntax).
// ? 11. Add a login method in two ways:
// ? First, inside the constructor
// ? Then, move the method to the prototype

// function User(name, email) {
//     this.name = name;
//     this.email = email;
//     // constructor method
//     // this.login = function() {
//     //     console.log('user logged in');
//     // };
// }
// // prototype method
// User.prototype.login = function() {
//     console.log('user logged in');
// };

// ? 12. Create two User objects and compare their login methods using equality.

// let u1 = new User('harsh', 'h@gmail.com');
// console.log(u1);
// u1.login();

// let u2 = new User('aysuh', 'a@gmail.com');
// console.log(u2);
// u2.login();

// console.log(u1 == u2);
// console.log(u1.login() == u2.login());
// console.log(u1.login == u2.login);

// ? Explain why the result is true or false.
// constructor method will return false on the other side prototype method will return true

// info The purpose here is to understand how prototypes help share behavior efficiently.

// ⸻

// SECTION 5: apply, bind,call
// ? 13.	Create a function that prints this.name.
// ? 14.	Create an object that contains a name property.

// function print() {
//     console.log(this.name);
// }

// let obj = { name: 'harsh' };

// print();
// print(obj);

// // ? Use call to run the function using the object
// // call
// print.call(obj);
// // ? Use apply to run the function using the object
// // apply
// print.apply(obj);
// // ? Use bind to create a new function and then call it
// // bind
// let printObj = print.bind(obj);
// printObj();

// ? 15. Borrow a method from one object and run it for another object using call.

// let obj1 = {
//     name: 'ak',
//     print: function() {
//         console.log("print function called");
//         console.log(this.name);
//     }
// };

// let obj2 = {
//     age: 22
// };

// obj1.print();
// obj1.print.call(obj2);


// // 1. Most common pattern – borrowing with meaningful output
// let user = {
//     fullName: "Harshal Patil",
//     getDetails: function(city, country) {
//         console.log(`${this.fullName} lives in ${city}, ${country}`);
//     }
// };

// let person = {
//     fullName: "Priya Sharma"
// };

// // Borrow getDetails and run it for person
// user.getDetails.call(person, "Mumbai", "India");
// // Output: Priya Sharma lives in Mumbai, India

// // 2. Using apply (same but with array of arguments)
// user.getDetails.apply(person, ["Pune", "India"]);
// // Same output

// // 3. Using bind (create reusable borrowed function)
// const borrowed = user.getDetails.bind(person, "Bangalore");
// borrowed("India");  // Priya Sharma lives in Bangalore, India

// info The goal is to understand how this can be manually controlled.


// ! Problem solving Question Set PART 2

// SECTION 1: OOPS Thinking with Objects
// 	1.	Create an object called laptop that contains brand, price, and a start method that prints “Laptop started”.
// 	2.	Add one more method to the same object that increases the price by 10 percent.
// 	3.	Now imagine you need 10 laptops with same structure but different data.
// Write down (in words or code) what problems you will face if you keep using plain objects.

// ⸻

// SECTION 2: Classes and Objects (Reinforcement)
// 	4.	Create a class named Employee that stores:
// name
// salary

// Add a method showDetails that prints name and salary.
// 	5.	Create three employee objects from the same class and verify that modifying one employee does not affect the others.
// 	6.	Explain in your own words:
// Why is class considered a better option than writing similar objects again and again?

// ⸻

// SECTION 3: Constructor and Initialization
// 	7.	Create a class named BankAccount.
// Its constructor should accept accountHolderName and balance.
// 	8.	Inside the constructor, store both values using this.
// 	9.	Add a method deposit(amount) that increases the balance.
// 	10.	Create two bank accounts and deposit money into only one.
// Observe and explain why the second account is not affected.

// ⸻

// SECTION 4: Understanding this (Very Important)
// 	11.	Create an object named profile with a property username and a method printName that logs this.username.
// 	12.	Call the method normally and observe the output.
// 	13.	Store the method in a separate variable and call it.
// Observe what happens to this and explain why.
// 	14.	Modify the code so that this works correctly again.

// ⸻

// SECTION 5: Constructor Function and Prototype
// 	15.	Create a constructor function called Vehicle that accepts type and wheels.
// 	16.	Add a method describe inside the constructor and observe memory behavior when multiple objects are created.
// 	17.	Move the same method to Vehicle.prototype and repeat the test.
// 	18.	Explain why the prototype approach is preferred.

// ⸻

// SECTION 6: call Method Practice
// 	19.	Create a function showBrand that prints this.brand.
// 	20.	Create two different objects with brand values.
// 	21.	Use call to execute showBrand for both objects.
// 	22.	Explain what problem call is solving here.

// ⸻

// SECTION 7: apply Method Practice
// 	23.	Create a function introduce that accepts two arguments: city and role, and prints name, city, and role using this.name.
// 	24.	Create an object with a name property.
// 	25.	Use apply to call introduce using the object and an array of arguments.
// 	26.	Explain in simple words how apply differs from call.

// ⸻

// SECTION 8: bind Method Practice
// 	27.	Create a function greet that prints “Hello” followed by this.name.
// 	28.	Bind this function to an object and store the returned function in a variable.
// 	29.	Call the bound function later and observe the output.
// 	30.	Explain why bind is useful when functions are executed later or inside callbacks.