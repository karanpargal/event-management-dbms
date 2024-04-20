import React, { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import axios from "axios";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`, {
        username,
        email,
        password,
      });
      if(res.status === 201){
        setUsername("");
        setEmail("");
        setPassword("");
        toast.success("User registered successfully!");
        window.location.href = "/home";
      }
    } catch (err) {
      console.log(err);
      toast.error("User registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 text-left">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Nice to meet you! Enter your details to register.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Username
              </Typography>
              <Input
                size="lg"
                placeholder="john_doe"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Email
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none ",
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button
              className="mt-6"
              fullWidth
              onClick={() => {
                handleRegister();
              }}
            >
              Sign Up
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <a href="/login" className="font-medium text-gray-900 underline underline-offset-2">
                Sign In
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationPage;
