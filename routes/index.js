var express = require('express');
var router = express.Router();
const Task = require('../models/Task')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/index', function (req, res, next) {
  res.render('index');
})

router.get('/datanya', async (req, res) => {
  const tasks = await Task.find();
  res.render('datanya', {
    tasks
  });
});

router.post('/add', async (req, res, next) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect('/datanya');
});

router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect('/datanya');
});


router.get('/edit/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task)
  res.render('edit', { task });
});

router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.update({id: id}, req.body);
  res.redirect('/datanya');
});

router.get('/delete/:id', async (req, res, next) => {
  let { id } = req.params;
  await Task.remove({id: id});
  res.redirect('/datanya');
});


module.exports = router;
