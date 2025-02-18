const arr = [1,2,3,4,5]

arr.forEach(function(a, b, c) { 
    //객체나 배열에서 요소를 참조한 후(forEach) -> 콜백함수 호출
    console.log(`${a}, ${b}, ${c}`)
})

const mapArr = arr.map(function(a, b, c) { 
    
    console.log(`${a}, ${b}, ${c}`)
    return a *2 // map 함수는 값 리턴 가능
})


let map = new Map()

map.set(7, "77")
map.set(9, "99")

map.forEach(function (a, b, c) {
    console.log(`${a}, ${b}, ${c}`)
})