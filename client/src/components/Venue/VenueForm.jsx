import React, { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import axios from "axios"; // Assuming you're using axios for API requests
import { toast } from "react-toastify";

const VenueForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/venue/`, {
        name,
        address,
        capacity,
        description,
      });
      console.log("Venue added successfully:", response.data);
      setName("");
      setAddress("");
      setCapacity("");
      setDescription("");
      toast.success("Venue added successfully!");
    } catch (error) {
      toast.error("Error adding venue!", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center mt-40 text-start">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Venue</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="venueName" className="block text-gray-700">
              Venue Name
            </label>
            <Input
              type="text"
              id="venueName"
              placeholder="Enter venue name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div>
            <label htmlFor="venueAddress" className="block text-gray-700">
              Address
            </label>
            <Input
              type="text"
              id="venueAddress"
              placeholder="Enter venue address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div>
            <label htmlFor="venueCapacity" className="block text-gray-700">
              Capacity
            </label>
            <Input
              type="number"
              id="venueCapacity"
              placeholder="Enter venue capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <div>
            <label htmlFor="venueDescription" className="block text-gray-700">
              Description
            </label>
            <Input
              type="text"
              id="venueDescription"
              placeholder="Enter venue description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Button type="submit" color="blue" ripple="light" fullWidth>
            Add Venue
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VenueForm;
