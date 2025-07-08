import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const EscalatePage = () => {
  const { orderId } = useParams();
  const [reason, setReason] = useState("");
  const [otherIssue, setOtherIssue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalIssue = reason === "other" ? otherIssue : reason;

    navigate("/escalation-summary", {
      state: {
        orderId,
        issue: finalIssue,
      },
    });
  };

  const issues = [
    "Delay in refund for canceled or failed orders",
    "Item not delivered on the expected date",
    "Delivery is rescheduled without user consent",
    "Received a different item (wrong color, model, size, etc.)",
    "Order marked as delivered, but not actually received",
    "Product is broken or damaged on arrival",
    "Courier not coming to pick up the return",
    "Delay in receiving the replacement or refund",
    "other",
  ];

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h3 className="mb-4 text-center">Escalate Issue – Order ID: {orderId}</h3>

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
              <div className="mb-3">
                <label className="form-label fw-semibold">Select your issue</label>
                <div className="d-flex flex-column gap-2">
                  {issues.map((r, idx) => (
                    <div key={idx} className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="issue"
                        id={`issue-option-${idx}`}
                        value={r}
                        onChange={() => setReason(r)}
                        checked={reason === r}
                      />
                      <label className="form-check-label" htmlFor={`issue-option-${idx}`}>
                        {r === "other" ? "Other (please specify below)" : r}
                      </label>
                    </div>
                  ))}
                </div>

                {reason === "other" && (
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="Please specify your reason"
                    value={otherIssue}
                    onChange={(e) => setOtherIssue(e.target.value)}
                    required
                  />
                )}
              </div>

              <div className="d-flex gap-3">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-warning">
                  Submit Escalation
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EscalatePage;
