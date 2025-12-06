export function Certificates() {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-award-fill text-warning me-2"></i>
        My Certificates
      </h2>
      <div className="alert alert-info">
        <i className="bi bi-info-circle me-2"></i>
        Complete courses to earn certificates and showcase your achievements!
      </div>
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 p-5 text-center">
            <i className="bi bi-award fs-1 text-muted mb-3"></i>
            <h4>No Certificates Yet</h4>
            <p className="text-muted">
              Complete your enrolled courses to earn certificates
            </p>
            <button className="btn btn-primary mt-3" onClick={() => window.location.href = '/my-courses'}>
              View My Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}