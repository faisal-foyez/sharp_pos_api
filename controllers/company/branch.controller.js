
const { services } = require('../../services/company/branch.service');
// const Branch = require('../../models/company/Branch.model');
// const services = require('../../services/Root.service')(Branch);


const {routeServices} = require('../RouteServices');
const RouteServices = routeServices(services);

const populateCollections = {
    docs: ['customer', 'company'],
    fields: ["name"]}

//GET ALL BRANCHES
const getAllBranches =  async (req, res) => {
    req.body = {
        docs:['customer','company'],
        fields:["name phone1"]
    }
    RouteServices.getAllWithPopulate(req,res);
}

//GET BY QUERY
const getBranchesByQuery = async (req, res) => {
    const data = req.query;
    const fields = data.fields;
    const query = JSON.parse(data.query);
    req.body = {
        fields,
        query
    }
    RouteServices.getFieldsByQuery(req, res);
}

//SEARCH BY ORQUERY
const searchBranchesByQuery = async (req, res) => {
    req.body = { ...populateCollections };
    RouteServices.getBySearch(req, res);
}

//GET COUNTS
const getBranchesCount = async (req, res) => {
    RouteServices.count(req, res);
}

//GET SINGLE BRANCH BY ID
const getSingleBranch = async (req, res) => {
    RouteServices.getOne(req, res);
}

// GET BRANCHES BY PAGE
const getBranchesByPage =  async (req, res) => {
    req.body = {
        ...populateCollections
    }
    //RouteServices.getAllWithPopulate(req, res);
    RouteServices.getByPage(req, res);
}

//ADD SINGLE BRANCH
const addSingleBranch = async (req, res) => {
    RouteServices.addOne(req, res);
}

//UPDATE SINGLE BRANCH
const updateSingleBranch =  async (req, res) => {
    RouteServices.updateOne(req, res);
}

//DELETE SINGLE BRANCH
const deleteSingleBranch = async (req, res) => {
    RouteServices.deleteOne(req, res);
}

module.exports = {
    getAllBranches,
    getBranchesByQuery,
    searchBranchesByQuery,
    getBranchesCount,
    getSingleBranch,
    getBranchesByPage,
    addSingleBranch,
    updateSingleBranch,
    deleteSingleBranch
}