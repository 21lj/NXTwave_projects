import { Link } from 'react-router-dom';

const DoctorCard = ({ doctor }) => {
  const getAvailabilityClass = (status) => {
    switch (status) {
      case "Available Today": return "text-success";
      case "Fully Booked": return "text-danger";
      case "On Leave": return "text-warning";
      default: return "text-secondary";
    }
  };

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="card-img-top"
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{doctor.name}</h5>
          <p className="text-muted"><strong>{doctor.specialization}</strong></p>
          <p className={`fw-bold ${getAvailabilityClass(doctor.availability)}`}>
            {doctor.availability}
          </p>
          <div className="mt-auto">
            <Link to={`/doctor/${doctor.id}`} className="btn btn-outline-primary">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;