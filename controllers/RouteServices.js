const fs = require('fs');
const path = require('path');

const multer = require('multer');
const { json } = require('express');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


exports.upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
    fileFilter: fileFilter
});


exports.routeServices = (services) =>{
    const commonMethods={
        getAll: async (req, res) => {
            try {
                const entities = await (await services).getAll();
                res.status(200).json(entities);
            } catch (err) {
                res.status(500).send(err.message);
            }
        },
        getOne: async (req, res) => {
            try {
                const id = req.params.id;
                const entity = await (await services).getOne(id);
                res.status(200).json(entity);
            } catch (err) {
                res.status(500).send(err.message);
            }
        },
        getByPage:async (req,res)=>{
            const pageSize = req.params.pageSize;
            const pageNo = req.params.pageNo;
            try {
                const entities = await (await services).getByPage(pageSize, pageNo, req.body.docs, req.body.fields);
                res.status(200).json(entities);

            } catch (err) {
                res.status(500).send(err.message);
            }
        },
        getFieldsByQuery:async(req,res)=>{
            try {
                const query = req.body.query;
                const fields = req.body.fields;

                // const entities = await (await services).getFieldsByQuery({_id:id},["image name"]);
                const entities = await (await services).getFieldsByQuery(query, fields);
                res.status(200).json(entities);
            } catch (err) {
                res.status(500).send(err.message);
            }
        },
        getAllWithPopulate: async (req, res) => {
            try {
                //console.log(req.body);
                //return res.json();
                //const id = req.params.id;
                const entities = await (await services).getAllWithPopulate(req.body.docs,req.body.fields);
                res.status(200).json(entities);
            } catch (err) {
                res.status(500).send(err.message);
            }
        },
        getBySearch: async (req,res)=>{
            try {
                const paramArray = req.query.columns;

                const OrQueryArr = paramArray.map(param=>{
                    return JSON.parse(param);
                });
                //return res.json();
                const entities = await (await services).getBySearch(OrQueryArr, req.body.docs, req.body.fields);
                res.status(200).json(entities);
            } catch (err) {
                res.status(500).send(err.message);
            }
        },
        count:async(req,res)=>{
            try{
                const count = await (await services).count();
                res.status(200).json(count);
            }catch(err){
                res.status(500).send(err.message);
            }
        },
        addOne:async(req,res)=>{
            //IF THERE IS ANY NULL OR UNDEFINED OR EMPTY STRING IN THE REQ.BODY
            //THEN VALUE SHOULD BE NULL BECAUSE NODE JS TREAT ANY NULL OR UNDEFINED
            //IN THE REQ.BODY AS STRING
            for (let item in req.body) {
                
                req.body[item] =

                    req.body[item] === "null" ||
                        req.body[item] === "undefined" ||
                        req.body[item].trim() === ""
                        ?
                        null
                        : req.body[item];
            }
            let imageFiles=[],imageFile=[];
            if(req.files && req.files.length){
                imageFiles = req.files.filter(file=>{
                    if(file.fieldname ==='images') return true;
                }).map(item => { return item.path });;

                imageFile = req.files.filter(file => {
                    if (file.fieldname === 'image') return true;
                }).map(item=>{return item.path});
            }
            try {
                const entity = await (await services).addOne({
                    ...req.body,
                    //image: (typeof req.file !== "undefined") ? req.file.path : null
                    image: imageFile.length ? imageFile[0] : null,
                    images:imageFiles.length ? imageFiles:[]

                });
                res.status(200).json(entity); 
            } catch (err) {
                res.status(500).send(err.message);
            }
        },
        updateOne:async(req,res)=>{
            //IF THERE IS ANY NULL OR UNDEFINED OR EMPTY STRING IN THE REQ.BODY
            //THEN VALUE SHOULD BE NULL BECAUSE NODE JS TREAT ANY NULL OR UNDEFINED
            //IN THE REQ.BODY AS STRING
            for (let item in req.body) {
                if(item==='images') continue;
                req.body[item] = 

                req.body[item] === "null" || 
                req.body[item] === "undefined" ||
                req.body[item].trim() === ""
                ? 
                null
                : req.body[item];
            }
            let imageFiles = [], imageFile = [];
            if (req.files && req.files.length) {
                imageFiles = req.files.filter(file => {
                    if (file.fieldname === 'images') return true;
                }).map(item => { return item.path });;
                
                imageFile = req.files.filter(file => {
                    if (file.fieldname === 'image') return true;
                }).map(item => { return item.path });
            }
            try {
                const entities = await (await services).getFieldsByQuery({ _id: req.params.id }, ["image","images"]);
                const prevImage = entities[0].image;
                const prevImages = entities[0].images;

                let newImage = imageFile[0]?imageFile[0]: req.body.image;
                let newImages = req.body.images ? req.body.images:[];
                newImages = newImages.concat(imageFiles);
                
                if (prevImage && prevImage !== newImage) {
                    console.log('please delete');
                    //DELETE THE IMAGE FROM UPLOADS FOLDER;
                    const filePath = path.resolve(__dirname, '../'+prevImage);
                    fs.unlinkSync(filePath);
                }
                for(let i  =0; i< prevImages.length; i++){
                    console.log(newImages.includes(prevImages[i]));
                    if (!newImages.includes(prevImages[i])) {
                        //DELETE IMG
                        const filePath = path.resolve(__dirname, '../' + prevImages[i]);
                        fs.unlinkSync(filePath);
                    }
                }

                const response = await (await services).updateOne(req.params.id, {
                    ...req.body,
                    image: newImage,
                    images: newImages
                });
                
                //IF PREV IMAGE IS THERE BUT NO NEW IMAGE
                res.status(200).json(response);
            } catch (err) {
                res.status(500).send(err.message);
            }
        }, 
        deleteOne:async(req,res)=>{
            try {
                const entities = await (await services).getFieldsByQuery({ _id: req.params.id }, ["image", "images"]);
                const prevImage = entities[0].image;
                const prevImages = entities[0].images;
                //DELETE THE DATA FROM THE DB
                const deleteResponse = await (await services).deleteOne(req.params.id);
                //IF IMAGE IS THERE THEN DELETE IT
                if (prevImage) {
                    //DELETE THE IMAGE FROM UPLOADS FOLDER;
                    const filePath = path.resolve(__dirname, '../' + prevImage);
                    fs.unlinkSync(filePath);
                }
                //IF IMAGES ARE THERE THEN DELETE THEM TOO
                for (let i = 0; i < prevImages.length; i++) {       
                    //DELETE IMG
                    const filePath = path.resolve(__dirname, '../' + prevImages[i]);
                    fs.unlinkSync(filePath);
                }
                //SEND THE RESPONSE
                res.status(200).json(deleteResponse);

            } catch (err) {
                res.status(500).send(err.message);
            }
        }
    }
    return commonMethods
}

//module.exports = routeService;

