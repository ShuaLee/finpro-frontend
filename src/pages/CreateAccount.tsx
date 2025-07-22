import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

function CreateAccount() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isOver13: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.isOver13) {
      setError("You must confirm you are over 13 years old.");
      return;
    }

    try {
      setLoading(true);
      await signup(formData);
      navigate("/dashboard");
    } catch {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={6}
      sx={{
        padding: 4,
        maxWidth: 400,
        width: "100%",
        borderRadius: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Create Account
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Please fill in the details below
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <FormControlLabel
          control={
            <Checkbox
              name="isOver13"
              checked={formData.isOver13}
              onChange={handleChange}
            />
          }
          label="I confirm I am at least 13 years old"
          sx={{ mt: 1 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, py: 1.5, fontWeight: "bold", fontSize: "16px" }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Paper>
  );
}

export default CreateAccount;
