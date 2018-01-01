import express from 'express';

const router = express.Router();

//监听接收get请求
router.get('/', function(req, res) {
    res.type('text/plain');
    res.send('Hello World');
});

//监听接收post请求
router.post('/', function(req, res) {
    res.type('text/plain');
    res.send('Hello World');
});

export default router;