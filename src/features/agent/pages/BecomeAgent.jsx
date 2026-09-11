import { useState } from "react";
import api from "../../../shared/api/axios";

import "../styles/BecomeAgent.css";

export default function BecomeAgent() {
 const [form, setForm] = useState({
  fullName: "",
  email: "",
  phone: "",
  nationalId: "",
  kraPin: "",
  county: "",
  experience: "",
  previousCompany: "",
  businessName: "",
  education: "",
  occupation: "",
  preferredRegion: "",
  motivation: "",
  declaration: false,
});

  const [files, setFiles] = useState({
  cv: null,
  nationalIdDocument: null,
  kraCertificate: null,
  iraCertificate: null,
  goodConduct: null,
  otherDocument: null,
});

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  const submitApplication = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    Object.keys(files).forEach((key) => {
      if (files[key]) {
        data.append(key, files[key]);
      }
    });

    try {
      setLoading(true);

      await api.post("/agent-applications", data);

      alert("Application submitted successfully.");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to submit application."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agent-page">
      <form onSubmit={submitApplication}>
        {/* HERO */}

        <section className="agent-hero">
          <div className="agent-hero-overlay">
            <img
              src="/logo.png"
              alt="STALLIFS Insurance"
              className="agent-logo"
            />

            <span className="hero-badge">
              Career Opportunity
            </span>

            <h1>Become a Stallifs Insurance Agent</h1>

            <p>
              Join our nationwide network of professional
              insurance advisors and help individuals,
              families and businesses protect what matters
              most while building a rewarding career.
            </p>
          </div>
        </section>

        {/* PERSONAL INFORMATION */}

        <section className="agent-section">
          <h2 className="section-title">
            Personal Information
          </h2>

          <hr className="section-divider" />

          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="07XXXXXXXX"
                required
              />
            </div>

            <div className="form-group">
              <label>National ID Number</label>

              <input
                type="text"
                name="nationalId"
                value={form.nationalId}
                onChange={handleChange}
                placeholder="National ID"
                required
              />
            </div>

            <div className="form-group">
              <label>KRA PIN</label>

              <input
                type="text"
                name="kraPin"
                value={form.kraPin}
                onChange={handleChange}
                placeholder="A000000000A"
                required
              />
            </div>

            <div className="form-group">
              <label>County</label>

              <select
                name="county"
                value={form.county}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select County
                </option>

                {[
                  "Baringo",
                  "Bomet",
                  "Bungoma",
                  "Busia",
                  "Elgeyo Marakwet",
                  "Embu",
                  "Garissa",
                  "Homa Bay",
                  "Isiolo",
                  "Kajiado",
                  "Kakamega",
                  "Kericho",
                  "Kiambu",
                  "Kilifi",
                  "Kirinyaga",
                  "Kisii",
                  "Kisumu",
                  "Kitui",
                  "Kwale",
                  "Laikipia",
                  "Lamu",
                  "Machakos",
                  "Makueni",
                  "Mandera",
                  "Marsabit",
                  "Meru",
                  "Migori",
                  "Mombasa",
                  "Murang'a",
                  "Nairobi",
                  "Nakuru",
                  "Nandi",
                  "Narok",
                  "Nyamira",
                  "Nyandarua",
                  "Nyeri",
                  "Samburu",
                  "Siaya",
                  "Taita Taveta",
                  "Tana River",
                  "Tharaka Nithi",
                  "Trans Nzoia",
                  "Turkana",
                  "Uasin Gishu",
                  "Vihiga",
                  "Wajir",
                  "West Pokot",
                ].map((county) => (
                  <option
                    key={county}
                    value={county}
                  >
                    {county}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
        {/* PROFESSIONAL INFORMATION */}

<section className="agent-section">

  <h2 className="section-title">
    Professional Information
  </h2>

  <hr className="section-divider" />

  <div className="form-grid">

    <div className="form-group">
      <label>Insurance Experience</label>

      <select
        name="experience"
        value={form.experience}
        onChange={handleChange}
        required
      >
        <option value="">
          Select Experience
        </option>

        <option value="None">
          No Experience
        </option>

        <option value="Less than 1 year">
          Less than 1 Year
        </option>

        <option value="1-3 years">
          1 - 3 Years
        </option>

        <option value="3-5 years">
          3 - 5 Years
        </option>

        <option value="5+ years">
          More than 5 Years
        </option>

      </select>
    </div>

    <div className="form-group">
      <label>Previous Insurance Company</label>

      <input
        type="text"
        name="previousCompany"
        value={form.previousCompany}
        onChange={handleChange}
        placeholder="Optional"
      />
    </div>

    <div className="form-group">
      <label>Business / Agency Name</label>

      <input
        type="text"
        name="businessName"
        value={form.businessName}
        onChange={handleChange}
        placeholder="Optional"
      />
    </div>

    <div className="form-group">
      <label>Highest Education</label>

      <select
        name="education"
        value={form.education || ""}
        onChange={handleChange}
        required
      >
        <option value="">
          Select Education
        </option>

        <option>KCSE</option>
        <option>Certificate</option>
        <option>Diploma</option>
        <option>Higher Diploma</option>
        <option>Bachelor's Degree</option>
        <option>Master's Degree</option>
        <option>Doctorate</option>

      </select>
    </div>

    <div className="form-group">
      <label>Occupation</label>

      <input
        type="text"
        name="occupation"
        value={form.occupation || ""}
        onChange={handleChange}
        placeholder="Current occupation"
        required
      />
    </div>

    <div className="form-group">
      <label>Preferred Sales Region</label>

      <input
        type="text"
        name="preferredRegion"
        value={form.preferredRegion || ""}
        onChange={handleChange}
        placeholder="Example: Nairobi, Rift Valley"
        required
      />
    </div>

  </div>

</section>
{/* SUPPORTING DOCUMENTS */}

<section className="agent-section">

  <h2 className="section-title">
    Supporting Documents
  </h2>

  <hr className="section-divider" />

  <div className="form-grid">

    <div className="form-group">
      <label>Curriculum Vitae (PDF)</label>

      <input
        type="file"
        name="cv"
        accept=".pdf,.doc,.docx"
        onChange={handleFile}
        required
      />
    </div>

    <div className="form-group">
      <label>National ID Copy</label>

      <input
        type="file"
        name="nationalIdDocument"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFile}
        required
      />
    </div>

    <div className="form-group">
      <label>KRA PIN Certificate</label>

      <input
        type="file"
        name="kraCertificate"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFile}
        required
      />
    </div>

    <div className="form-group">
      <label>IRA Certificate (Optional)</label>

      <input
        type="file"
        name="iraCertificate"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFile}
      />
    </div>

    <div className="form-group">
      <label>Certificate of Good Conduct (Optional)</label>

      <input
        type="file"
        name="goodConduct"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFile}
      />
    </div>

    <div className="form-group">
      <label>Other Supporting Document (Optional)</label>

      <input
        type="file"
        name="otherDocument"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleFile}
      />
    </div>

  </div>

