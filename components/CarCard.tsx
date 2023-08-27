"use client";

import { useState } from "react";
import Image from "next/image";
import { CarProps } from "@types";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";
import { Badge } from "flowbite-react";
import { db } from "@firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

interface CarCardProps {
  car: CarProps;
  isAdmin: boolean;
}

const CarCard = ({ car, isAdmin }: CarCardProps) => {
  const { category, name, rate, acRate, seater, imageUrl } = car;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="car-card group">
      <div className="car-card__content">
        <h2 className="car-card__content-title">{name}</h2>
        <Badge className="p-1.5 text-sm bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900 group-hover:bg-purple-200 dark:group-hover:bg-purple-300">
          <p>{category}</p>
        </Badge>
      </div>

      <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
        <span className="self-start text-[14px] leading-[17px] font-semibold">
          Rs.
        </span>
        {rate}
        <span className="self-end text-[14px] leading-[17px] font-medium">
          /KM
        </span>
      </p>

      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={car.imageUrl}
          alt="car model"
          fill
          priority
          className="object-contain"
        />
      </div>

      <div className="relative flex w-full mt-2">
        <div className="flex group-hover:invisible w-full justify-around text-grey">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image
              src="/steering-wheel.svg"
              width={20}
              height={20}
              alt="steering wheel"
            />
            <p className="text-[14px] leading-[17px]">₹ {acRate} / KM (A.C)</p>
          </div>
          <div className="car-card__icon">
            <Image src="/tire.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">{seater.toUpperCase()} Seater</p>
          </div>
          {/* <div className="car-card__icon">
            <Image src="/gas.svg" width={20} height={20} alt="seat" />
            <p className="car-card__icon-text">Paterol</p>
          </div> */}
        </div>

        <div className="car-card__btn-container">
          <CustomButton
            title={isAdmin ? "Delete" : "View More"}
            containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[17px] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={
              !isAdmin
                ? () => setIsOpen(true)
                : async () => {
                    try {
                      // Delete the car document from Firestore
                      await deleteDoc(doc(db, "cars", car.id));
                      console.log("Car deleted successfully");
                    } catch (error) {
                      console.error("Error deleting car:", error);
                    }
                  }
            }
          />
        </div>
      </div>

      <CarDetails
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        car={car}
      />
    </div>
  );
};

export default CarCard;
