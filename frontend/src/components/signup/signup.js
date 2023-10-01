import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../constant";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [userdata, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitdata = async (e) => {
    e.preventDefault();
    console.log("submit data", userdata);
    try {
      setError("");
      setLoading(true);
      const url = `${api}/users`;
      const result = await axios.post(url, userdata);
      console.log(result.message);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      if (
        error.message &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  const singupdata = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  return (
    <div className="mx-auto w-11/12  flex justify-between">
      <div className="w-full">
        <form onSubmit={submitdata}>
          <div className="flex flex-col lg:w-[40%] sm:w-[60%] w-[100%]">
            <div className="my-2">
              <TextField
                className="w-[100%] "
                id="outlined-basic"
                label="FirstName"
                variant="outlined"
                onChange={singupdata}
                name="firstname"
              />
            </div>
            <div className="my-2">
              <TextField
                className="w-[100%] "
                id="outlined-basic"
                label="LastName"
                variant="outlined"
                onChange={singupdata}
                name="lastname"
              />
            </div>
            <div className="my-2">
              <TextField
                className="w-[100%] "
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={singupdata}
                name="email"
              />
            </div>
          </div>
          <div className="my-2 lg:w-[40%] sm:w-[60%] w-[100%]">
            <FormControl className="w-[100%]" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                onChange={singupdata}
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          {error && <h1 className="text-red-500 text-xl py-2">{error}</h1>}
          <div className="my-2 lg:w-[40%] sm:w-[60%] w-[100%]">
            {loading ? (
              <LoadingButton
                className="w-[100%] py-4"
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
              >
                Singing up
              </LoadingButton>
            ) : (
              <Button
                type="submit"
                className="w-[100%] py-3"
                variant="outlined"
              >
                Singup
              </Button>
            )}
          </div>
          <div className="flex justify-between my-2 lg:w-[40%] sm:w-[60%] w-[100%]">
            <p className="text-xl text-green-500">Already have an account?</p>
            <Link className="text-xl text-blue-500" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
