import React, { useState, useEffect } from "react";
import { Input, Button, Option, Select } from "@material-tailwind/react";
import axios from "axios";
import { toast } from "react-toastify";

const AddEventPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [venueOptions, setVenueOptions] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchVenues();
    fetchCategories();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/venue`);
      setVenueOptions(response.data);
      console.log("Venues:", response.data);
    } catch (error) {
      console.error("Error fetching venues:", error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/category`);
      setCategoryOptions(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/event`, {
        title,
        description,
        startDate,
        endDate,
        venueId: selectedVenue,
        categoryId: selectedCategory,
        organizerId: "6622d9d6d5e3e55602886166",
      });
      console.log("Event added successfully:", response.data);
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setSelectedVenue("");
      setSelectedCategory("");
      toast.success("Event added successfully!");
    } catch (error) {
      toast.error("Error adding event!", error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg mt-28 shadow-lg">
      <h2 className="text-2xl font-bold mb-8">Add New Event</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
        <Input
          type="text"
          label="Event Title"
          placeholder="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          className="mb-4"
        />
        <Input
          type="text"
          label="Event Description"
          placeholder="Event Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          className="mb-4"
        />
        <Input
          type="datetime-local"
          label="Start Date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          required
          className="mb-4"
        />
        <Input
          type="datetime-local"
          label="End Date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          required
          className="mb-4"
        />
        <Select
          size="md"
          label="Select Venue"
          value={selectedVenue}
          onChange={(value) => setSelectedVenue(value)}
          fullWidth
          className="mb-4"
        >
          {venueOptions.map((venue) => (
            <Option key={venue._id} value={venue._id}>
              {venue.name}
            </Option>
          ))}
        </Select>
        <Select
          size="md"
          label="Select Category"
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          fullWidth
          className="mb-4"
        >
          {categoryOptions.map((category) => (
            <Option key={category._id} value={category._id}>
              {category.name}
            </Option>
          ))}
        </Select>
        <Button type="submit" color="blue" ripple="light" fullWidth>
          Add Event
        </Button>
      </form>
    </div>
  );
};

export default AddEventPage;
