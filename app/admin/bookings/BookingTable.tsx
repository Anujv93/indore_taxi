"use client";
import { Table, Badge, Dropdown, Spinner, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { db } from "@firebase/config";
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import EditBookingForm from "./EditBooking";
import DriverDetailForm from "./DriverDetailForm";

export default function BookingTable() {
  const [editBookingData, setEditBookingData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [bookings, setBookings] = useState<DocumentData | []>([]);
  const [openModal, setOpenModal] = useState<String | null>(null); // Set this state

  const openEditBookingModal = () => {
    setOpenModal("editBooking");
  };
  const openDriverForm = () => {
    setOpenModal("driverDetail");
  };

  const closeEditBookingModal = () => {
    setOpenModal(null);
  };

  const closeDriverDetailModal = () => {
    setOpenModal(null);
  };
  useEffect(() => {
    setisLoading(true);
    // Subscribe to the "bookings" collection
    const q = query(collection(db, "bookings"), orderBy("timeStamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingData: DocumentData = [];
      snapshot.forEach((booking) => {
        bookingData.push({ id: booking.id, ...booking.data() });
      });
      setBookings(bookingData);
      setisLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Customer</Table.HeadCell>
          <Table.HeadCell>Destination</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Driver Details</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {isLoading ? (
            <Spinner size="lg" className="text-center" />
          ) : (
            bookings.map((booking) => (
              <Table.Row
                key={booking.id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium ">
                  <div className="verticle_data  ">
                    <p className="ml-2 text-gray-900 mb-1 dark:text-white">
                      {booking.name}
                    </p>
                    <p className="sub_data">+91 {booking.contact}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="verticle_data">
                    <p className="text-gray-900 mb-1 dark:text-white">
                      {booking.to}
                    </p>
                    <p className="sub_data">INDORE ({booking.selectedCar})</p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="verticle_data">
                    <p className="text-gray-900 mb-1 dark:text-white">
                      {booking.date}
                    </p>
                    <p className="sub_data">{booking.time}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="verticle_data">
                    <p className="text-gray-900 mb-1 dark:text-white">
                      {booking.driverName ?? "N/A"}
                    </p>
                    <p className="sub_data">{booking.driverNumber ?? "N/A"}</p>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="flex justify-start content-center">
                    <Badge
                      color={
                        booking.status === "Booked" ? "success" : "failure"
                      }
                    >
                      {booking.status ?? "Pending"}
                    </Badge>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown label="Action" size="sm">
                    <Dropdown.Item
                      onClick={() => {
                        openDriverForm();
                        setEditBookingData(booking);
                      }}
                    >
                      Create Booking
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        openEditBookingModal();
                        setEditBookingData(booking);
                      }}
                    >
                      Edit Booking
                    </Dropdown.Item>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
      <Modal
        dismissible
        show={openModal === "editBooking"}
        onClose={closeEditBookingModal}
        className="modal_class rounded-lg shadow-md "
      >
        <Modal.Header>Edit Booking</Modal.Header>
        <Modal.Body>
          <div className="m-auto">
            <EditBookingForm
              selectedData={editBookingData}
              onClose={closeEditBookingModal}
            />
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        dismissible
        show={openModal === "driverDetail"}
        onClose={closeDriverDetailModal}
        className="modal_class rounded-lg shadow-md"
      >
        <Modal.Header>Add Driver Details</Modal.Header>
        <Modal.Body>
          <div className="m-auto">
            <DriverDetailForm
              onClose={closeDriverDetailModal}
              selectedData={editBookingData}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
