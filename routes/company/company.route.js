const express = require('express');
const {services } = require('../../services/company/company.service.js');
const router = express.Router();
const {routeServices,upload} = require('../RouteServices');
const {
    getAllCopnanies,
    getCompaniesByQuery,
    searchByQuery,
    getCompaniesCount,
    getSingleCompany,
    getCompaniesByPage,
    addSingleCompany,
    updateSingleCompany,
    deleteSingleCompany
} = require('../../controllers/company/company.controller.js');
const RouteServices = routeServices(services);
const populateCollections = {
    docs: ['category'],
    fields: ["name"]
}
//GET ALL COMPANIES
router.get('/', getAllCopnanies);

//GET BY QUERY
router.get('/query', getCompaniesByQuery);

//SEARCH BY ORQUERY
router.get('/search', searchByQuery);

//GET COUNTS
router.get('/count', getCompaniesCount)

//GET SINGLE COMPANY BY ID
router.get('/:id', getSingleCompany)

// GET COMPANIES BY PAGE
router.get('/:pageSize/:pageNo', getCompaniesByPage)



//ADD SINGLE COMPANY
router.post('/', upload.any(), addSingleCompany)

//UPDATE SINGLE COMPANY
router.put('/:id', upload.any(), updateSingleCompany)

//DELETE SINGLE COMPANY
router.delete('/:id', deleteSingleCompany)

module.exports = router;