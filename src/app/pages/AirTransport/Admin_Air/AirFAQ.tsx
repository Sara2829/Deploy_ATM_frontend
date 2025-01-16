import React, { useState } from "react";
import Pagination from "../../Pagination";

// Example static data for Aircraft FAQs
const mockFAQs = [
  {
    id: 1,
    category: "General",
    question: "What is the maximum takeoff weight for the aircraft?",
    answer: "The maximum takeoff weight is 250,000 kilograms.",
    active: true,
  },
  {
    id: 2,
    category: "Safety",
    question: "How many emergency exits does the aircraft have?",
    answer: "The aircraft is equipped with 8 emergency exits.",
    active: true,
  },
  {
    id: 3,
    category: "Technical",
    question: "What type of engines does the aircraft use?",
    answer: "The aircraft uses two turbofan engines.",
    active: true,
  },
  {
    id: 4,
    category: "Seating",
    question: "What is the seating capacity of the aircraft?",
    answer: "The aircraft can seat up to 300 passengers.",
    active: true,
  },
  {
    id: 5,
    category: "Maintenance",
    question: "How often is the aircraft inspected for maintenance?",
    answer: "The aircraft undergoes maintenance checks every 500 flight hours.",
    active: true,
  },
];

export const AircraftFAQPage: React.FC = () => {
  const [faqs, setFaqs] = useState(mockFAQs);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const filteredFAQs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleEntriesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = parseInt(event.target.value, 10);
    setEntriesPerPage(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const toggleActiveStatus = (id: number) => {
    setFaqs(
      faqs.map((faq) =>
        faq.id === id ? { ...faq, active: !faq.active } : faq
      )
    );
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Aircraft FAQs</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            Total FAQs: {filteredFAQs.length}
          </span>
        </h3>
        <div className="card-toolbar d-flex flex-end">
          <input
            type="text"
            className="form-control border-1 border-primary border-opacity-25 mx-2 text-gray-800"
            style={{ width: "12rem" }}
            placeholder="Search FAQs"
            value={search}
            onChange={handleSearchChange}
          />

          <button
            type="button"
            className="btn btn-light-primary border-0 rounded mx-2"
          >
            <i className="fs-2 bi bi-plus" /> Add New FAQ
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table table-hover table-rounded table-striped border gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Category</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFAQs
                .slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)
                .map((faq) => (
                  <tr key={faq.id}>
                    <td>{faq.category}</td>
                    <td>{faq.question}</td>
                    <td>{faq.answer}</td>
                    <td className="text-center">
                      <div className="d-flex flex-row align-items-center">
                        <button
                          className="btn btn-icon btn-bg-light btn-sm me-1"
                          onClick={() => alert(`Viewing: ${faq.question}`)}
                        >
                          <i className="ki-duotone ki-eye fs-3 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                          </i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          onClick={() => alert(`Editing: ${faq.question}`)}
                        >
                          <i className="ki-duotone ki-pencil fs-3 text-primary">
                            <span className="path1"></span>
                            <span className="path2"></span>
                          </i>
                        </button>

                        <button
                          type="button"
                          className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          onClick={() => toggleActiveStatus(faq.id)}
                        >
                          <i className="ki-duotone ki-trash fs-3 text-danger">
                            <span className="path1"></span>
                            <span className="path2"></span>
                            <span className="path3"></span>
                            <span className="path4"></span>
                            <span className="path5"></span>
                          </i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="card-footer">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredFAQs.length / entriesPerPage)}
          onPageChange={handlePageChange}
          entriesPerPage={entriesPerPage}
          onEntriesPerPageChange={handleEntriesPerPageChange}
        />
      </div>
    </div>
  );
};
