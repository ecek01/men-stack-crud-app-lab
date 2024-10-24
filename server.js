require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const app = express();
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });  

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/test', (req, res) => {
  res.send('Server is running!');
});

const Flower = require('./models/flower.js');

app.get('/flowers', async (req, res) => {
  try {
    const flowers = await Flower.find();
    res.render('flowers/index', { flowers });
  } catch (error) {
    console.error(error);
    res.send('Error displaying flowers');
  }
});

app.get('/flowers/new', (req, res) => {
  res.render('flowers/new');
});

app.post('/flowers', async (req, res) => {
  try {
    await Flower.create(req.body);
    res.redirect('/flowers');
  } catch (error) {
    console.error(error);
    res.send('Error creating flower');
  }
});

app.get('/flowers/:id', async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    res.render('flowers/show', { flower });
  } catch (error) {
    console.error(error);
    res.send('Error displaying flower');
  }
});

app.get('/flowers/:id/edit', async (req, res) => {
  try {
    const flower = await Flower.findById(req.params.id);
    res.render('flowers/edit', { flower });
  } catch (error) {
    console.error(error);
    res.send('Error finding flower to edit');
  }
});

app.put('/flowers/:id', async (req, res) => {
  try {
    await Flower.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/flowers/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.send('Error updating flower');
  }
});

app.delete('/flowers/:id', async (req, res) => {
  try {
    await Flower.findByIdAndDelete(req.params.id);
    res.redirect('/flowers');
  } catch (error) {
    console.error(error);
    res.send('Error deleting flower');
  }
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
