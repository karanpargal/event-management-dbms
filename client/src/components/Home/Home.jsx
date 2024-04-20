import React, { useEffect, useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import { timestampParser } from "../../utils/functions";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/event");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto mt-8 text-start">
      <Typography variant="h2" color="blue-gray" className="mb-8">
        Current Events
      </Typography>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event._id} className="p-4 text-center">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {event.title}
            </Typography>
            <Typography variant="body" color="gray" className="mb-4">
              {event.description}
            </Typography>
            <div className="flex flex-col gap-2 p-4 text-left">
              <Typography variant="body" color="gray" className="text-lg font-semibold">
                Date:{" "}
                <span className="font-normal">
                  {" "}
                  {timestampParser(event.startDate)} -{" "}
                  {timestampParser(event.endDate)}
                </span>
              </Typography>
              <Typography variant="body" color="gray" className="text-lg font-semibold">
                Venue: <span className="font-normal">{event.venue.name}</span>
              </Typography>
              <Typography variant="body" color="gray" className="text-lg font-semibold">
                Category: <span className="font-normal">{event.category.name}</span>
              </Typography>
              <Typography variant="body" color="gray" className="text-lg font-semibold">
                Organizer: <span className="font-normal">{event.organizer.username}</span> 
              </Typography>
            </div>
            <Button color="blue" className="mt-4">
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Events;
