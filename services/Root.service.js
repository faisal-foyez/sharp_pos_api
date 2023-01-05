const RootServices = (Entity) =>{

    const services = { 
        getAll:async ()=>{
            const entities = await Entity.find();
            return entities;
        },
        getOne:async (id)=>{
            const entity = await Entity.findOne({ _id: id });
            return entity;
        },
        getByQuery: async (query)=>{
            const entities = await Entity.find(query);
            return entities;
        },
        getByPage: async (pgSize, pgNo, docsArray, fieldsArray)=>{
            const pageSize = parseInt(pgSize);
            const pageNo = parseInt(pgNo);
            const docs = docsArray ? docsArray.join(' ') :'';
            const fields = fieldsArray ? fieldsArray.join(' ') : '';

            const entities = await Entity.find()
                                         .populate(docs, fields)
                                         .limit(pageSize).skip(pageSize * pageNo)
                                         .sort({ _id: 1 });
            return entities;
        },
        getFieldsByQuery:async(query,fields)=>{
            //const fields = arrayOfFields.join(' ');
            const entities = await Entity.find(query).select(fields);
            return entities;
        },
        getAllWithPopulate:async(docs,fields)=>{
            //const documents = docs.join(' ');
            const entities = await Entity.find().populate(docs.join(' '),fields.join(' '));
            return entities;
        },
        getBySearch: async (OrQueryArr, docsArray, fieldsArray)=>{
            //CONVERT THE DOCSARRAY FIELD INTO STRING
            const docs = docsArray ? docsArray.join(' ') : '';
            //CONVERT THE FIELDS INTO FIELDS STRING
            const fields = fieldsArray ? fieldsArray.join(' ') : '';
            const entities = await Entity.find({ $or: OrQueryArr})
                                         .populate(docs,fields);
            return entities;
        },
        count: async() => {
            const count = await Entity.countDocuments();
            return count;
        },
        addOne:async (data) =>{
            const maxSeqEntity = await Entity.findMaxSequence();
            const entity = new Entity({
                ...data,
                sequence: maxSeqEntity ? maxSeqEntity.sequence + 1 : 1
            })
            const saved = await entity.save();
            return saved
        },
        deleteOne:async(id)=>{
            const entity = await Entity.deleteOne({ _id: id });
            return entity;
        },
        updateOne:async(id,updatedData)=>{
            const entity = await Entity.updateOne({_id:id}, updatedData);
            return entity;
        }
    }

    return services;

}

module.exports = RootServices;