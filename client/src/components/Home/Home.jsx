import React, { useEffect, useState } from "react";
import { Card, Button, Typography } from "@material-tailwind/react";
import { timestampParser } from "../../utils/functions";
const useNavigate = require("react-router-dom").useNavigate;

const Home = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/` + localStorage.getItem("userId")
        );
        const data = await response.json();
        setRegisteredEvents(data.events);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOngoingEvents = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/event/`);
        const data = await response.json();

        setOngoingEvents(
          data.filter((event) => {
            if (
              new Date(event.startDate) < new Date() &&
              new Date(event.endDate) > new Date()
            ) {
              return event;
            }
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchRegisteredEvents();
    fetchOngoingEvents();
  }, []);

  console.log(registeredEvents);

  return (
    <div className="container mx-auto mt-8 text-start">
      <div className="mb-8">
        <Typography variant="h2" color="blue-gray" className="mb-4">
          Registered Events
        </Typography>
        {registeredEvents.length === 0 ? (
          <Typography variant="body" color="gray">
            You haven't registered for any events yet.
          </Typography>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {registeredEvents.map((event) => (
              <Card key={event._id} className="p-4 text-center">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {event.title}
                </Typography>
                <Typography variant="body" color="gray" className="mb-4">
                  {event.description}
                </Typography>
                <div className="flex flex-col gap-2 p-4 text-left">
                  <Typography
                    variant="body"
                    color="gray"
                    className="text-lg font-semibold"
                  >
                    Start Date:{" "}
                    <span className="font-normal">
                      {timestampParser(event.startDate)}
                    </span>
                  </Typography>
                  <Typography
                    variant="body"
                    color="gray"
                    className="text-lg font-semibold"
                  >
                    End Date:{" "}
                    <span className="font-normal">
                      {timestampParser(event.endDate)}
                    </span>
                  </Typography>
                </div>
                <Button
                  color="blue"
                  className="mt-4"
                  onClick={() => navigate(`/events/${event._id}`)}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <Typography variant="h2" color="blue-gray" className="mb-4">
          Ongoing Events
        </Typography>
        {ongoingEvents?.length === 0 ? (
          <Typography variant="body" color="gray">
            There are no ongoing events currently.
          </Typography>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {ongoingEvents.map((event) => (
              <Card key={event._id} className="p-4 text-center">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {event.title}
                </Typography>
                <Typography variant="body" color="gray" className="mb-4">
                  {event.description}
                </Typography>
                <div className="flex flex-col gap-2 p-4 text-left">
                  <Typography
                    variant="body"
                    color="gray"
                    className="text-lg font-semibold"
                  >
                    Start Date:{" "}
                    <span className="font-normal">
                      {timestampParser(event.startDate)}
                    </span>
                  </Typography>
                  <Typography
                    variant="body"
                    color="gray"
                    className="text-lg font-semibold"
                  >
                    End Date:{" "}
                    <span className="font-normal">
                      {timestampParser(event.endDate)}
                    </span>
                  </Typography>
                  <Typography
                    variant="body"
                    color="gray"
                    className="text-lg font-semibold"
                  >
                    Venue:{" "}
                    <span className="font-normal">{event.venue.name}</span>
                  </Typography>
                  <Typography
                    variant="body"
                    color="gray"
                    className="text-lg font-semibold"
                  >
                    Category:{" "}
                    <span className="font-normal">{event.category.name}</span>
                  </Typography>
                </div>
                <Button
                  color="blue"
                  className="mt-4"
                  onClick={() => navigate(`/events/${event._id}`)}
                >
                  View Details
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
