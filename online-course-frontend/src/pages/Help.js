export function Help() {
  const faqs = [
    {
      question: "How do I enroll in a course?",
      answer: "Browse the courses page, click on a course you're interested in, and click the 'Enroll Now' button. Follow the checkout process to complete your enrollment."
    },
    {
      question: "Can I access courses on mobile?",
      answer: "Yes! Our platform is fully responsive and works on all devices. You can also download our mobile app from the App Store or Play Store."
    },
    {
      question: "How do I get a certificate?",
      answer: "Complete all lessons and assessments in a course. Once you finish, your certificate will be automatically generated and available in the Certificates section."
    },
    {
      question: "What if I need help with course content?",
      answer: "You can ask questions in the course discussion forum, contact your instructor directly, or reach out to our support team."
    },
    {
      question: "Can I get a refund?",
      answer: "Yes, we offer a 30-day money-back guarantee for all courses. Contact our support team to process a refund."
    }
  ];

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">
        <i className="bi bi-question-circle-fill text-primary me-2"></i>
        Help Center
      </h2>
      
      {/* Search Box */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <div className="input-group input-group-lg">
          <span className="input-group-text bg-white">
            <i className="bi bi-search"></i>
          </span>
          <input 
            type="text" 
            className="form-control" 
            placeholder="Search for help..." 
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3 text-center h-100">
            <i className="bi bi-book fs-2 text-primary mb-2"></i>
            <h6>Getting Started</h6>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3 text-center h-100">
            <i className="bi bi-credit-card fs-2 text-success mb-2"></i>
            <h6>Billing & Payments</h6>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3 text-center h-100">
            <i className="bi bi-mortarboard fs-2 text-warning mb-2"></i>
            <h6>Course Access</h6>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0 p-3 text-center h-100">
            <i className="bi bi-award fs-2 text-info mb-2"></i>
            <h6>Certificates</h6>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="card shadow-sm border-0 p-4">
        <h4 className="mb-4">Frequently Asked Questions</h4>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div key={index} className="accordion-item border-0 mb-2">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#faq${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`faq${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Support */}
      <div className="card shadow-sm border-0 p-4 mt-4 bg-light">
        <div className="text-center">
          <h5>Still need help?</h5>
          <p className="text-muted">Our support team is here to assist you</p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/contact'}>
            <i className="bi bi-envelope me-2"></i>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}