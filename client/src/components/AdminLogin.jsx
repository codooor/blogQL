import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_LOGIN } from "../mutations/loginMutation";
import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "../utils/constants";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  const [adminLogin] = useMutation(ADMIN_LOGIN);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`event triggered`);

    console.log(`Admin attempting login with ${formState.username} `);

    adminLogin({
      variables: {
        username: formState.username,
        password: formState.password,
      },
    })
      .then((res) => {
        const token = res.data.login.token;
        console.log(`Admin login successful with token ${token}`);

        localStorage.setItem(AUTH_TOKEN, token);
        navigate("/posts");
      })
      .catch((error) => {
        console.error("Error in admin login mutation:", error);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-4">
      <form onSubmit={handleSubmit}>
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
            <button className="btn btn-primary" type="submit">
              Access
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
