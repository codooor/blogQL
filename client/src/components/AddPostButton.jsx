import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_POSTS } from "../queries/postQueries.js";
import { ADD_POST } from "../mutations/postMutations.js";
import MarkdownEditor from "./MarkdownEditor";

export default function AddPostButton() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [addPostMutation] = useMutation(ADD_POST, {
    variables: { title, content },
    update(cache, { data: { addPost } }) {
      const { posts } = cache.readQuery({ query: GET_POSTS });

      cache.writeQuery({
        query: GET_POSTS,
        data: { posts: [...posts, addPost] },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return alert("Please fill in all fields");
    }

    addPostMutation(title, content);

    setTitle("");
    setContent("");
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-primary btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#addPostModal"
      >
        Create Post
      </button>

      <div
        className="modal fade"
        id="addPostModal"
        tabIndex="-1"
        aria-labelledby="addPostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{ backgroundColor: "darkSlateGray", color: "silver" }}
          >
            <div className="modal-header">
              <h5 className="modal-title fs-5" id="addPostModalLabel">
                Create A Post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <MarkdownEditor content={content} setContent={setContent} />
                </div>

                <div className="mb-3">
                  {/* <label className="form-label">Author</label> */}
                  {/* <input
                    type="text"
                    className="form-control"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  /> */}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-text btn-border-color-rgb btn-sm"
                >
                  Create Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
