var jwt = require('jsonwebtoken'); //jwt 모듈 불러오기
var dotenv = require('dotenv');

dotenv.config();

var token = jwt.sign({foo : 'bar'}, process.env.PRIVATE_KEY);
//token 생성 -> jwt 서명 (페이로드 생성, 개인키 with SHA256)

console.log(token);


//검증
//-> 검증 성공 -> 페이로드 디코딩
var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);