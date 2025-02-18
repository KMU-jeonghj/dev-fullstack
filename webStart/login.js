/*var, let, const*/
var a;
let b;
const c = 1;


/*id 안에 값 팝업에 띄우기*/
function popId() {
    let id = document.getElementById('txt_id').value;
    if (!id) {
        alert("please iput an ID.");
    }
    else {
        alert(id);
    }
}


//함수 만들고, 버튼 누르면 호출
function clickeAndCall() {
    alert('1');
    alert('2');
    alert('3');
}