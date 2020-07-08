import { db } from './index.js';

const schema = db.mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  }
});

const gradeSchema = db.mongoose.model('grade', schema);

export default gradeSchema;