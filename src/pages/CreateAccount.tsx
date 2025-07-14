import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function CreateAccount() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate("/"); // redirect to dashboard root
    } catch (err) {
      setError("Signup failed");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={formData.email} onChange={handleChange} />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        name="birthDate"
        type="date"
        value={formData.birthDate}
        onChange={handleChange}
      />
      <button type="submit">Create Account</button>
      {error && <p>{error}</p>}
    </form>
  );
}

export default CreateAccount;
