export function Contact() {
  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-envelope-fill text-primary me-2"></i>
        Contact Us
      </h2>
      <div className="row">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4 mb-4">
            <h4>Get in Touch</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" placeholder="Your name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" placeholder="your@email.com" />
              </div>
              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input type="text" className="form-control" placeholder="How can we help?" />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="5" placeholder="Your message..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-send me-2"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4 mb-4">
            <h4>Contact Information</h4>
            <div className="mb-3">
              <i className="bi bi-geo-alt-fill text-primary me-2"></i>
              <strong>Address:</strong><br />
              123 Learning Street, Education City, 12345
            </div>
            <div className="mb-3">
              <i className="bi bi-telephone-fill text-primary me-2"></i>
              <strong>Phone:</strong><br />
              +1 (555) 123-4567
            </div>
            <div className="mb-3">
              <i className="bi bi-envelope-fill text-primary me-2"></i>
              <strong>Email:</strong><br />
              support@learnhub.com
            </div>
            <div className="mb-3">
              <i className="bi bi-clock-fill text-primary me-2"></i>
              <strong>Business Hours:</strong><br />
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 4:00 PM<br />
              Sunday: Closed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}