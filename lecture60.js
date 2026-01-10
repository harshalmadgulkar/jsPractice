//! Day 60 | JavaScript
// // # Day 60 — Exercises

// ---

// ## Exercise 1 — Very Easy (Warming up)

// **Task (Hindi):** Ek function banao `afterDelay`

// // **Requirements:**
// // - Ye function do cheezein lega:
// //   1. `time` (milliseconds)
// //   2. `callback` function
// // - Given `time` ke baad `callback` call kare
// // - Callback ke andar `"Callback executed"` print hona chahiye

// function afterDelay(time, cb) {
//     setTimeout(cb, time);
// }

// afterDelay(2000, () => {
//     console.log("Callback executed");
// });

// **Use case:**
// > “2 second baad ek kaam karna hai”

// **Goal:**
// - Samajhna ki callback delay ke baad kaise execute hota hai
// - Ye `setTimeout` + callback connection hai

// ---

// ## Exercise 2 — Intermediate (Data flow)

// **Task (Hindi):** Ek function banao `getUser`

// // **Requirements:**
// // - `getUser` `username` lega
// // - 1 second ke baad `callback` ko ek object de:
// //   - `id`
// //   - `username`

// function getUser(username, cb) {
//     setTimeout(() => {
//         cb({ id: 314, username });
//     }, 1000);
// }

// **Then:**
// - Callback ke andar ek aur function call karo `getUserPosts`

// // **`getUserPosts` requirements:**
// // - `userId` lega
// // - 1 second ke baad `callback` ko `posts` ka array de

// function getUserPosts(userId, cb) {
//     setTimeout(() => {
//         cb(["first post", "second post", "third post"]);
//     }, 1000);
// }

// // **Final output:**
// // - User ka `username` print ho
// // - Fir uske `posts` print ho

// getUser('harshalmadgulkar', function(userDetails) {
//     console.log("username:", userDetails.username);

//     getUserPosts(userDetails.id, function(posts) {
//         console.log("posts:", posts);
//     });
// });

// **Goal:**
// - Samajhna ki ek async ka result next async ko kaise milta hai
// - Callback chaining practice

// ---

// ## Exercise 3 — Intermediate (Callback dependency — thoda painful)

// **Task (Hindi):** Teen functions banao:

// 1. `loginUser`
// //    - 1 second baad callback ko `user` object de
// function loginUser(username, cb) {
//     console.log('logging in user');
//     setTimeout(() => {
//         cb({ id: 122, username: "harsh" });
//     }, 1000);
// }
// // 2. `fetchPermissions`
// //    - `userId` lega
// //    - 1 second baad callback ko `permissions` array de
// function fetchPermission(id, cb) {
//     console.log('fetching permissions');
//     setTimeout(() => {
//         cb(['read', 'write', 'delete']);
//     }, 1000);
// }
// // 3. `loadDashboard`
// //    - `permissions` lega
// //    - 1 second baad callback ko `"Dashboard loaded"` bole
// function loadDashboard(permissions, cb) {
//     console.log('loading dashboard');
//     setTimeout(() => {
//         cb();
//     }, 1000);
// }

// // **Flow:**
// // - Pehle `loginUser`
// // - Uske andar `fetchPermissions`
// // - Uske andar `loadDashboard`
// // - Final output console mein print ho
// loginUser("harsh", function(userData) {
//     fetchPermission(userData.id, function(permissions) {
//         loadDashboard(permissions, function() {
//             console.log("dashboard loaded ✅");
//         });
//     });
// });

// **Goal:**
// - Callback nesting ko feel karna
// - Yehi structure baad mein callback hell banta hai

// ---

// ### Notes
// - Practice in plain JavaScript using `setTimeout` and callbacks to understand the flow before converting to Promises/async–await.