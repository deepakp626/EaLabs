"use client"
import AdminSidebar from './components/AdminSidebar';
import toast, { Toaster } from "react-hot-toast";

// import "@/lib/initDb"; // will run dbConnect() when the app starts

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Toaster position="top-center"  />
      <AdminSidebar />
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;