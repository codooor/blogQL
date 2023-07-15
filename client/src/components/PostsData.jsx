import { useQuery } from "@apollo/client";
import { GET_POSTS } from "../queries/postQueries";
import DeletePostButton from "./DeletePostButton";
import ReadMore from "./ReadMore";
import { marked } from "marked";

export default function PostsData() {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p> "Error" : {error.message}</p>;

  const renderMarkdown = (markdown) => {
    var rawMarkup = marked(markdown, { sanitize: true });
    return { __html: rawMarkup };
  };

  return (
    <>
      {data.posts.map((post) => (
        <div key={post.id}>
          <div className="container justify-content-center  m-2">
            <div className="row align-items-start">
              <div className="col">
                <h6 className="text-center">{post.title}</h6>
                <hr className="m-0" />

                <ReadMore>{post.content}</ReadMore>
                <DeletePostButton
                  type="button"
                  className="btn btn-outline-danger btn-sm "
                  postId={post.id}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
