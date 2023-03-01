var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false 
});

//SCHEMA
let lopSchema = mongoose.Schema({
  name: {
    type: String,
  },
  malop: {
    type: String,
  },
  numberStudent: {
    type: Number,
  },
  magiangvien: {
    type: String,
  }
});

//MODEL
let Lop = mongoose.model('Lop', lopSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  Lop.find({}, (error, data)=>{
    console.log('danh sách lớp' , data);
    res.render('index', {lops: data});
  });
});
router.get('/from-add', function(req , res , next ){
  res.render('from-add', {});
});
router.post('/add', function(req ,res, next){
  Lop.create(req.body);
  res.redirect('/');
})
router.get('/from-update/:id', function(req , res , next ){
  Lop.findById(req.params.id, (error, data)=>{
    res.render('from-update', {lop: data})
  })
});
router.post('/update', function(req ,res, next){
  Lop.findByIdAndUpdate(req.body.id, res.body, (error,data)=>{
    res.redirect('/')
  })
})
router.get('/from-update/:id', function(req , res , next ){
  Lop.findByIdAndDelete(req.params.id, (error, data)=>{
    res.redirect('/')
  })
});
module.exports = router;
