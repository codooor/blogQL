import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

const verifyAdminCredentials = async (username, password) => {
  const admin = await Admin.findOne({ username: username });

  console.log(admin);

  if (!admin) {
    return null;
  }
  const isValid = await bcrypt.compare(password, admin.password);
  console.log(isValid);

  return isValid ? admin : null;
};

export { verifyAdminCredentials };
