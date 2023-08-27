"use client";
import { Button } from "flowbite-react";
import { fetchCars } from "@utils";
import CarCard from "@components/CarCard";

async function CarsList() {
  const allCars = await fetchCars();
  return (
    <div>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4 items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700 px-3">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Cars
            </h1>
            <Button className="mr-5">Add Cars</Button>
          </div>
        </div>
      </div>
      <div mt-10>
        {allCars ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarsList;
