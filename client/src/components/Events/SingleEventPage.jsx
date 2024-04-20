import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { timestampParser } from "../../utils/functions";
import { toast } from "react-toastify";
import axios from "axios";

const SingleEventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [eventFeedback, setEventFeedback] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/event/${eventId}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/feedback/event/${eventId}`
        );
        setEventFeedback(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (event && new Date(event.endDate) < new Date()) {
      fetchFeedback();
    }
  }, [eventId, event]);

  const handleBookTicket = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/participate`, {
        eventId: event._id,
        userId: localStorage.getItem("userId"),
      });
      console.log(res.data);
      toast.success("Ticket booked successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to book ticket");
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/feedback`, {
        eventId: event._id,
        userId: localStorage.getItem("userId"),
        comment: feedback,
        rating: rating,
      });
      console.log(res.data);
      toast.success("Feedback submitted successfully");
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <div className="container mx-auto mt-8 text-start">
      {event ? (
        <Card className="p-8">
          <Typography variant="h2" color="blue-gray" className="mb-4">
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
              Venue: <span className="font-normal">{event.venue.name}</span>
            </Typography>
            <Typography
              variant="body"
              color="gray"
              className="text-lg font-semibold"
            >
              Category:{" "}
              <span className="font-normal">{event.category.name}</span>
            </Typography>
            <Typography
              variant="body"
              color="gray"
              className="text-lg font-semibold"
            >
              Organizer:{" "}
              <span className="font-normal">{event.organizer.username}</span>
            </Typography>
            <Typography
              variant="body"
              color="gray"
              className="text-lg font-semibold"
            >
              Participants: {event.participants.length}
            </Typography>
          </div>
          <Button
            color="blue"
            className="mt-4"
            onClick={handleBookTicket}
            disabled={event.participants.includes(
              localStorage.getItem("userId")
            )}
          >
            {event.participants.includes(localStorage.getItem("userId"))
              ? "Ticket Booked"
              : "Book Ticket"}
          </Button>
          {new Date(event?.endDate) < new Date() &&
            event.participants.includes(localStorage.getItem("userId")) &&
            !feedbackSubmitted && (
              <div className="mt-4">
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  Leave Feedback
                </Typography>
                <Input
                  type="number"
                  placeholder="Rating (1-5)"
                  label="Rating (1-5)"
                  value={rating}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                  fullWidth
                  max={5}
                  min={0}
                />
                <Textarea
                  placeholder="Your feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  fullWidth
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 my-4"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Button color="blue" onClick={handleFeedbackSubmit}>
                  Submit Feedback
                </Button>
              </div>
            )}
          {eventFeedback.length > 0 && (
            <div className="mt-8">
              <Typography variant="h4" color="blue-gray" className="mb-4">
                Event Feedback
              </Typography>
              {eventFeedback.map((feedback, index) => (
                <div key={index} className="mb-4">
                  <Typography variant="body" color="gray">
                    <strong>Rating:</strong> {feedback.rating}
                  </Typography>
                  <Typography variant="body" color="gray">
                    <strong>Comment:</strong> {feedback.comment}
                  </Typography>
                  <Typography variant="body" color="gray">
                    <strong>User:</strong> {feedback.user.username}
                  </Typography>
                </div>
              ))}
            </div>
          )}
        </Card>
      ) : (
        <Typography variant="body" color="gray">
          Loading...
        </Typography>
      )}
    </div>
  );
};

export default SingleEventPage;
