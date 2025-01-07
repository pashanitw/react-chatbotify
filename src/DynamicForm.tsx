/* eslint-disable */

import React, { useState } from "react";

const formConfig = [
  {
    label: "Full Name",
    type: "text",
    name: "fullName",
    required: true,
    placeholder: "Enter your full name",
  },
  {
    label: "Email Address",
    type: "email",
    name: "email",
    required: true,
    placeholder: "Enter your email",
  },
  {
    label: "Age",
    type: "number",
    name: "age",
    required: false,
    placeholder: "Enter your age",
  },
  {
    label: "Appointment Date",
    type: "date",
    name: "appointmentDate",
    required: true,
  },
  {
    label: "Service Type",
    type: "select",
    name: "serviceType",
    required: true,
    options: [
      { label: "Consultation", value: "consultation" },
      { label: "Therapy Session", value: "therapy" },
      { label: "Follow-up Visit", value: "follow_up" },
    ],
  },
  {
    label: "Additional Notes",
    type: "textarea",
    name: "notes",
    required: false,
    placeholder: "Any additional information...",
  },
  {
    label: "Preferred Contact Method",
    type: "radio",
    name: "contactMethod",
    required: true,
    options: [
      { label: "Email", value: "email" },
      { label: "Phone", value: "phone" },
    ],
  },
  {
    label: "Agree to Terms",
    type: "checkbox",
    name: "agreeTerms",
    required: true,
    options: [{ label: "I agree to the terms and conditions", value: "agree" }],
  },
  {
    label: "Submit",
    type: "button",
    name: "submit",
    required: false,
  },
];

const DynamicForm = () => {
  const initialState = formConfig.reduce((acc, field) => {
    switch (field.type) {
      case "checkbox":
        acc[field.name] = [];
        break;
      case "button":
        break;
      default:
        acc[field.name] = "";
    }
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e, field) => {
    const { type, name, value, checked } = e.target;

    if (field.type === "checkbox") {
      const currentValues = formData[name] || [];
      if (checked) {
        setFormData({
          ...formData,
          [name]: [...currentValues, value],
        });
      } else {
        setFormData({
          ...formData,
          [name]: currentValues.filter((v) => v !== value),
        });
      }
    } else if (field.type === "radio") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};

    formConfig.forEach((field) => {
      if (field.type === "button") return;

      const value = formData[field.name];

      if (field.required) {
        if (field.type === "checkbox") {
          if (!value || value.length === 0) {
            newErrors[field.name] = `${field.label} is required.`;
          }
        } else if (!value || value.toString().trim() === "") {
          newErrors[field.name] = `${field.label} is required.`;
        }
      }

      if (field.type === "email" && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[field.name] = "Invalid email address.";
        }
      }

      if (field.type === "number" && value) {
        if (isNaN(value)) {
          newErrors[field.name] = `${field.label} must be a number.`;
        }
      }
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Form Submitted Successfully:", formData);

      setFormData(initialState);
      setErrors({});
      setSubmitStatus({ success: true, message: "Form submitted successfully!" });

      setTimeout(() => setSubmitStatus(null), 5000);
    } else {
      setSubmitStatus({ success: false, message: "Please fix the errors above." });
    }
  };

  const renderField = (field) => {
    const fieldStyle = {
      width: "100%",
      padding: "10px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
      boxSizing: "border-box",
    };

    const errorStyle = {
      color: "#ff4d4f",
      fontSize: "12px",
      marginTop: "4px",
    };

    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "date":
        return (
          <input
            type={field.type}
            name={field.name}
            id={field.name}
            placeholder={field.placeholder || ""}
            value={formData[field.name]}
            onChange={(e) => handleChange(e, field)}
            required={field.required}
            style={fieldStyle}
          />
        );
      case "textarea":
        return (
          <textarea
            name={field.name}
            id={field.name}
            placeholder={field.placeholder || ""}
            value={formData[field.name]}
            onChange={(e) => handleChange(e, field)}
            required={field.required}
            style={fieldStyle}
          />
        );
      case "select":
        return (
          <select
            name={field.name}
            id={field.name}
            value={formData[field.name]}
            onChange={(e) => handleChange(e, field)}
            required={field.required}
            style={fieldStyle}
          >
            <option value="">-- Select --</option>
            {field.options &&
              field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        );
      case "radio":
        return (
          <div style={{ display: "flex", flexDirection: "column", margin: "8px 0" }}>
            {field.options &&
              field.options.map((option) => (
                <label key={option.value} style={{ fontSize: "14px", margin: "4px 0" }}>
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name] === option.value}
                    onChange={(e) => handleChange(e, field)}
                    required={field.required}
                    style={{ marginRight: "8px" }}
                  />
                  {option.label}
                </label>
              ))}
          </div>
        );
      case "checkbox":
        return (
          <div style={{ display: "flex", flexDirection: "column", margin: "8px 0" }}>
            {field.options &&
              field.options.map((option) => (
                <label key={option.value} style={{ fontSize: "14px", margin: "4px 0" }}>
                  <input
                    type="checkbox"
                    name={field.name}
                    value={option.value}
                    checked={formData[field.name].includes(option.value)}
                    onChange={(e) => handleChange(e, field)}
                    required={field.required && formData[field.name].length === 0}
                    style={{ marginRight: "8px" }}
                  />
                  {option.label}
                </label>
              ))}
          </div>
        );
      case "button":
        return (
          <button
            type="submit"
            name={field.name}
            style={{
              backgroundColor: "#3a86ff",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            {field.label}
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "#F9FAFB",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <h2 style={{ fontSize: "20px", textAlign: "center", marginBottom: "16px" }}>
          Appointment Booking Form
        </h2>
        {formConfig.map((field) => (
          <div key={field.name} style={{ marginBottom: "16px" }}>
            {field.type !== "button" && (
              <label
                htmlFor={field.name}
                style={{ display: "block", fontSize: "14px", marginBottom: "8px" }}
              >
                {field.label}
                {field.required && <span style={{ color: "#ff4d4f", marginLeft: "4px" }}>*</span>}
              </label>
            )}
            {renderField(field)}
            {errors[field.name] && <div style={errorStyle}>{errors[field.name]}</div>}
          </div>
        ))}
      </form>
      {submitStatus && (
        <div
          style={{
            marginTop: "16px",
            padding: "8px",
            borderRadius: "4px",
            color: submitStatus.success ? "#fff" : "#ff4d4f",
            backgroundColor: submitStatus.success ? "#4caf50" : "#f8d7da",
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          {submitStatus.message}
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
