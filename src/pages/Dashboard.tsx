import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  CircularProgress,
  Autocomplete,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import MainLayout from "../layout/MainLayout";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

type CountryOption = { code: string; name: string };
type CurrencyOption = { code: string; name: string };

const Dashboard = ({ darkMode }: { darkMode: boolean }) => {
  const { isProfileComplete, isAuthenticated, setProfileComplete } = useAuth();
  const [open, setOpen] = useState(isAuthenticated && !isProfileComplete);

  const [form, setForm] = useState({
    full_name: "",
    country: "",
    preferred_currency: "",
  });

  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // ✅ Fetch profile and metadata
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);

        const profileRes = await api.get("/users/profile/");
        setForm({
          full_name: profileRes.data.full_name || "",
          country: profileRes.data.country || "",
          preferred_currency: profileRes.data.preferred_currency || "",
        });

        const metaRes = await api.get("/metadata/");
        setCountries(metaRes.data.countries);
        setCurrencies(metaRes.data.currencies);
      } catch (error) {
        console.error("Failed to load profile or metadata:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.patch("/users/profile/", form);

      setProfileComplete(true);
      setOpen(false);

      setSnackbar({
        open: true,
        message: "Profile updated successfully!",
        severity: "success",
      });
    } catch (err) {
      console.error("Profile update failed:", err);
      setSnackbar({
        open: true,
        message: "Failed to update profile. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const isFormValid =
    form.full_name.trim() !== "" &&
    form.country.trim() !== "" &&
    form.preferred_currency.trim() !== "";

  if (fetching) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <MainLayout darkMode={darkMode}>
      <Box>
        <h1>Dashboard</h1>
        {/* Add your dashboard widgets here */}
      </Box>

      <Dialog open={open} disableEscapeKeyDown>
        <DialogTitle>Complete Your Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Full Name"
            name="full_name"
            fullWidth
            margin="normal"
            value={form.full_name}
            onChange={handleChange}
          />

          {/* ✅ Country Dropdown */}
          <Autocomplete
            options={countries}
            getOptionLabel={(option) => option.name}
            value={
              form.country
                ? countries.find((c) => c.code === form.country) || null
                : null
            }
            onChange={(_, newValue) =>
              setForm({
                ...form,
                country: newValue?.code ? newValue.code.toUpperCase() : form.country,
              })
            }
            renderInput={(params) => (
              <TextField {...params} label="Country" margin="normal" />
            )}
          />

          {/* ✅ Currency Dropdown */}
          <Autocomplete
            options={currencies}
            getOptionLabel={(option) => option.name}
            value={
              form.preferred_currency
                ? currencies.find((c) => c.code === form.preferred_currency) || null
                : null
            }
            onChange={(_, newValue) =>
              setForm({
                ...form,
                preferred_currency: newValue?.code
                  ? newValue.code.toUpperCase()
                  : form.preferred_currency,
              })
            }
            renderInput={(params) => (
              <TextField {...params} label="Preferred Currency" margin="normal" />
            )}
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={loading || !isFormValid}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 1 }}
            onClick={() => setOpen(false)} // ✅ Failsafe close
          >
            Skip for now
          </Button>
        </DialogContent>
      </Dialog>

      {/* ✅ Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MainLayout>
  );
};

export default Dashboard;
