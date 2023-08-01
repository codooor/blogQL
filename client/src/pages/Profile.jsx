import AddPostButton from "../components/AddPostButton";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ handleLogout, isLoggedIn }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isLoggedIn value in useEffect: ", isLoggedIn);
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <div>
      <p>This worked</p>
      <AddPostButton />
    </div>
  );
}
