import Category from '../models/category';
import { errorHandler } from '../helpers/dbErrorHandler';

export const create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if(err){
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({ category });
  })
}

// middleware
export const categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if(err || !category){
      return res.status(400).json({
        error: 'Category does not exist'
      })
    }
    req.category = category;
    next();
  })
}

export const read = (req, res) => {
  return res.json(req.category);
}

export const update = (req, res) => {
  const category = req.category; 
  // only one field in category
  category.name = req.body.name;

  category.save((err, category) => {
    if(err){
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json({ category });
  })
}

export const remove = (req, res) => {
  const category = req.category; 

  category.remove((err, category) => {
    if(err){
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    console.log('deleted category', category);
    res.json({ message: 'Category deleted successfully' });
  })
}

export const list = (req, res) => {
  Category.find().exec((err, category) => {
    if(err){
      return res.status(400).json({
        error: errorHandler(err)
      })
    }
    res.json(category);
  })
}