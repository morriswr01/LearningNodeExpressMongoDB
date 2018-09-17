
const p = new Promise((resolve, reject) => {
    //Kick off async operation
    // ..
    // At the end there is either a value or an error
    setTimeout(() => {
        resolve(1);
        reject(new Error('error message'));
    }, 1000);
});

p
    .then((result) => console.log(result))
    .catch((err) => console.log('Error', err.message));
