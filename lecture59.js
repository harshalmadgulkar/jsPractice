//! Day 59 | Advance JavaScript 4
// ? Introduction to Asynchrony in JavaScript.

// Introduction to Asynchrony in JavaScript
// (2025–2026 perspective – modern JavaScript)
// JavaScript is single-threaded and synchronous by default.
// But almost everything interesting (network requests, timers, file reading, user input, animations…) takes time.
// Asynchrony is the way JavaScript handles operations that cannot finish immediately without blocking the main thread.

// The 5 most important ways to handle asynchrony (today)

// Quick comparison – how the same task looks

// // Goal: fetch user → then fetch posts → then show them
// // 1. Callback Hell (old & painful)
// getUser(1, (user) => {
//     getPosts(user.id, (posts) => {
//         showPosts(posts);
//     });
// });

// // 2. Promise chaining (still very common)
// getUser(1)
//     .then(user => getPosts(user.id))
//     .then(posts => showPosts(posts))
//     .catch(err => console.error(err));

// // 3. async/await – cleanest & most popular today
// async function loadData() {
//     try {
//         const user = await getUser(1);
//         const posts = await getPosts(user.id);
//         showPosts(posts);
//     } catch (err) {
//         console.error(err);
//     }
// }

// loadData();

// Want to write clean async code today?

// ✓ Use async/await
// ✓ Always wrap in try/catch
// ✓ Use Promise.all() when you can run things in parallel
// ✓ Understand .then() chaining (you'll still see it)
// ✓ Know the difference between microtasks vs macrotasks
// ✓ Avoid callback hell completely

// ? Introduction to callbacks and Problems in Callbacks

// // What is a Callback?
// // A callback is simply a function that you pass as an argument to another function, to be executed later when some operation is complete.
// // Callbacks are the original way JavaScript handled asynchronous operations.

// info Server-side code (simulates an async operation like network request)
// function fetchDetails(address, cb) {
//     console.log("Request sent to:", address);

//     // Simulate delay (like waiting for server response)
//     setTimeout(() => {
//         console.log("Response received from server");
//         cb({ name: 'Harsh', city: 'Pune', age: 24 });
//     }, 2000); // 2 seconds delay
// }

// // info Client-side code
// fetchDetails("https://api.example.com/user/123", function(details) {
//     console.log("Got user details:", details);
// });


// Problems with Callbacks (The Famous "Callback Hell")
// Let’s say we need to:

// Fetch user
// Then fetch their posts
// Then fetch comments on first post

// fetchUser(123, function(user) {
//     console.log("User:", user);

//     fetchPosts(user.id, function(posts) {
//         console.log("Posts:", posts);

//         fetchComments(posts[0].id, function(comments) {
//             console.log("Comments:", comments);

//             fetchLikes(comments[0].id, function(likes) {
//                 console.log("Likes:", likes);
//                 // ...and it keeps going deeper
//             });
//         });
//     });
// });

// This creates "Callback Hell" or "Pyramid of Doom":
// Problems:

// Code becomes deeply nested → hard to read
// Error handling is repeated and messy
// Logic is hard to follow
// Debugging becomes a nightmare

