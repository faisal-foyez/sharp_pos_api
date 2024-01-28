const express = require('express');
const { services } = require('../../services/company/warehouse.service');
const router = express.Router();
const {routeServices,upload} = require('../RouteServices');
const RouteServices = routeServices(services);
const populateCollections = {
    docs: ['company', 'branch'],
    fields: ["name"]
}
//GET ALL WAREHOUSES
router.get('/', async (req, res) => {
    RouteServices.getAll(req,res);
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
});

//SEARCH BY ORQUERY
router.get('/search', async (req, res) => {
    req.body = { ...populateCollections };
    RouteServices.getBySearch(req, res);
});

//GET COUNTS
router.get('/count', async (req, res) => {
    RouteServices.count(req, res);
})

//GET SINGLE WAREHOUSE BY ID
router.get('/:id', async (req, res) => {
    RouteServices.getOne(req, res);
})

// GET WAREHOUSES BY PAGE
router.get('/:pageSize/:pageNo', async (req, res) => {
    req.body = {
       ...populateCollections
    }
    RouteServices.getByPage(req, res);
})

//ADD SINGLE WAREHOUSE
router.post('/', upload.any(), async (req, res) => {
    RouteServices.addOne(req, res);
})

//UPDATE SINGLE WAREHOUSE
router.put('/:id', upload.any(), async (req, res) => {
    RouteServices.updateOne(req, res);
})

//DELETE SINGLE WAREHOUSE
router.delete('/:id', async (req, res) => {
    RouteServices.deleteOne(req, res);
})

module.exports = router;