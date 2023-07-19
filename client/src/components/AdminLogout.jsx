import { useNavigate } from "react-router-dom";

export default function AdminLogout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };
  return (
    <>
      <button onClick={logout}>Logout</button>
    </>
  );
}
