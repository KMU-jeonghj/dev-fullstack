const express = require('express');
const { order, getOrders, getOrderDetail } = require('../controller/OrderController');
const router = express.Router();

router.use(express.json());


//주문하기
router.post('/', order);

//주문목록 조회
router.get('/', getOrders);

//주문 상세상품 조회
router.get('/:id', getOrderDetail);




module.exports = router