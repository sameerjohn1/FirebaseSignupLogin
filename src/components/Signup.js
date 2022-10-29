import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../Firebase";
import "../App.css";
import { async } from "@firebase/util";

const Signup = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(false);
  const handleSubmission = (e) => {
    e.preventDefault();
    if (!value.name || !value.email || !value.pass) {
      setError("Please fill all the fields");
      return;
    }
    setError("");
    setDisable(true);
    // console.log(value);
    createUserWithEmailAndPassword(auth, value.email, value.pass)
      .then(async (res) => {
        setDisable(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: value.name,
        });
        navigate("/");
      })
      .catch((err) => {
        setDisable(false);
        setError(err.message);
      });
  };
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Signup in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a
              href=""
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          action=""
          method="POST"
          onClick={handleSubmission}
        >
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Name"
                onChange={(event) =>
                  setValue((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </div>
            <br />

            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                onChange={(event) =>
                  setValue((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </div>
            <br />

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={(event) =>
                  setValue((prev) => ({ ...prev, pass: event.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <Link to="/login">
              <div className="text-sm">
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Already have an account ?
                  <span style={{ color: "red" }}>Login</span>
                </a>
              </div>
            </Link>
          </div>

          <br />
          <h1 style={{ textAlign: "center", color: "red", fontSize: "20px" }}>
            {error}
          </h1>
          <div>
            <button
              disabled={disable}
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
