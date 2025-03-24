

async function f() {
    return 1; //promise 객체로 감싸서 -> 반환
}

f().then(
    function(results) {
        console.log(results);
    },
    function(error) {
        console.log(error);
    }
)