"use client";
import { CarCard } from "@components/index";
import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  DocumentData,
} from "firebase/firestore";
import { db } from "@firebase/config";
import AddCarForm from "./AddCarForm";

export default function Car() {
  const [isLoading, setisLoading] = useState(false);
  const [cars, setCars] = useState<DocumentData | []>([]);
  const [openModal, setOpenModal] = useState<String | null>();
  const openAddProductModal = () => {
    setOpenModal("addCar");
  };

  const closeAddProductModal = () => {
    setOpenModal(undefined);
  };

  useEffect(() => {
    setisLoading(true);
    // Subscribe to the "bookings" collection
    const q = query(collection(db, "cars"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingData: DocumentData = [];
      snapshot.forEach((car) => {
        bookingData.push({ id: car.id, ...car.data() });
      });
      setCars(bookingData);
      setisLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <main className="overflow-hidden">
        <div>
          <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full mb-1">
              <div className="mb-4 items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700 px-3">
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                  Cars
                </h1>
                <Button className="mr-5" onClick={openAddProductModal}>
                  Add Car
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="padding-x padding-y max-width" id="discover">
          {cars ? (
            <section>
              <div className="home__cars-wrapper">
                {cars?.map((car) => (
                  <CarCard key={car.id} car={car} isAdmin={true} />
                ))}
              </div>
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            </div>
          )}
        </div>
      </main>
      <Modal
        dismissible
        show={openModal === "addCar"}
        onClose={closeAddProductModal}
        className="modal_class rounded-lg shadow-md "
      >
        <Modal.Header>Create Booking</Modal.Header>
        <Modal.Body>
          <div className="m-auto">
            <AddCarForm onClose={closeAddProductModal} />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
