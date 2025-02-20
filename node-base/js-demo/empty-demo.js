const obj1 = {}
const obj2 = { message : "not empty"}
const num = 1
const str1 = "one"
const str2 = ""

console.log(Object.keys(obj1)) /// -? length === 0
console.log(Object.keys(obj2)) // -> length === 1

console.log(Object.keys(str1).length === 0)  // -> false
console.log(Object.keys(str2).length === 0)  // -> true


//객체 isEmpty 함수
function isEmpty(obj) {
    if (obj.constructor === Object) // -> 객체 여부 확인
    if (Object.keys(obj).length === 0) {
        return true
    } else {
        return false
    }
}
