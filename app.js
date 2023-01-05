const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const bcrypt = require('bcryptjs');
require('dotenv').config();
// console.log(require('crypto').randomBytes(64).toString('hex'));
// bcrypt.compare('faisal1122','$2a$10$3J5oarCLtRay9qosSSB8ORmd3zU6mCwRs1uvTolN0IUgu/V1sIJu')
// .then(res=>{console.log(res)})
const verifyToken = require('./verify.token'); 

const app = express();

//public folders
app.use('/sharpposapi/uploads', express.static('uploads'));
app.use('/sharpposapi/pos_icons', express.static('pos_icons'));


//Middlewares 
app.use(cors());
app.use(express.json()); 

//Route imports 
const companyRoute = require('./routes/company/company.route.js');
const branchRoute = require('./routes/company/branch.route');
const warehouseRoute = require('./routes/company/warehouse.route');

const customerRoute = require('./routes/customer/customer.route');
const customerCategoryRoute = require('./routes/customer/customerCategory.route');
const customerSubCategoryRoute = require('./routes/customer/customerSubCategory.route');

const expenseRoute = require('./routes/expense/expense.route');
const expenseCategoryRoute = require('./routes/expense/expenseCategory.route');
const expenseSubCategoryRoute = require('./routes/expense/expenseSubCategory.route');

const productRoute = require('./routes/product/product.route');
const productCategoryRoute = require('./routes/product/productCategory.route');
const productSubCategoryRoute = require('./routes/product/productSubCategory.route');
const vatCategoryRoute = require('./routes/product/vatCategory.route');
const brandRoute = require('./routes/product/brand.route');
const groupRoute = require('./routes/product/group.route');

const purchaseRoute = require('./routes/purchase/purchase.route');
const purchaseDetailsRoute = require('./routes/purchase/purchaseDetails.route');
const purchaseReturnRoute = require('./routes/purchase/purchaseReturn.route');
const purchaseReturnDetailsRoute = require('./routes/purchase/purchaseReturnDetails.route');

const salesRoute = require('./routes/sales/sales.route');
const salesDetailsRoute = require('./routes/sales/salesDetails.route');
const salesReturnRoute = require('./routes/sales/salesReturn.route');
const salesReturnDetailsRoute = require('./routes/sales/salesReturnDetails.route');

const supplierRoute = require('./routes/supplier/supplier.route');
const supplierCategoryRoute = require('./routes/supplier/supplierCategory.route');
const supplierSubCategoryRoute = require('./routes/supplier/supplierSubCategory.route');


const userRoute = require('./routes/user/user.route.js');
const userRoleRoute = require('./routes/user/userRole.route')
const authRoute = require('./routes/user/auth.route.js');
///////////////////////////////////////////////////////////////////////////////////////////
const defaultAppName = '/sharpposapi';

//Route Middlewares
app.use(defaultAppName + '/api/company', verifyToken, companyRoute);
app.use(defaultAppName + '/api/branch', verifyToken, branchRoute);
app.use(defaultAppName + '/api/warehouse', verifyToken, warehouseRoute);

app.use(defaultAppName + '/api/customer', verifyToken, customerRoute);
app.use(defaultAppName + '/api/customercategory', verifyToken, customerCategoryRoute);
app.use(defaultAppName + '/api/customersubcategory', verifyToken, customerSubCategoryRoute);

app.use(defaultAppName + '/api/expense', verifyToken, expenseRoute);
app.use(defaultAppName + '/api/expensecategory', verifyToken, expenseCategoryRoute);
app.use(defaultAppName + '/api/expensesubcategory', verifyToken, expenseSubCategoryRoute);

app.use(defaultAppName + '/api/product', verifyToken, productRoute);
app.use(defaultAppName + '/api/productcategory', verifyToken, productCategoryRoute);
app.use(defaultAppName + '/api/productsubcategory', verifyToken, productSubCategoryRoute);
app.use(defaultAppName + '/api/vatcategory', verifyToken, vatCategoryRoute);
app.use(defaultAppName + '/api/brand', verifyToken, brandRoute);
app.use(defaultAppName + '/api/group', verifyToken, groupRoute);

app.use(defaultAppName + '/api/purchase', verifyToken, purchaseRoute);
app.use(defaultAppName + '/api/purchasedetails', verifyToken, purchaseDetailsRoute);
app.use(defaultAppName + '/api/purchasereturn', verifyToken, purchaseReturnRoute);
app.use(defaultAppName + '/api/purchasereturndetails', verifyToken, purchaseReturnDetailsRoute);

app.use(defaultAppName + '/api/sales', verifyToken, salesRoute);
app.use(defaultAppName + '/api/salesdetails', verifyToken, salesDetailsRoute);
app.use(defaultAppName + '/api/salesreturn', verifyToken, salesReturnRoute);
app.use(defaultAppName + '/api/salesreturndetails', verifyToken, salesReturnDetailsRoute);

app.use(defaultAppName + '/api/supplier', verifyToken, supplierRoute);
app.use(defaultAppName + '/api/suppliercategory', verifyToken, supplierCategoryRoute);
app.use(defaultAppName + '/api/suppliersubcategory', verifyToken, supplierSubCategoryRoute);

app.use(defaultAppName + '/api/user', verifyToken, userRoute);
app.use(defaultAppName + '/api/userrole', verifyToken, userRoleRoute);
app.use(defaultAppName + '/api/auth', authRoute);
////////////////////////////////////////////////////////////////////////////
 
//CONNECTING TO DB 
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>{
    console.log('connected');
    //AFTER CONNECTING TO DB, RUNNING THE SERVER
    app.listen(3000);
}).catch(err=>console.log(err));