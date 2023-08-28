"use client";

import CustomButton from "./CustomButton";
import { Label, TextInput, Spinner, Select } from "flowbite-react";
import { BsArrowDownUp } from "react-icons/bs";
import { useState } from "react";
import { db } from "@firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { locations } from "@constants";

interface carDetail {
  name: string;
}
function BookingForm(carName: carDetail) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleLocationChange = (e) => {
    setFrom(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCar = carName.name;
    try {
      // Send data to Firestore
      setLoading(true);
      const docRef = await addDoc(collection(db, "bookings"), {
        name,
        contact,
        to,
        from,
        date,
        time,
        selectedCar,
        timeStamp: Timestamp.now(),
      });
      console.log("Document written with ID :", docRef.id);

      // Clear form fields
      setName("");
      setContact("");
      setTo("");
      setDate("");
      setTime("");
      setFrom("");
      console.log("Data submitted successfully.");
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting data:", error);
      setError(true);
      setLoading(false);
    }
  };
  return loading ? (
    <div className="text-center">
      <Spinner />
    </div>
  ) : isSuccess ? (
    <div>
      <p>
        Booking Successfully Done !! <br /> Booking and car details will be
        shared soon with you on your WhatsApp ! <br /> Thankyou
      </p>
    </div>
  ) : isError ? (
    <p>Opps Error in booking </p>
  ) : (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="personal_info flex  gap-2">
          <div className="name_input w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              id="name"
              placeholder="Enter your name"
              required
              type="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="contact_input w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="contact" value="Your Contact No." />
            </div>
            <TextInput
              id="contact"
              placeholder="Enter your WhatsApp contact"
              required
              type="input"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="from" value="From" />
        </div>
        <Select onChange={handleLocationChange} id="location" required>
          <option value="" disabled selected>
            Select Starting City
          </option>
          {locations.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
        {/* <TextInput
          id="from"
          disabled
          type="input"
          placeholder="INDORE"
          value={from}
        /> */}
      </div>
      <BsArrowDownUp className="m-auto" />
      <div>
        <div className="mb-2 block">
          <Label htmlFor="to" value="TO" />
        </div>
        <TextInput
          id="to"
          required
          placeholder="Enter your destination"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="date" value="Date" />
        </div>
        <TextInput
          id="date"
          required
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="time" value="Time" />
        </div>
        <TextInput
          id="time"
          required
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <CustomButton
        title="Book Now"
        btnType="submit"
        containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
        textStyles="text-white text-[14px] leading-[17px] font-bold"
      />
    </form>
  );
}

export default BookingForm;
