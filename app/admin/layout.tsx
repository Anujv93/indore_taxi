import "./style.css";
import { Providers } from "@app/provider";
import AdminSidebar from "@components/sidebar/SideBar";
import { useSelector } from "react-redux";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <section>
        <div className="main_container">
          <div className="sidebar_container h-[100vh]">
            <AdminSidebar />
          </div>
          <div className="body_container overflow-y-auto">{children}</div>
        </div>
      </section>
    </Providers>
  );
}
