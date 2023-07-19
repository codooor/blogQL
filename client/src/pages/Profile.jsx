import AdminLogout from "../components/AdminLogout";
import AddPostButton from "../components/AddPostButton";

export default function Profile() {
  return (
    <>
      <div className="container">
        <h1>Profile</h1>
        <main>
          <p>You have successfully accessed the profile page</p>
          <AddPostButton />
        </main>
      </div>
      <AdminLogout />
    </>
  );
}
