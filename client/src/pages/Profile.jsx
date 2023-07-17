export default function Profile() {
  return (
    <>
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center m-4">
          <form action="submit">
            <fieldset>
              <legend>Admin Login</legend>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                />
              </div>
              <div className="text-center">
                <button className="btn btn-primary">Access Page</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
