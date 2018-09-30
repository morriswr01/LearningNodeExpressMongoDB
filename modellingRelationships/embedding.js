const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  // author: {
  //   type: authorSchema,
  //   required: true
  // }
  authors: [ authorSchema ]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId);
  // course.author.name = 'Mosh Hamedani';
  // course.save();
  const course = await Course.update( {_id: courseId}, {
    $unset: {
      'author': ''
    }
  });
}


removeAuthor('5bb0b316d956252f0c1d1d5c', '5bb0b316d956252f0c1d1d5a');
// createCourse('Node Course', [
//   new Author({ name: 'Mosh'}),
//   new Author({ name: 'John'})
// ]
// );
// addAuthor('5bb0b316d956252f0c1d1d5c', new Author({name: 'Will'}));
// updateAuthor('5bafa7e52105111da40cb049');