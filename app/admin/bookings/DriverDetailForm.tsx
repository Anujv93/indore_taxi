import { db } from "@firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
function DriverDetailForm({ onClose, selectedData }) {
  // State for form fields
  const [car, setCar] = useState(selectedData.selectedCar);
  const [category, setCategory] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverNumber, setMobileNumber] = useState("");
  console.log(car);
  // Handler for form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const docRef = doc(db, "bookings", selectedData.id);
    await updateDoc(docRef, {
      vehicleNumber,
      driverName,
      driverNumber,
      car,
      category,
      status: "Booked",
    })
      .then(() => {
        alert("Bookings updated successfully");
      })
      .catch((e) => {
        alert(`Error while creating booking ${e.message} `);
      });
    onClose();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="driverName" className="block text-gray-700">
            Car
          </label>
          <input
            type="text"
            id="driverName"
            className="mt-1 p-2 w-full border rounded-md"
            value={selectedData.selectedCar}
            onChange={(e) => setCar(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="driverName" className="block text-gray-700">
            Car Category
          </label>
          <input
            type="text"
            id="driverName"
            className="mt-1 p-2 w-full border rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="vehicleNumber" className="block text-gray-700">
            Vehicle Number
          </label>
          <input
            type="text"
            id="vehicleNumber"
            className="mt-1 p-2 w-full border rounded-md"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="driverName" className="block text-gray-700">
            Driver Name
          </label>
          <input
            type="text"
            id="driverName"
            className="mt-1 p-2 w-full border rounded-md"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="driverNumber" className="block text-gray-700">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobileNumber"
            className="mt-1 p-2 w-full border rounded-md"
            value={driverNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default DriverDetailForm;
