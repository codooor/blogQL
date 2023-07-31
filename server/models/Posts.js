import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  name: { type: String, required: true },
});

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: authorSchema, required: true },
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
