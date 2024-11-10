"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { username: "", password: "" };

    if (!username) {
      newErrors.username = "نام کاربری الزامی است";
    } else if (username !== "hoseyn7832") {
      newErrors.username = "نام کاربری اشتباه است";
    }

    if (!password) {
      newErrors.password = "رمز عبور الزامی است";
    } else if (password !== "123") {
      newErrors.password = "رمز عبور اشتباه است";
    }

    setErrors(newErrors);

    if (!newErrors.username && !newErrors.password) {
      router.push("/home");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-200 to-teal-300 ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-teal-700 text-center">ورود</h2>
        <form onSubmit={handleSubmit} className="text-right">
          <div className="mb-4">
            <div className="flex items-center">
              <i className="pi pi-user text-gray-500 mr-2"></i>
              <InputText
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full border px-3 py-2 text-right placeholder-right ${errors.username ? "p-invalid" : ""}`}
                placeholder="نام کاربری"
              />
            </div>
            {errors.username && (
              <small className="text-red-500 block mt-1 text-right">{errors.username}</small>
            )}
          </div>
          <div className="mb-6">
            <div className="flex items-center">
              <i className="pi pi-lock text-gray-500 mr-2"></i>
              <InputText
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full border px-3 py-2 text-right placeholder-right ${errors.password ? "p-invalid" : ""}`}
                placeholder="رمز عبور"
              />
            </div>
            {errors.password && (
              <small className="text-red-500 block mt-1 text-right">{errors.password}</small>
            )}
          </div>
          <Button
            type="submit"
            label="ورود"
            className="w-full bg-gradient-to-r from-teal-400 to-green-400 text-white py-2 rounded-full hover:from-teal-500 hover:to-green-500 transition duration-300 shadow-md hover:shadow-lg"
          />
        </form>
        <div className="mt-4 flex items-center justify-center">
          <button
            className="text-teal-500 font-semibold hover:underline"
            onClick={() => router.push("/register")}
          >
            ثبت‌نام
          </button>
          <span className="text-gray-700 ml-2">آیا هنوز ثبت‌نام نکرده‌اید؟</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
