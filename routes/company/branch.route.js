const express = require('express');
const { services } = require('../../services/company/branch.service');
// const Branch = require('../../models/company/Branch.model');
// const services = require('../../services/Root.service')(Branch);
const {
    getAllBranches,
    getBranchesByQuery,
    searchBranchesByQuery,
    getBranchesCount,
    getSingleBranch,
    getBranchesByPage,
    addSingleBranch,
    updateSingleBranch,
    deleteSingleBranch
} = require('../../controllers/company/branch.controller');
const router = express.Router();
const {routeServices,upload} = require('../RouteServices');

// const RouteServices = routeServices(services);
// const populateCollections = {
//     docs: ['customer', 'company'],
//     fields: ["name"]
// }
//GET ALL BRANCHES
router.get('/', getAllBranches)

//GET BY QUERY
router.get('/query', getBranchesByQuery)

//SEARCH BY ORQUERY
router.get('/search', searchBranchesByQuery);

//GET COUNTS
router.get('/count', getBranchesCount)

//GET SINGLE BRANCH BY ID
router.get('/:id', getSingleBranch)

// GET BRANCHES BY PAGE
router.get('/:pageSize/:pageNo', getBranchesByPage)

//ADD SINGLE BRANCH
router.post('/', upload.any(), addSingleBranch)

//UPDATE SINGLE BRANCH
router.put('/:id',upload.any(), updateSingleBranch)

//DELETE SINGLE BRANCH
router.delete('/:id', deleteSingleBranch)

module.exports = router;