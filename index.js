// 1. Print hello with elements from array
// var arr = [1, 2, 3, 4, 5];

// arr.forEach(function (val) {
// 	console.log(`Hello ${val}`);
// });

// 2. Print all elements from array except numbers greater than 2
// var arr = [1, 2, 3, 4, 5];

// arr.forEach(function (val) {
//     if (val < 2) {
//         console.log(val);
// 	}
// });

// 3. Sum of all numbers in array
// let arr = [1, 2, 3, 4, 57];
// Approach 1
// let sum = 0;
// arr.forEach((val) => {
// 	sum = sum + val;
// });
// console.log(sum);

// Approach 2
// function sum(array) {
// 	let sum = 0;

// 	for (let i = 0; i < arr.length; i++) {
// 		sum = sum + arr[i];
// 	}
// 	console.log(sum);
// }
// sum(arr);

// 4. addition of array elements other than string
// let arr = [1, 2, 3, "4", 57];
// Approach 2 forEach
// let sum = 0;
// arr.forEach((val) => {
// 	if (typeof val !== "string") {
// 		sum = sum + val;
// 	}
// });
// console.log(sum);

// Approach 1 Brutforce
// function filterwithoutstring(array) {
// 	let sum = 0;
// 	for (i = 0; i < array.length; i++) {
// 		if (typeof array[i] !== "string") {
// 			sum = sum + array[i];
// 		}
// 	}
// 	console.log(sum);
// }

// filterwithoutstring(arr);

// 5. Guess output to understand synchronous vs asynchronous

// var arr = [];

// for (var i = 0; i < 10; i++) {
// 	arr.push(function () {
// 		setTimeout(function () {
// 			console.log(i);
// 		}, 1000);
// 	});
// }

// for (var i = 0; i < 10; i++) {
// 	arr[i]();
// }

// Output: 10 times 10 print hoga

// You're using var i, which is function-scoped, not block-scoped.
// So there's only one shared i variable for all iterations.
// You're creating 10 functions that reference this shared i.
// The setTimeout callback will execute after the loop has completed.
// At the time the setTimeout runs, the loop has already finished, and i === 10.
// So all 10 functions you push into arr will eventually call console.log(i) where i is 10.

// How can we solve this ----> using let

// 6. Guess output Async
// console.log("1");
// console.log("2");
// console.log("3");
// setTimeout(function () {
// 	console.log("4");
// }, 5000);
// console.log("5");


// Answer: 1 2 3 5 (5sec delay) 4
// first complete all sync functions then async