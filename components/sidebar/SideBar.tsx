"use client";
import { logout, selectUser } from "@feature/userSlice";
import "./sidebar.css";

import { Sidebar } from "flowbite-react";
import { HiInbox, HiShoppingBag, HiViewBoards } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { CustomButton } from "@components/index";
import { auth } from "@firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminSidebar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize the router
  const handleLogout = () => {
    auth.signOut().then(() => {
      dispatch(logout());
    });
    console.log("Logged Out");
  };
  useEffect(() => {
    if (!user) {
      console.log("Logged Out");
      router.push("/auth"); // Use the router to navigate
    }
  }, [user, router]);
  return (
    <Sidebar>
      <Sidebar.Items className="sidebar_item_container">
        <Sidebar.ItemGroup className="sidebar_item_group">
          <Sidebar.Collapse icon={HiShoppingBag} label="E-commerce">
            <Sidebar.Item href="#">Products</Sidebar.Item>
            <Sidebar.Item href="#">Sales</Sidebar.Item>
            <Sidebar.Item href="#">Refunds</Sidebar.Item>
            <Sidebar.Item href="#">Shipping</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item href="/admin/cars" icon={HiViewBoards}>
            <p>Cars</p>
          </Sidebar.Item>
          <Sidebar.Item href="/admin/bookings" icon={HiInbox}>
            <p>Bookings</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup className="sidebar_item_group">
          <Sidebar.Item>{user?.userEmail}</Sidebar.Item>
          <Sidebar.CTA className="p-0">
            {/* <button
              onClick={() => auth.signOut()}
              className="w-full h-full  bg-blue-600 p-3 rounded-md text-white"
            >
              Logout
            </button> */}
            {/* <button
              onClick={() => {
                auth.signOut().then(() => {
                  dispatch(logout());
                });
                console.log("Logged Out");
              }}
            >
              Signout
            </button> */}
            <CustomButton
              title="Log Out"
              containerStyles="w-full py-[16px] bg-primary-blue rounded-mb"
              textStyles="text-white text-[14px] leading-[17px] font-bold"
              handleClick={handleLogout}
            />
          </Sidebar.CTA>
          {/* <Sidebar.Item
            className='p-0 px-0 sidebar_cta_button'
          >
            <Button className='w-full p-0 cta_button'>LogOut</Button>
          </Sidebar.Item> */}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
