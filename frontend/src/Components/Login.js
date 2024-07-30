import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormdata] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login Func", formData);
    let responseData;
    await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  const signup = async () => {
    console.log("SignUp Func", formData);
    let responseData;
    await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="w-full min-h-screen bg-blue-100 pt-24">
      <div className="w-11/12 max-w-lg bg-white mx-auto p-8 box-border">
        <h1 className="my-4 text-2xl font-semibold">{state}</h1>
        <div className="flex flex-col gap-6 mt-5">
          {state === "Sign Up" && (
            <input
              name="username"
              value={formData.username}
              onChange={changeHandler}
              type="text"
              placeholder="Your Name"
              className="h-16 w-full pl-5 border border-gray-300 outline-none text-gray-600 text-lg box-border"
            />
          )}
          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Address"
            className="h-16 w-full pl-5 border border-gray-300 outline-none text-gray-600 text-lg box-border"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            className="h-16 w-full pl-5 border border-gray-300 outline-none text-gray-600 text-lg box-border"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
          className="w-full h-16 bg-blue-600 text-white mt-8 border-none text-xl font-medium cursor-pointer"
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="mt-5 text-gray-600 text-lg font-medium">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-5 text-gray-600 text-lg font-medium">
            Create an account?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}
              className="text-blue-600 font-semibold cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
        <div className="flex items-center mt-4 gap-3 text-gray-600 text-base font-medium">
          <input type="checkbox" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
