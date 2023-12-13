"use client";
import { HomeProps } from "@types";
import { CarCard, Hero, Footer, NavBar } from "@components/index";
import { useEffect, useState } from "react";
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@firebase/config";
import MapDetail from "@components/MapBox";

export default function Home({ searchParams }: HomeProps) {
  const [allCars, setallCars] = useState<DocumentData | []>([]);
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    setisLoading(true);

    const q = query(collection(db, "cars"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const carData: DocumentData = [];
      snapshot.forEach((car) => {
        carData.push({ id: car.id, ...car.data() });
      });

      // Custom sorting function based on category order: sedan, MUV, bus, luxury
      const sortedCars = carData.sort((a, b) => {
        const categoryOrder = ["SEDAN", "MUV", "SUV", "BUS", "LUXURY"];
        return (
          categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category)
        );
      });

      setallCars(sortedCars);
      setisLoading(false);
    });

    return () => unsubscribe();
  }, []);
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <div>
      <main className="overflow-hidden">
        <NavBar></NavBar>
        <Hero />

        <div className="mt-12 padding-x padding-y max-width" id="discover">
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
            <p>Explore out cars you might like</p>
          </div>

          {/* <div className="home__filters">
            <SearchBar />

            <div className="home__filter-container">
              <CustomFilter title="fuel" options={fuels} />
              <CustomFilter title="year" options={yearsOfProduction} />
            </div>
          </div> */}

          {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => (
                  <CarCard car={car} isAdmin={false} />
                ))}
              </div>
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            </div>
          )}
        </div>
        <MapDetail />
      </main>
      <Footer />
    </div>
  );
}
