"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name) newErrors.name = "نام الزامی است";
    if (!formData.username) newErrors.username = "نام کاربری الزامی است";
    if (formData.phone.length < 11) newErrors.phone = "شماره تلفن باید حداقل 11 رقم باشد";
    if (!/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) newErrors.email = "فرمت ایمیل اشتباه است";
    if (formData.password.length < 3) newErrors.password = "رمز عبور باید حداقل 3 حرف باشد";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "تکرار رمز عبور با رمز برابر نیست";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      router.push("/home");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-blue-200 to-teal-300 overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-teal-700 text-center">ثبت‌نام</h2>
        <form onSubmit={handleSubmit} className="text-right">
          {[
            { id: "name", icon: "pi pi-user", placeholder: "نام" },
            { id: "username", icon: "pi pi-user", placeholder: "نام کاربری" },
            { id: "phone", icon: "pi pi-phone", placeholder: "شماره تلفن" },
            { id: "email", icon: "pi pi-envelope", placeholder: "ایمیل" },
          ].map((input) => (
            <div key={input.id} className="mb-4">
              <div className="flex items-center">
                <i className={`${input.icon} text-gray-500 mr-2`} />
                <InputText
                  id={input.id}
                  value={formData[input.id]}
                  onChange={handleInputChange}
                  className={`w-full border px-3 py-2 text-right placeholder-right ${errors[input.id] ? "p-invalid" : ""}`}
                  placeholder={input.placeholder}
                />
              </div>
              {errors[input.id] && (
                <small className="text-red-500 block mt-1 text-right">{errors[input.id]}</small>
              )}
            </div>
          ))}
          <div className="mb-4">
            <div className="flex items-center">
              <i className="pi pi-lock text-gray-500 mr-2" />
              <InputText
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full border px-3 py-2 text-right placeholder-right ${errors.password ? "p-invalid" : ""}`}
                placeholder="رمز عبور"
              />
            </div>
            {errors.password && (
              <small className="text-red-500 block mt-1 text-right">{errors.password}</small>
            )}
          </div>
          <div className="mb-6">
            <div className="flex items-center">
              <i className="pi pi-lock text-gray-500 mr-2" />
              <InputText
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`w-full border px-3 py-2 text-right placeholder-right ${errors.confirmPassword ? "p-invalid" : ""}`}
                placeholder="تکرار رمز عبور"
              />
            </div>
            {errors.confirmPassword && (
              <small className="text-red-500 block mt-1 text-right">{errors.confirmPassword}</small>
            )}
          </div>
          <Button
            type="submit"
            label="ثبت‌نام"
            className="w-full bg-gradient-to-r from-teal-400 to-green-400 text-white py-2 rounded-full hover:from-teal-500 hover:to-green-500 transition duration-300 shadow-md hover:shadow-lg"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
