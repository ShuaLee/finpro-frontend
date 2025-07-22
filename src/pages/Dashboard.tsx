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
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

type CountryOption = { code: string; name: string };
type CurrencyOption = { code: string; name: string };

const Dashboard = () => {
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

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

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
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <h1>Dashboard</h1>
        <p>Welcome! Add your widgets and reports here.</p>
      </Box>

      {/* Profile Completion Dialog */}
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
                country: newValue?.code
                  ? newValue.code.toUpperCase()
                  : form.country,
              })
            }
            renderInput={(params) => (
              <TextField {...params} label="Country" margin="normal" />
            )}
          />

          <Autocomplete
            options={currencies}
            getOptionLabel={(option) => option.name}
            value={
              form.preferred_currency
                ? currencies.find((c) => c.code === form.preferred_currency) ||
                  null
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
              <TextField
                {...params}
                label="Preferred Currency"
                margin="normal"
              />
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
            onClick={() => setOpen(false)}
          >
            Skip for now
          </Button>
        </DialogContent>
      </Dialog>

      {/* Snackbar */}
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
    </>
  );
};

export default Dashboard;
