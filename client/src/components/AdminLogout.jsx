import { useNavigate } from "react-router-dom";

export default function AdminLogout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth-token");

    console.log(`Succesfully logged out`);
    navigate("/");
  };
  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
}
