import React, { useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import { doctors } from '../data/doctors';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-center mb-4">Find Your Doctor</h1>

      <div className="row justify-content-center mb-4">
        <div className="col-md-8 col-lg-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="alert alert-info text-center">No doctors found.</div>
      ) : (
        <div className="row">
          {filteredDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;