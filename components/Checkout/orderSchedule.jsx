"use client";

import React, { useState, useEffect } from "react";

const OrderSchedule = ({ onScheduleSelect, cartQuantity }) => {
  const [selectedHour, setSelectedHour] = useState(null);
  const [initialCapacities, setInitialCapacities] = useState({});
  const [currentCapacities, setCurrentCapacities] = useState({});
  const [errorMessages, setErrorMessages] = useState({}); // Error messages per hour

  // Generate random capacities for hours (12 to 23)
  useEffect(() => {
    const capacities = {};
    for (let hour = 12; hour <= 23; hour++) {
      capacities[hour] = Math.floor(Math.random() * 20) + 1; // Random number between 1 and 20
    }
    setInitialCapacities(capacities); // Store initial capacities
    setCurrentCapacities(capacities); // Initialize current capacities
  }, []);

  // Update capacities dynamically when cart quantity changes
  useEffect(() => {
    setCurrentCapacities((prevCapacities) => {
      const updatedCapacities = { ...prevCapacities };
      Object.keys(updatedCapacities).forEach((hour) => {
        const originalCapacity = initialCapacities[hour];
        const remainingCapacity =
          originalCapacity -
          (selectedHour === parseInt(hour) ? cartQuantity : 0);
        updatedCapacities[hour] =
          remainingCapacity >= 0 ? remainingCapacity : 0;
      });
      return updatedCapacities;
    });
  }, [cartQuantity, initialCapacities, selectedHour]);

  const handleSelectHour = (hour) => {
    if (selectedHour === hour) {
      // اگر دوباره روی همان ساعت کلیک شد، انتخاب را لغو کن
      setSelectedHour(null);
      onScheduleSelect(null); // به والد اطلاع بده که هیچ ساعتی انتخاب نشده
      return;
    }

    const remainingCapacity = currentCapacities[hour] - cartQuantity;

    if (remainingCapacity < 0) {
      // اگر ظرفیت کافی نبود، پیام خطا نمایش داده می‌شود
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [hour]: `ظرفیت این ساعت کافی نیست.`,
      }));
      return;
    }

    // پاک کردن پیام‌های خطای قبلی
    setErrorMessages({});
    setSelectedHour(hour);

    // کاهش ظرفیت برای ساعت انتخاب‌شده
    setCurrentCapacities((prevCapacities) => ({
      ...prevCapacities,
      [hour]: remainingCapacity,
    }));

    // ارسال ساعت انتخاب‌شده به کامپوننت والد
    onScheduleSelect(hour);
  };

  const isDisabled = (hour) => {
    const capacity = currentCapacities[hour];
    return capacity < cartQuantity; // Disable if capacity is less than cart quantity
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-6 mt-6 mx-auto"
      style={{
        maxWidth: "500px",
        width: "100%",
      }}
    >
      <h2 className="text-lg font-bold mb-4 text-center">انتخاب ساعت سفارش</h2>

      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
        }}
      >
        {Object.keys(initialCapacities).map((hour) => {
          const capacity = currentCapacities[hour];
          const disabled = isDisabled(hour);

          return (
            <div key={hour} className="flex flex-col items-center">
              <button
                onClick={() => handleSelectHour(parseInt(hour))}
                className={`p-3 rounded text-sm text-white ${
                  disabled
                    ? "bg-green-300 cursor-not-allowed"
                    : selectedHour === parseInt(hour)
                    ? "bg-orange-500"
                    : "bg-teal-500"
                } hover:bg-teal-700 transition duration-300`}
                style={{
                  width: "100%",
                  height: "50px",
                  fontSize: "14px",
                }}
                disabled={disabled} // Disable button if capacity is less than cart quantity
              >
                {hour}:00
              </button>
              <div
                className={`text-xs mt-2 ${
                  disabled
                    ? "text-red-500" // Red for "ظرفیت کافی نیست"
                    : capacity < 3 && capacity > 0
                    ? "text-red-500"
                    : "text-gray-500"
                }`}
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {capacity >= cartQuantity
                  ? `ظرفیت: ${capacity}`
                  : "ظرفیت این ساعت کافی نیست."}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderSchedule;
