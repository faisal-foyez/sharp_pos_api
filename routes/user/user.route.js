const express = require('express');
const bcrypt = require('bcryptjs');
const { services } = require('../../services/user/user.service');
const router = express.Router();
const {routeServices,upload} = require('../RouteServices');
const User = require('../../models/user/User.model');
const RouteServices = routeServices(services);

const populateCollections = {
    docs: [],
    fields: []
}
//GET ALL USERS
router.get('/', async (req, res) => {
   RouteServices.getAll(req,res);
//    const entity = await User.find().select("image");
//    res.status(200).json(entity);
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

//SEARCH BY OR QUERY
router.get('/search', async (req, res) => {
    req.body = { ...populateCollections };
    RouteServices.getBySearch(req, res);
});

//GET COUNTS
router.get('/count', async (req, res) => {
    RouteServices.count(req, res);
})

// GET SINGLE USER BY ID
router.get('/:id', async (req, res) => {
    RouteServices.getOne(req, res);
})

// GET USERS BY PAGE
router.get('/:pageSize/:pageNo', async (req, res) => {
    req.body = {
        ...populateCollections
    }
    RouteServices.getByPage(req, res);
})

//ADD SINGLE USER 
router.post('/',upload.any(), async (req, res) => {
    req.body = {
        ...req.body,
        // password: req.body.password ? await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)) : null
    }
    RouteServices.addOne(req, res);
})

//UPDATE SINGLE USER
router.put('/:id',upload.any(), async (req, res) => {
    RouteServices.updateOne(req, res);
})

//DELETE SINGLE USER
router.delete('/:id', async (req, res) => {
    RouteServices.deleteOne(req, res);
})

module.exports = router;