"use client";
import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState, useEffect } from "react";

import BookingTable from "./BookingTable";
import AdminBookingForm from "./BookingForm";
import { selectUser } from "@feature/userSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

function Booking() {
  const user = useSelector(selectUser);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    if (!user) {
      console.log("Logged Out");
      router.push("/auth"); // Use the router to navigate
    }
  }, [user, router]);
  const [openModal, setOpenModal] = useState<String | null>(null);

  const openAddProductModal = () => {
    setOpenModal("addProduct");
  };

  const closeAddProductModal = () => {
    setOpenModal(null);
  };
  return (
    <div>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4 items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700 px-3">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Bookings
            </h1>
            <Button className="mr-5" onClick={openAddProductModal}>
              Create Booking
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <BookingTable />
            </div>
          </div>
        </div>
      </div>
      <Modal
        dismissible
        show={openModal === "addProduct"}
        onClose={closeAddProductModal}
        className="modal_class rounded-lg shadow-md "
      >
        <Modal.Header>Create Booking</Modal.Header>
        <Modal.Body>
          <div className="m-auto">
            <AdminBookingForm />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Booking;
