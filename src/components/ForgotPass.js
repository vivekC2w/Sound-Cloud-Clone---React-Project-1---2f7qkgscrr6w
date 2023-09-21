import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { Box, TextField, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [error] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username:"",
    email: "",
    currentPassword: "",
    password: "",
  });
  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { username, email, currentPassword, password } = user;

    if (username && email && currentPassword && password) {
      const data = await fetch(
        "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            projectId: "f104bi07c490",
          },
          body: JSON.stringify({
            name,
            email,
            currentPassword,
            password,
            appType: 'music',
          }),
        }
      );
      if (data) {
        setUser({
            username: "",
            email: "",
            currentPassword: "",
            password: "",
          
        });
        let json = await data.json();
        console.log(json);
        if (json.status === "fail") {
          alert(json.message);
        } else {
          window.sessionStorage.setItem("jwt", json.token);
          alert("Password Updated Succesfully");
          navigate("/signin");
        }
      }
    } else {
      alert("Please fill all the data");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form method="PATCH">
      <Box
        display="flex"
        flexDirection="column"
        maxWidth={450}
        alignItems="center"
        justifyContent="center"
        margin="20px auto !important"
        padding="20px !important"
        borderRadius={5}
        boxShadow="5px 5px 10px #ccc"
        position={"relative"}
        sx={{
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          {error && <Alert variant="danger">{error}</Alert>}
          <TextField
            placeholder="Enter your Username"
            type="text"
            name="username"
            value={user.username}
            fullWidth
            onChange={getUserData}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            placeholder="Enter your email"
            type="text"
            name="email"
            value={user.email}
            fullWidth
            onChange={getUserData}
            sx={{ marginBottom: 2 }}
          />
          
            <TextField
              placeholder="Enter your Current Password"
              name="currentPassword"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={user.currentPassword}
              onChange={getUserData}
              sx={{ marginBottom: 2 }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />

            <TextField
              placeholder="Enter your New Password"
              name="password"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={user.password}
              onChange={getUserData}
              sx={{ marginBottom: 2 }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />

          <Button
            fullWidth
            variant="contained"
            onClick={postData}
            sx={{
              backgroundColor: "#f50",
              borderColor: "#f50",
              color: "#fff",
              ":hover": {
                backgroundColor: "#f50",
              },
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            Update Password
          </Button>
        </div>
      </Box>
    </form>
  );
}

export default ForgotPassword;