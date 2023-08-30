// import { CustomButton } from "@components/index";
// import { Label, TextInput, Spinner, Select } from "flowbite-react";
// import { BsArrowDownUp } from "react-icons/bs";
// import { useEffect, useState } from "react";
// import { db } from "@firebase/config";
// import {
//   collection,
//   addDoc,
//   DocumentData,
//   query,
//   onSnapshot,
// } from "firebase/firestore";

// export default function EditBookingForm(selectedData) {
//   console.log(selectedData);
//   const [loading, setLoading] = useState(false);
//   const [isSuccess, setSuccess] = useState(false);
//   const [isError, setError] = useState(false);
//   const [name, setName] = useState(selectedData.name);
//   const [contact, setContact] = useState(selectedData.contact);
//   const [from, setFrom] = useState("INDORE");
//   const [to, setTo] = useState(selectedData.to);
//   const [date, setDate] = useState(selectedData.date);
//   const [time, setTime] = useState(selectedData.time);
//   const [car, setCar] = useState(selectedData.car);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send data to Firestore
//       setLoading(true);
//       const docRef = await addDoc(collection(db, "bookings"), {
//         name,
//         contact,
//         to,
//         date,
//         time,
//         car,
//       });
//       console.log("Document written with ID :", docRef.id);

//       // Clear form fields
//       setName("");
//       setContact("");
//       setTo("");
//       setDate("");
//       setTime("");
//       setCar("");
//       console.log("Data submitted successfully.");
//       setSuccess(true);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error submitting data:", error);
//       setError(true);
//       setLoading(false);
//     }
//   };

//   const [carsList, setCarsList] = useState<DocumentData | []>([]);
//   useEffect(() => {
//     // Subscribe to the "bookings" collection
//     const q = query(collection(db, "cars"));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const bookingData: DocumentData[] = [];
//       snapshot.forEach((car) => {
//         bookingData.push(car.data());
//       });
//       setCarsList(bookingData);
//     });

//     return () => unsubscribe();
//   }, []);

//   return loading ? (
//     <div className="text-center">
//       <Spinner />
//     </div>
//   ) : isSuccess ? (
//     <div>
//       <p>
//         Booking Successfully Done !! <br /> Booking and car details will be
//         shared soon with you on your WhatsApp ! <br /> Thankyou
//       </p>
//     </div>
//   ) : isError ? (
//     <p>Opps Error in booking </p>
//   ) : (
//     <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
//       <div>
//         <div className="personal_info flex  gap-2">
//           <div className="name_input w-1/2">
//             <div className="mb-2 block">
//               <Label htmlFor="name" value="Customer name" />
//             </div>
//             <TextInput
//               id="name"
//               placeholder="Enter Customer name"
//               required
//               type="input"
//               value={selectedData.name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </div>
//           <div className="contact_input w-1/2">
//             <div className="mb-2 block">
//               <Label htmlFor="contact" value="Customer Contact No." />
//             </div>
//             <TextInput
//               id="contact"
//               placeholder="Enter Customer WhatsApp contact"
//               required
//               type="input"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="from" value="From" />
//         </div>
//         <TextInput
//           id="from"
//           disabled
//           type="input"
//           placeholder="INDORE"
//           value={from}
//         />
//       </div>
//       <BsArrowDownUp className="m-auto" />
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="to" value="TO" />
//         </div>
//         <TextInput
//           id="to"
//           required
//           placeholder="Enter Customer destination"
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//         />
//       </div>
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="date" value="Car" />
//         </div>
//         <Select
//           id="car"
//           value={selectedData.car}
//           onChange={(e) =>
//             setEditBookingData((prevData) => ({
//               ...prevData,
//               status: e.target.value,
//             }))
//           }
//           required
//         >
//           {carsList.map((car) => (
//             <option>{car.name}</option>
//           ))}
//         </Select>
//         {/* <TextInput
//           id="date"
//           required
//           value={date}
//           onChange={(e) => setCar(e.target.value)}
//         /> */}
//       </div>
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="date" value="Date" />
//         </div>
//         <TextInput
//           id="date"
//           required
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />
//       </div>
//       <div>
//         <div className="mb-2 block">
//           <Label htmlFor="time" value="Time" />
//         </div>
//         <TextInput
//           id="time"
//           required
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//         />
//       </div>

//       <CustomButton
//         title="Create Booking"
//         btnType="submit"
//         containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
//         textStyles="text-white text-[14px] leading-[17px] font-bold"
//       />
//     </form>
//   );
// }
import { CustomButton } from "@components/index";
import { Label, TextInput, Spinner, Select } from "flowbite-react";
import { useState } from "react";
import { db } from "@firebase/config";
import { doc, updateDoc } from "firebase/firestore";

export default function EditBookingForm({ selectedData, onClose }) {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [to, setTo] = useState(selectedData.to);
  const [date, setDate] = useState(selectedData.date);
  const [time, setTime] = useState(selectedData.time);
  const [selectedCar, setCar] = useState(selectedData.selectedCar);
  const [name, setName] = useState(selectedData.name);
  const [contact, setContact] = useState(selectedData.contact);
  const [status, setStatus] = useState(selectedData.status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to Firestore
      setLoading(true);
      const bookingRef = doc(db, "bookings", selectedData.id);
      await updateDoc(bookingRef, {
        to,
        date,
        time,
        selectedCar,
        name,
        contact,
        status,
      });
      console.log("Document Edited successfully.");

      // Clear form fields
      setTo("");
      setDate("");
      setTime("");
      setCar("");
      setName("");
      setContact("");
      setSuccess(true);
      setLoading(false);
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating data:", error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div>
          <div className="personal_info flex  gap-2">
            <div className="name_input w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Customer name" />
              </div>
              <TextInput
                id="name"
                placeholder="Enter Customer name"
                required
                type="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="contact_input w-1/2">
              <div className="mb-2 block">
                <Label htmlFor="contact" value="Customer Contact No." />
              </div>
              <TextInput
                id="contact"
                placeholder="Enter Customer WhatsApp contact"
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
            <Label htmlFor="to" value="Destination" />
          </div>
          <TextInput
            id="to"
            required
            placeholder="Enter Customer destination"
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="car" value="Car" />
          </div>
          <TextInput
            id="car"
            value={selectedCar}
            onChange={(e) => setCar(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="Status" value="Status" />
          </div>
          <Select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option>Pending</option>
            <option>Booked</option>
            <option>Complete</option>
          </Select>
        </div>
        <CustomButton
          title="Update Booking"
          btnType="submit"
          containerStyles="w-full py-[16px] rounded-full bg-primary-blue mt-4"
          textStyles="text-white text-[14px] leading-[17px] font-bold"
        />
      </div>
    </form>
  );
}
