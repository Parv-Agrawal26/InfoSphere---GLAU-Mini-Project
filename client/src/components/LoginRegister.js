import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  makeStyles,
  ThemeProvider,
  createTheme,
  Container,
} from "@material-ui/core";
import axios from "axios";
import Header from "./header";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    display: "flex",
    justifyContent: "center",
    paddingTop: theme.spacing(8),
    alignItems: "center",
    paddingBottom: theme.spacing(8),
  },
  paper: {
    backgroundColor: "#1e1e1e",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.05)",
    maxWidth: 400,
    width: "100%",
  },
  title: {
    marginBottom: theme.spacing(2),
    color: "#e6fffd",
    textAlign: "center",
    fontWeight: 600,
  },
  field: {
    marginBottom: theme.spacing(2),
  },
  switchBtn: {
    marginTop: theme.spacing(1),
    color: "#90caf9",
    fontSize: "0.9rem",
  },
}));

const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
});

const LoginRegister = ({ onLogin }) => {
  const classes = useStyles();
  const [form, setForm] = useState({ username: "", password: "" });
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    const endpoint = isLogin ? "login" : "register";
    try {
      const res = await axios.post(
        `http://localhost:4000/auth/${endpoint}`,
        form
      );
      if (isLogin && res.data.token) {
        localStorage.setItem("token", res.data.token);
        onLogin();
      } else {
        alert("Success! You can now log in.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
        <Header
          title="InfoSphere"
          tagline="Welcome to your personalized news hub"
        />
        <Container className={classes.formWrapper}>
          <Paper className={classes.paper} elevation={6}>
            <Typography variant="h5" className={classes.title}>
              {isLogin ? "Login to InfoSphere" : "Create an Account"}
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              className={classes.field}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              className={classes.field}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
              className={classes.field}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Button
              onClick={() => setIsLogin(!isLogin)}
              fullWidth
              className={classes.switchBtn}
            >
              {isLogin
                ? "New here? Create an account"
                : "Already have an account? Login"}
            </Button>
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default LoginRegister;
