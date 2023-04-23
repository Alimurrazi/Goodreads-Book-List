import mongooseService from '../../common/services/mongoose.service';
const mongoose = mongooseService.getMongoose();
const Schema = mongoose.Schema;
const bookSchema = new Schema(
  {
    _id: String,
    title: String,
    author: String,
    avgRating: Number,
    ratings: Number,
    firstPublished: Number,
    img: String,
    detailsLink: String,
    description: String,
    genres: [String],
  },
  { id: false },
);
const bookModel = mongoose.model('Book', bookSchema);
export default bookModel;
