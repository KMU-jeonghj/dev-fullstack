
// 함수 선언문
function foo(arg) {
    return arg;
}

function bar() {
    console.log('bar');
}

// 함수 표현식
const a = function () {
    console.log('a')
} 

//Function 생성자 함수
const b = new Function("console.log('a')")

//화살표 함수 표현식
const arrow = () => {
    console.log("->");
}
foo(bar);