</section>
{/* MOTIVATION */}

<section className="agent-section">

  <h2 className="section-title">
    Motivation & Declaration
  </h2>

  <hr className="section-divider" />

  <div className="form-group">

    <label>
      Why would you like to become a Stallifs Insurance Agent?
    </label>

    <textarea
      name="motivation"
      value={form.motivation}
      onChange={handleChange}
      rows={7}
      placeholder="Tell us about yourself, your sales experience, why you want to join Stallifs Insurance and what value you believe you can bring to our customers."
      required
    />

  </div>

  <div className="checkbox-group">

    <input
      type="checkbox"
      id="declaration"
      name="declaration"
      checked={form.declaration || false}
      onChange={(e) =>
        setForm({
          ...form,
          declaration: e.target.checked,
        })
      }
      required
    />

    <label htmlFor="declaration">
      I declare that the information provided in this
      application is true and accurate. I understand
      that Stallifs Insurance may verify the information
      before making a recruitment decision.
    </label>

  </div>

</section>
{/* SUBMIT */}

<section className="agent-section">

  <h2 className="section-title">
    Ready to Submit?
  </h2>

  <hr className="section-divider" />

  <div className="submit-card">

    <p>
      Please review your application before submitting.
      Once submitted, our recruitment team will review
      your documents and contact you if you are shortlisted.
    </p>

    <div className="submit-checklist">

      <div className="check-item">
        ✅ Personal Information Completed
      </div>

      <div className="check-item">
        ✅ Professional Information Completed
      </div>

      <div className="check-item">
        ✅ Supporting Documents Attached
      </div>

      <div className="check-item">
        ✅ Declaration Accepted
      </div>

    </div>

    <button
      type="submit"
      className="submit-btn"
      disabled={loading}
    >
      {loading
        ? "Submitting Application..."
        : "Submit Application"}
    </button>

  </div>

</section>
      </form>
    </div>
  );
}