const express = require('express');
const {services } = require('../../services/company/company.service.js');
const router = express.Router();
const {routeServices,upload} = require('../RouteServices');

const RouteServices = routeServices(services);
const populateCollections = {
    docs: ['category'],
    fields: ["name"]
}

//GET ALL COMPANIES
const getAllCopnanies =  async (req,res)=>{
    RouteServices.getAll(req,res);
};

//GET BY QUERY
const getCompaniesByQuery = async (req, res) => {
    const data = req.query;
    const fields = data.fields;
    const query = JSON.parse(data.query);
    req.body = {
        fields,
        query
    }
    RouteServices.getFieldsByQuery(req, res);
};

//SEARCH BY ORQUERY
const searchByQuery = async (req, res) => {
    req.body = { ...populateCollections };
    RouteServices.getBySearch(req, res);
};

//GET COUNTS
const getCompaniesCount = async (req, res) => {
    console.log('company count');
    RouteServices.count(req, res);
}

//GET SINGLE COMPANY BY ID
const getSingleCompany = async (req,res)=>{
    RouteServices.getOne(req,res)
}

// GET COMPANIES BY PAGE
const getCompaniesByPage = async (req, res) => {
    req.body = {
        ...populateCollections
    }
    RouteServices.getByPage(req,res);
}

//ADD SINGLE COMPANY
const addSingleCompany = async (req,res)=>{
    RouteServices.addOne(req,res);
}

//UPDATE SINGLE COMPANY
const updateSingleCompany = async (req, res) => {
    RouteServices.updateOne(req,res);
}

//DELETE SINGLE COMPANY
const deleteSingleCompany = async (req,res)=>{
    RouteServices.deleteOne(req,res);
}

module.exports = {
    getAllCopnanies,
    getCompaniesByQuery,
    searchByQuery,
    getCompaniesCount,
    getSingleCompany,
    getCompaniesByPage,
    addSingleCompany,
    updateSingleCompany,
    deleteSingleCompany
};