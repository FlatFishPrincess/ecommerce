import formidable from 'formidable';
import _ from 'lodash';
import Product from '../models/product';
import { errorHandler } from '../helpers/dbErrorHandler';
import fs from 'fs';

export const create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {

    if(err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }
    // validation for fields
    const { name, description, price, category, quantity, shipping } = fields;
    if(!name || !description || !price || !category || !quantity || !shipping){
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    let product = new Product(fields);

    if(files.photo){
      if(files.photo.size > 1000000){
        // file size: 1kb = 1,000, 1mb = 1,000,000
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        })
      }
      // photo: { data: Buffer, contentType: String } => database schema
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, product) => {
      if(err){
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json({ product })
    })
  })
}

export const read = (req, res) => {
  // photo size is big, set undefined
  req.product.photo = undefined;
  return res.json(req.product);
}

// middleware
export const productId = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if(err || !product) {
      return res.status(400).json({
        error: 'Product not found'
      });
    }
    req.product = product;
    next();
  })
}

export const remove = (req, res) => {
  let product = req.product; // from productId function
  product.remove((err, deletedProduct) => {
    if(err) {
      return res.status(400).json({
        error: errorHandler(err)
      });
    }
    console.log('delete product:', deletedProduct.name);
    res.json({
      message: 'Product deleted successfully'
    });
  })
}



export const update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {

    if(err) {
      return res.status(400).json({
        error: 'Image could not be uploaded'
      });
    }
    // validation for fields
    const { name, description, price, category, quantity, shipping } = fields;
    if(!name || !description || !price || !category || !quantity || !shipping){
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if(files.photo){
      if(files.photo.size > 1000000){
        // file size: 1kb = 1,000, 1mb = 1,000,000
        return res.status(400).json({
          error: 'Image should be less than 1mb in size'
        })
      }
      // photo: { data: Buffer, contentType: String } => database schema
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, product) => {
      if(err){
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json({ product })
    })
  })
}