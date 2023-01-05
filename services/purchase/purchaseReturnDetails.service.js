const PurchaseReturnDetails = require('../../models/purchase/PurchaseReturnDetails.model');
const RootService = require('../Root.service');

exports.services = RootService(PurchaseReturnDetails);
// const RootService = require('../Root.service');

// const Entity = PurchaseReturnDetails;
// //GET ALL ENTITIES
// exports.getAll = async () => {
//     const entities = await RootService.getAll(Entity);
//     return entities;

// }

// //GET SINGLE ENTITY
// exports.getOne = async (id) => {
//     const entity = await RootService.getOne(id, Entity);
//     return entity;
// }


// //GET ENTITIES BY QUERY
// exports.getByQuery = async (query) => {
//     const entities = await RootService.getByQuery(query, Entity);
//     return entities;
// }

// //GET ENTITIES BY PAGE
// exports.getByPage = async (pgSize, pgNo) => {
//     const entities = await RootService.getByPage(pgSize, pgNo, Entity);
//     return entities;
// }

// //ADD A NEW ENTITY
// exports.add = async (data) => {
//     const saved = await RootService.add(data, Entity);
//     return saved;
// }

// //DELETE SINGLE ENTITY
// exports.deleteOne = async (id) => {
//     const entity = await RootService.deleteOne(id, Entity);
//     return entity;
// }

// //UPDATE SINGLE ENTITY
// exports.updateOne = async (id, updatedData) => {
//     const entity = RootService.updateOne(id, { ...updatedData }, Entity);
//     return entity;
// }

