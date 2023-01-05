

//GET ALL ENTITIES
exports.getAll = async (Entity) => {
    const entities = await Entity.find();
    return entities;
}

//GET SINGLE ENTITY
exports.getOne = async (id, Entity) => {
    const entity = await Entity.findOne({ _id: id });
    return entity;
}


//GET ENTITIES BY QUERY
exports.getByQuery = async (query, Entity) => {
    const entities = await Entity.find(query);
    return entities;
}

//GET ENTITIES BY PAGE
exports.getByPage = async (pgSize, pgNo, Entity) => {
    const pageSize = parseInt(pgSize);
    const pageNo = parseInt(pgNo);
    const entities = await Entity.find().limit(pageSize).skip(pageSize * pageNo).sort({ _id: 1 });
    return entities;
}

//ADD A NEW ENTITY
exports.add = async (data, Entity) => {
    const maxSeqEntity = await Entity.findMaxSequence();
    const entity = new Entity({
        ...data,
        sequence: maxSeqEntity ? maxSeqEntity.sequence + 1 : 1
    })
    const saved = await entity.save();
    return saved
}

//DELETE SINGLE ENTITY
exports.deleteOne = async (id, Entity) => {
    const entity = await Entity.deleteOne({ _id: id });
    return entity;
}

//UPDATE SINGLE ENTITY
exports.updateOne = async (id, updatedData, Entity) => {
    const entity = await Entity.updateOne({ _id: id }, { ...updatedData });
    return entity;
} 