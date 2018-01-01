import express from 'express';
//页面通用请求
import common from './routers/common';

const app = express();

 app.use('/system/common', common);
 app.use('/system', common);
 app.listen(4000);


