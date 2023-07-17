import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Admin attempting login with ${formState.username} `);

    navigate("/profile");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-4">
      <form action="submit">
        <fieldset>
          <legend>Admin Login</legend>
          <div className="form-group">
            <input
              value={formState.username}
              onChange={(e) =>
                setFormState({ ...formState, username: e.target.value })
              }
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <input
              value={formState.password}
              onChange={(e) =>
                setFormState({ ...formState, password: e.target.value })
              }
              type="password"
              name="password"
              placeholder="Password"
              className="form-control"
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Access
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
