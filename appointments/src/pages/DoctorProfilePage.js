import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doctors } from '../data/doctors';
import AppointmentForm from '../components/AppointmentForm';

const DoctorProfilePage = () => {
  const { id } = useParams();
  const doctor = doctors.find(d => d.id === parseInt(id));

  const [showForm, setShowForm] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!doctor) {
    return (
      <div className="alert alert-danger">Doctor not found!</div>
    );
  }

  const handleConfirm = (data) => {
    console.log("Appointment booked:", data);
    setConfirmed(true);
    setShowForm(false);
  };

  return (
    <div>
      <Link to="/" className="btn btn-secondary mb-3">&larr; Back to Doctors</Link>

      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-md-4 text-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="img-fluid rounded-start"
              style={{ objectFit: 'cover', height: '100%', maxHeight: '300px', width: '100%' }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2>{doctor.name}</h2>
              <h5 className="text-primary">{doctor.specialization}</h5>
              <p className={`fw-bold mt-3 ${
                doctor.availability === "Available Today" ? "text-success" :
                doctor.availability === "Fully Booked" ? "text-danger" :
                "text-warning"
              }`}>
                Status: {doctor.availability}
              </p>
              <p>{doctor.bio}</p>

              {doctor.availability === "Available Today" && !confirmed && (
                <button
                  className="btn btn-success"
                  onClick={() => setShowForm(true)}
                >
                  📅 Book Appointment
                </button>
              )}

              {doctor.availability !== "Available Today" && (
                <p className="text-muted">
                  {doctor.availability === "Fully Booked"
                    ? "This doctor is fully booked for today."
                    : "Currently on leave."}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="mt-4 p-4 border rounded bg-light">
          <AppointmentForm doctor={doctor} onConfirm={handleConfirm} />
        </div>
      )}

      {confirmed && !showForm && (
        <div className="alert alert-success mt-4">
          <strong>Thank you!</strong> Your appointment has been confirmed and an email has been sent.
        </div>
      )}
    </div>
  );
};

export default DoctorProfilePage;