import PostsData from "../components/PostsData";
import AddPostButton from "../components/AddPostButton";

export default function Posts() {
  return (
    <>
      <div className="container mt-2">
        <AddPostButton />
        <div className=" m-4 p-0">
          <PostsData />
        </div>
      </div>
    </>
  );
}
