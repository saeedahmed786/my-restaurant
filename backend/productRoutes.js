const config = require('./config');
const express = require('express');
const Product = require('./productModel');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const {authenticatorJWT} = require('./authenticator');
const Category = require('./categoryModel');
const upload = require('./multer');
const Mongoose = require('mongoose');
const Deal = require('./dealsModel');
const router = express.Router();



router.get('/', async (req, res) => {
     const products= await Product.find({});
     res.send(products);
});

 /********************************************* Category Routes ***********************************************
      * ****************************************************************************************
      * *********************************vv******************************************************************/
   

router.post('/categories', authenticatorJWT, async (req, res) => {
    const { category } = req.body;
    try {
        const categoryExists = await Category.findOne({ category });
        if(categoryExists) {
            return res.status(401).json({
                err: `${category} already exists`
            });
        }
       const newCategory = new Category();
       newCategory.category = category;
        newCategory.save();
       res.status(200).json({
           successMessage: 'Category is created successfully'
       });
   } catch (err) {
       console.log('category create error', err);
       res.status(401).json({
           err: 'Unable to create category. Please try again later.'
       })
   }
   
});

router.get('/categories',  async (req, res) => {

    try {
       
      const categories = await Category.find({});
      res.status(200).json({
          categories,
      })
      
   } catch (err) {
       console.log('categories loaded error', err);
       res.status(401).json({
           err: 'Unable to load categories. Please try again later.'
       })
   }
   
});

router.delete('/categories/:id',  async (req, res) => {
    try {
     console.log(req.params.id);
       
      const deletedCategory = await Category.findById(req.params.id);
      if(deletedCategory) {
          await deletedCategory.remove();
      res.status(200).json({
          successMessage: 'Category is deleted successfully'
      })
    }
      
   } catch (err) {
       console.log('categories delete error', err);
       res.status(401).json({
           err: 'Unable to delete categories. Please try again later.'
       })
   }
   
});




router.get('/categories/filter/:id', async (req, res) => {
    console.log(req.params.id);
    const catId = req.params.id;
    try {
        //    const findCategory = await Category.find({_id: catId});
            const productsByCategory = await Product.find({category: req.params.id}).sort({ createdAt: -1});
            return res.status(200).json(productsByCategory);
           
            
        }   
          catch(err)  {
        res.status(404).json({
            err: 'categories filter error'
                    })
        

    }

   

       

        
        
 
})

/********************************************* Deals Routes ***********************************************
      * ****************************************************************************************
      * *********************************vv******************************************************************/
   


router.post('/deals', authenticatorJWT , upload.single('file') ,async (req, res) => {

    const deal = new Deal({
        name: req.body.name,
        priceBefore: req.body.priceBefore,
        price: req.body.price,
        off: req.body.off,
        image: req.file.filename,
        countInStock: req.body.countInStock,
        description: req.body.description,
        category: req.body.productCategory
       
    });
    const newDeal = await deal.save();
    if(newDeal) {
        return res.status(201).json({successMessage: 'New Deal is created'});
    }

    return res.status(500).json({err: 'error in creating Deal'});
});


router.get('/deals', async (req, res) => {
    const deals = await Deal.find({});
    if(deals) {
        return res.status(200).json({deals});
    } else {
        return res.status(404).json({err: 'No Deals Found'});
    }
})

router.get('/deal/:id', async (req, res) => {
    console.log(req.params.id);
    const deal= await Deal.findOne({_id: req.params.id});
    if(deal) {
        res.status(200).json({deal});

    } else {
        res.status(404).send({err: 'Deal Not Found'});
    }
   
});

router.delete('/deals/:id', authenticatorJWT, async (req, res) => {
    console.log(req.params.id);
    const deal = await Deal.findById({_id: req.params.id});
    if(deal) {
        await deal.remove();
        res.status(200).json({successMessage: 'Deal deleted successfully'});
    } else {
        res.status(404).json({
            err: 'Deals delete error'
        });
    }
})




 /********************************************* Products Routes ***********************************************
      * ****************************************************************************************
      * *********************************vv******************************************************************/
   







router.get('/:id', async (req, res) => {
    const product= await Product.findOne({_id: req.params.id});
    if(product) {
        res.send(product);

    } else {
        res.status(404).send({message: 'Product Not Found'});
    }
   
});




router.post('/', authenticatorJWT ,upload.single('file') ,async (req, res) => {

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        countInStock: req.body.countInStock,
        description: req.body.description,
        category: req.body.productCategory
       
    });
    const newProduct = await product.save();
    if(newProduct) {
        return res.status(201).send({successMessage: 'New product is created'});
    }

    return res.status(500).send({err: 'error in creating product'});
});



router.put('/:id', authenticatorJWT,upload.single('file') ,  async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById( productId);
    if(product) {
        product.name= req.body.name;
        product.price= req.body.price;
        product.countInStock= req.body.countInStock;
        product.image= req.file.filename;
        product.description= req.body.description;
        product.category = req.body.productCategory;
        

        const updatedProduct = await product.save();
        if(updatedProduct) {
            return res.status(200).send({ successMessage: 'Product Updated'});
        }
   

    }
    return res.status(500).send({err: 'Error in updating Product.'});
       
    
});

router.delete('/:id', async (req, res, next) => {
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct) {
        await deletedProduct.remove();
        res.send({message: 'Product Deleted'});
    } else{
    res.send({message: 'Product Deletion failed'});
     }
    
});



module.exports = router;