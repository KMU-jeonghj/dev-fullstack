//논 블로킹 실습

function first() {
    console.log("first");
}

function second() {
    console.log("second");
}

function third() {
    console.log("third");
}

first();
setTimeout(second, 2000);
third();