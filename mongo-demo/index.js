const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...)', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
    name: 'Node.js Course',
    author: 'Dosh',
    tags: ['angular', 'backend'],
    isPublished: true
    });
    const result = await course.save();
    console.log(result);
}
createCourse();

async function getCourses() {
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    // eq (equal0, ne, gt, gte, lt, lte, in, nin
    // or and
    // .find({ price: { $gt: 10, $lte: 20 }})
    // .find({ price: { $in: [10,15,20] } })//Price is 10 15 or 20
    // .find()
    // .or([ { author:'Mosh'}, {isPublished: true}])
    // .and([ { author:'Mosh'}, {isPublished: true}])

    //Regular expressions, starts with mosh
    // .find({ author: /^Mosh/ })
    //Ends with Hamedani(case insensitive)
    // .find({ author: /Hamedani$/i })
    //courses with author containing mosh
    // .find({ author: /.*Mosh.*/i })
    const courses = await Course
    .find( { author: 'Mosh', isPublished: true } )
    .skip((pageNumber - 1) * pageSize)//skip all documents before page 2
    .limit(pageSize)
    .sort({name: 1})
    // .select({name: 1, tags: 1});
    //Count number of returned courses
    .countDocuments();
    console.log(courses);
}
// getCourses();

async function updateCourse(id) {
    //approach 1
    // const course = await Course.findById(id);
    // if (!course) return;
    // course.isPublished = true;
    // course.author = 'Another author';
    // const result = await course.save();
    // console.log(course);
    
    // approach 2
    // const result = await Course.updateMany({ _id: id}, {
    //     $set: {
    //         author: 'Mosh',
    //         isPublished: false
    //     }
    // });
    // console.log(result);
    
    //approach 3
    const course = await Course.findOneAndUpdate( id, {
        $set: {
            author: 'Json',
            isPublished: true
        }
    }, {new: true});
    console.log(course);

}
// updateCourse('5b9fe01185adaa2510fae2c4');

async function removeCourse(id) {
    // const result = await Course.deleteOne({_id: id});
    const course = await Course.findByIdAndDelete(id);
    console.log(course);
    
}
removeCourse('5b9fe01185adaa2510fae2c4');