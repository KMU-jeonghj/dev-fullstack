


let promise = new Promise(function(resolve, reject) {

    setTimeout(() => {
        resolve("done!")
    }, 3000);

});

promise.then(
    function(results){
        console.log(results);
    },
    function(error) {
        console.log(error);
    }
);