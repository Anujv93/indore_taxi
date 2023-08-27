import { db } from "@firebase/config";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { Select } from "flowbite-react";

function AddCarForm({ onClose }) {
  const [isLoading, setisLoading] = useState(false);
  const [acRate, setAcRate] = useState("");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [seater, setSeater] = useState("");
  const [imageAsFile, setImageAsFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState("");

  const handleCategoryChange = (e) => {
    console.log("Selected car:", e.target.value);
    setCategory(e.target.value);
  };

  const categoryList = ["SEDAN", "MUV", "SUV", "BUS", "LUXURY"];

  const handleFireBaseUpload = async () => {
    setisLoading(true);
    if (!imageAsFile) {
      console.error("No image selected");
      return;
    }

    const storage = getStorage();
    const storageRef = ref(storage, `/images/${imageAsFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageAsFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Error during upload:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImgUrl(downloadURL);
          console.log(imgUrl);
          handleSubmit(downloadURL); // Move the submit action here
        });
      }
    );
    setisLoading(false);
  };

  const handleSubmit = async (imageUrl) => {
    const carData = {
      acRate,
      category,
      name,
      rate,
      seater,
      imageUrl,
      timeStamp: Timestamp.now(),
    };
    console.log(carData);

    const carsCollection = collection(db, "cars");
    await addDoc(carsCollection, carData);

    onClose();
  };

  return (
    <div>
      <form>
        <div className="mb-4">
          <label htmlFor="acRate" className="block text-gray-700">
            AC Rate
          </label>
          <input
            type="text"
            id="acRate"
            className="mt-1 p-2 w-full border rounded-md"
            value={acRate}
            onChange={(e) => setAcRate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <Select onChange={handleCategoryChange} id="cars" required>
            <option value="" disabled selected>
              Select Car
            </option>
            {categoryList.map((car) => (
              <option key={car} value={car}>
                {car}
              </option>
            ))}
          </Select>
          {/* <input
            type="text"
            id="category"
            className="mt-1 p-2 w-full border rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          /> */}
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 p-2 w-full border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rate" className="block text-gray-700">
            Rate
          </label>
          <input
            type="text"
            id="rate"
            className="mt-1 p-2 w-full border rounded-md"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="seater" className="block text-gray-700">
            Seater
          </label>
          <input
            type="text"
            id="seater"
            className="mt-1 p-2 w-full border rounded-md"
            value={seater}
            onChange={(e) => setSeater(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageFile" className="block text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="imageFile"
            className="mt-1 p-2 w-full border rounded-md"
            accept="image/*"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) {
                setImageAsFile(selectedFile);
              }
            }}
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
            type="button"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={handleFireBaseUpload}
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCarForm;
