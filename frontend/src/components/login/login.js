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
import { api } from "../../constant";
import { Link } from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [userdata, setUserData] = useState({
        email: "",
        password: "",
    });
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
            const url = `${api}/auth`;
            const result = await axios.post(url, userdata);
            localStorage.setItem("token", result.data);
            window.location = "/";
            setLoading(false);
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
        <div className="mx-auto w-11/12 ">
            <h1>login in page </h1>
            <form onSubmit={submitdata}>
                <div className="flex flex-col lg:w-[40%] sm:w-[60%] w-[100%]">
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
                            Loging
                        </LoadingButton>
                    ) : (
                        <Button type="submit" className="w-[100%] py-3" variant="outlined">
                            LogIn
                        </Button>
                    )}
                </div>
                <div className="flex justify-between my-2 lg:w-[40%] sm:w-[60%] w-[100%]">
                    <p className="text-xl text-red-500">Don't have an account?</p>
                    <Link className="text-xl text-green-500" to="/signup">
                        Register
                    </Link>
                </div>
            </form>
        </div>
    );
}
