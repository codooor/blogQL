import AdminLogin from "../components/AdminLogin";

export default function Login({ onLogin }) {
  return (
    <div className="container">
      <AdminLogin onLogin={onLogin} />
    </div>
  );
}
