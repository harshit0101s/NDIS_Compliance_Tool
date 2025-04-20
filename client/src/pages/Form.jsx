import { useState } from "react";
import axios from "axios";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: ""
  });
  const [policy, setPolicy] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const errors = {};
    
    // Validate Name
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    // Validate Email
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid.";
    }

    // Validate Service Type
    if (!formData.serviceType.trim()) {
      errors.serviceType = "Service Type is required.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const validationErrors = validateForm();
    setErrors(validationErrors);

    // If there are validation errors, stop the form from submitting
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const apiUrl = "https://ndis-compliance-tool.onrender.com";
    try {
      const res = await axios.post(`${apiUrl}/generate_policy`, formData);
      setPolicy(res.data.policy);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="container">
      <h2>Fill in NDIS Service Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        
        <div>
          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div>
          <input
            name="serviceType"
            placeholder="Type of NDIS Service"
            onChange={handleChange}
            value={formData.serviceType}
            required
          />
          {errors.serviceType && <p className="error">{errors.serviceType}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {policy && (
        <div className="policy">
          <h3>Generated Participant Rights Policy:</h3>
          <p>{policy}</p>
        </div>
      )}
    </div>
  );
}
