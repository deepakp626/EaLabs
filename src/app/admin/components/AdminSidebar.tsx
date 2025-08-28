"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname(); // ✅ get current path
  const router = useRouter(); // ✅ if you want to navigate programmatically

  const navItems = [
    { name: "Hero Section", path: "/admin/hero-section" },
    { name: "Checkup Packages", path: "/admin/checkup-packages" },
    { name: "Tests By Health", path: "/admin/tests-by-health" },
    { name: "Book Lab Tests", path: "/admin/book-lab-tests" },
    { name: "Partners", path: "/admin/partners" },
    { name: "Reviews ", path: "/admin/reviews " },
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link href={item.path}>
                <span
                  className={`block p-2 rounded hover:bg-gray-700 ${
                    pathname === item.path ? "bg-gray-700" : ""
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;
