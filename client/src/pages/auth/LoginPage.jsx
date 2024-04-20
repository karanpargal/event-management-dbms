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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {
        email,
        password,
      });
      if (res.status === 200) {
        setEmail("");
        setPassword("");
        localStorage.setItem("userId", res.data._id);
        toast.success("User logged in successfully!");
        window.location.href = "/home";
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-svh text-left">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Welcome back! Enter your credentials to sign in.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Username
              </Typography>
              <Input
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                placeholder="Enter your email"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Password
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="Enter your password"
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
                  Remember me
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button className="mt-6" fullWidth onClick={handleLogin} color="blue">
              Sign In
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Don't have an account?{" "}
              <a href="#" className="font-medium text-gray-900">
                Sign Up
              </a>
            </Typography>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
