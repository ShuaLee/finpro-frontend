import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
  Alert,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Login() {
  const { login, isAuthenticated, authChecked } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * ✅ Redirect if already authenticated
   */
  useEffect(() => {
    if (authChecked && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [authChecked, isAuthenticated, navigate]);

  /**
   * ✅ Handle login form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      // ❌ Do not navigate here, let useEffect handle redirection
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!authChecked) {
    // Optional: Loading state while checking auth
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper
      elevation={6}
      sx={{
        padding: 4,
        maxWidth: 400,
        width: "100%",
        borderRadius: 3,
        textAlign: "center",
        margin: "auto",
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome Back 👋
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Please log in to your account
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
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5, fontWeight: "bold", fontSize: "16px" }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </form>

      <Typography variant="body2" sx={{ mt: 3 }}>
        Don’t have an account?{" "}
        <Link
          component="button"
          underline="hover"
          onClick={() => navigate("/create-account")}
        >
          Sign up
        </Link>
      </Typography>
    </Paper>
  );
}

export default Login;
