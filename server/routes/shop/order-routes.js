const express=require('express');
const {createOrder, capturePayment, getAllOrdersByUser, getOrderDetails}=require('../../controllers/shop/order-controller');
const router=express.Router();
router.post('/create',createOrder);
router.get('/get',capturePayment);
module.exports=router;