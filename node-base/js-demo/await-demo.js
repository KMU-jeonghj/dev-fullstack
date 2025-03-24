
async function f() {

    let promise1 = new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve("1st query!")
        }, 3000);
    });

    let result = await promise1;
    console.log(result);

    let promise2 = new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve("2nd query!")
        }, 3000);
    });

    let result2 = await promise2;
    console.log(result2);

    let promise3 = new Promise(function(resolve, reject) {
        setTimeout(() => {
            resolve("3rd query!")
        }, 3000);
    });

    let result3 = await promise3;
    console.log(result3);
}