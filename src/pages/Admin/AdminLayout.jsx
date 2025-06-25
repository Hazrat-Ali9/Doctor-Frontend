import { Outlet } from 'react-router-dom';
import Navbar from './AdminNavbar';


const AdminLayout = () => {
  return (
    <div>
      {/* You can add any specific admin layout components here */}
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
