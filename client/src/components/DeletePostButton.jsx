import { DELETE_POST } from "../mutations/postMutations.js";
import { GET_POSTS } from "../queries/postQueries.js";
import { useMutation } from "@apollo/client";

export default function DeletePostButton({ postId }) {
  const [deletePost] = useMutation(DELETE_POST, {
    variables: { id: postId },

    refetchQueries: [{ query: GET_POSTS }],
  });

  return (
    <>
      <div className=" mt-5 ms-auto">
        <button
          className="btn btn-sm btn-outline-danger m-2"
          onClick={deletePost}
        >
          Delete Post
        </button>
      </div>
    </>
  );
}
