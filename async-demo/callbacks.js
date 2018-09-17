// console.log('Before');
//Asynchronous - This nested structure is bad! Hard to read
const user = getUser(1, (user) => {
    console.log(user);
    getRepositories(user.gitHubUsername, (repos) => {
        console.log(repos);
        //Callback hell
    });
});
// console.log('After');

//Solution is named functions
console.log('Before');
getUser(1, getRepo);
console.log('After');

function getRepo(user) {
    getRepositories(user.gitHubUsername, displayRepos);
}

function displayRepos(repos) {
    console.log(repos);
}

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading a user from a database....');
        callback({ id: id, gitHubUsername: 'mosh'});
    }, 1000);
}

function getRepositories(username, callback) {
    setTimeout(() => {
        console.log('Getting repos....');
        callback('hi');
    }, 1000);
}

//Synchronous
// console.log('Before');
// const user = getUser(1);
// const repos = getRepositories(user.gitHubUsername);
// const commits = getCommits(repos[0]);
// console.log('After');