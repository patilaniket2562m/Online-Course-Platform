export function Wishlist() {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-heart-fill text-danger me-2"></i>
        My Wishlist
      </h2>
      <div className="card shadow-sm border-0 p-5 text-center">
        <i className="bi bi-heart fs-1 text-muted mb-3"></i>
        <h4>Your Wishlist is Empty</h4>
        <p className="text-muted">
          Browse courses and add them to your wishlist to save for later
        </p>
        <button className="btn btn-primary mt-3" onClick={() => window.location.href = '/courses'}>
          Browse Courses
        </button>
      </div>
    </div>
  );
}