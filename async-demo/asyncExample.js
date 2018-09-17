// console.log('Before');//This is blocking, after has to wait for before
// console.log('After');

// console.log('Before');//This is non blocking as database call does not stop after from running and the call runs in the backgroud
// setTimeout(() => {
//     console.log('Reading a user from a database....');
// }, 2000);
// console.log('After');

console.log('Before');
const user = getUser(1);
console.log(user);
console.log('After');

//this will not work because user is printed straight away however user is not assigned until after the 2 second delay meaning undefined is printed. There are 3 solutions to this:
//Callbacks
//Promises
//Async/await

function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from a database....');
        return { id: id, gitHubUsername: 'mosh'}
    }, 2000);
}