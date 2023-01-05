const express = require('express');
const { services } = require('../../services/company/branch.service');
// const Branch = require('../../models/company/Branch.model');
// const services = require('../../services/Root.service')(Branch);

const router = express.Router();
const {routeServices,upload} = require('../RouteServices');

const RouteServices = routeServices(services);
const populateCollections = {
    docs: ['customer', 'company'],
    fields: ["name"]
}
//GET ALL BRANCHES
router.get('/', async (req, res) => {
    req.body = {
        docs:['customer','company'],
        fields:["name phone1"]
    }
    RouteServices.getAllWithPopulate(req,res);
})

//GET BY QUERY
router.get('/query', async (req, res) => {
    const data = req.query;
    const fields = data.fields;
    const query = JSON.parse(data.query);
    req.body = {
        fields,
        query
    }
    RouteServices.getFieldsByQuery(req, res);
})

//SEARCH BY ORQUERY
router.get('/search', async (req, res) => {
    req.body = { ...populateCollections };
    RouteServices.getBySearch(req, res);
});

//GET COUNTS
router.get('/count', async (req, res) => {
    RouteServices.count(req, res);
})

//GET SINGLE BRANCH BY ID
router.get('/:id', async (req, res) => {
    RouteServices.getOne(req, res);
})

// GET BRANCHES BY PAGE
router.get('/:pageSize/:pageNo', async (req, res) => {
    req.body = {
        ...populateCollections
    }
    //RouteServices.getAllWithPopulate(req, res);
    RouteServices.getByPage(req, res);
})

//ADD SINGLE BRANCH
router.post('/', upload.any(), async (req, res) => {
    RouteServices.addOne(req, res);

})

//UPDATE SINGLE BRANCH
router.put('/:id',upload.any(), async (req, res) => {
    RouteServices.updateOne(req, res);
})

//DELETE SINGLE BRANCH
router.delete('/:id', async (req, res) => {
    RouteServices.deleteOne(req, res);
})

module.exports = router;