import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { BASE_URL } from "../../utils/constants";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email!");
      return;
    }

    if (!password) {
      setError("Enter your password");
      return;
    }
    setError("");

    //SignUp API calls
    try {
      const response = await axiosInstance.post(`${BASE_URL}/create-account`, {
        fullName: name,
        email: email,
        password: password,
      });
      //Handle successful signup response
      if (response.data && response.data.accessToken) {
        setError(response.data.message);
        return;
      }
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      //Handle unsuccessful signup response
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Internal Server Error.Please try again.");
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10'>
          <form onSubmit={handleSignUp}>
            <h4 className='text-2xl mb-7'>Sign Up</h4>
            <input
              type='text'
              placeholder='Name'
              className='input-box'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='text'
              placeholder='Email'
              className='input-box'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary'>
              Create Account
            </button>
            <p className='text-sm text-center mt-4'>
              Existing Account?{" "}
              <Link to='/login' className='font-medium text-blue-500 underline'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
