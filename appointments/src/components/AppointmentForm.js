import React, { useState } from 'react';

const AppointmentForm = ({ doctor, onConfirm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!date) newErrors.date = "Date is required";
    if (!time) newErrors.time = "Time is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsSubmitted(true);
      setTimeout(() => {
        onConfirm({ name, email, date, time });
      }, 1000); // Simulate network delay
    }
  };

  if (isSubmitted) {
    return (
      <div className="alert alert-success text-center">
        <h5>✅ Appointment Confirmed!</h5>
        <p>You've successfully booked with <strong>{doctor.name}</strong>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h4>Book an Appointment with {doctor.name}</h4>
      <hr />

      <div className="mb-3">
        <label>Patient Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
      </div>

      <div className="mb-3">
        <label>Date</label>
        <input
          type="date"
          className={`form-control ${errors.date ? 'is-invalid' : ''}`}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <div className="invalid-feedback">{errors.date}</div>}
      </div>

      <div className="mb-3">
        <label>Time</label>
        <input
          type="time"
          className={`form-control ${errors.time ? 'is-invalid' : ''}`}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        {errors.time && <div className="invalid-feedback">{errors.time}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Confirm Appointment
      </button>
    </form>
  );
};

export default AppointmentForm;