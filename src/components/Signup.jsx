/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/Auth";
import { login } from "../store/AuthSlice";
import { Input, Logo, Button } from "./Index";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit } = useForm();

  const createNewAccount = async (data) => {
    setErrorMsg("");
    try {
      const account = await authService.createAccount(data);
      if (account) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setErrorMsg(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {errorMsg && <p className=" text-red-600 text-center">{errorMsg}</p>}

        <form onSubmit={handleSubmit(createNewAccount)}>
            <div className=" space-y-5">

           
            <Input
            label = " Full Name"
            name=" Full name"
            type="text"
            placeholder=" Enter Your Full Name"
            {
                ...register("name", {
                    required: true
                })
            }
            />
             <Input
            label = " Email"
            name="email"
            type="email"
            placeholder = "Enter your email"
            {
                ...register("email",{
                    required: true,
                    validate: {
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })
            }
            />
             <Input
            label = "password"
            name="password"
            placeholder = "Enter your password"
            type = "password"
            {...register("password",{
                required: true,
            }
            )}
            />
            <Button type = "submit" className = " w-full">create Account</Button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
