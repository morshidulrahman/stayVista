import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItems";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
    </>
  );
};

export default AdminMenu;
