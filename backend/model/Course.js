const mongoose = require("mongoose");

const LearnSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const BuildSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
});

const InnovateSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
});

const ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  school: {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  review: {
    type: String,
    required: true,
  },
});

const OutcomesByTopicsSchema = {
  learns: {
    topics: [String],
    remainingCount: Number,
  },
  builds: {
    topics: [String],
    remainingCount: Number,
  },
  innovates: {
    topics: [String],
    remainingCount: Number,
  },
};

const OutcomeSchema = new mongoose.Schema({
  outcome: String,
});

const FaqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const CourseSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CourseGroup",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["", "beginner", "intermediate", "advanced"],
    default: "",
  },
  preReq: {
    type: String,
    default: "",
  },
  isWorkshop: {
    type: Boolean,
    default: false,
  },
  durationInHours: {
    type: Number,
    min: 1,
    required: true,
  },
  NoOfWeeks: {
    type: Number,
    required: true,
  },
  hoursPerWeek: {
    type: Number,
    required: true,
  },
  price: {
    currency: {
      type: String,
      enum: ["$", "₹"],
      default: "₹",
    },
    currencyCode: {
      type: String,
      enum: ["USD", "INR"],
      default: "INR",
    },
    amount: {
      type: Number,
      required: true,
    },
    amountAfterDiscount: {
      type: Number,
    },
  },
  overview: {
    type: String,
    required: true,
  },
  detailedView: {
    type: String,
    required: true,
  },
  learns: [LearnSchema],
  builds: [BuildSchema],
  innovates: [InnovateSchema],
  outcomesByTopics: OutcomesByTopicsSchema,
  courseImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  courseStructure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
  },
  curriculumPDF: String,
  outcomes: [OutcomeSchema],
  instructors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  reviews: [ReviewSchema],
  gradeRange: {
    minG: {
      type: Number,
      required: true,
    },
    maxG: {
      type: Number,
      required: true,
    },
  },
  faqs: [FaqSchema],
  totalClasses: {
    type: Number,
  },
  websiteEnabled: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
