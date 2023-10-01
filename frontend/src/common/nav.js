import React from "react";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const navigate = useNavigate();

    const LogoutUser = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    const LoginUser = localStorage.getItem("token");
    const handleNavigateToLogin = () => {
        navigate("/login");
    };
    const handleNavigateToSignup = () => {
        navigate("/signup");
    };

    return (
        <div className="mx-auto w-11/12 flex justify-between my-4">
            <div className="md:w-[40%] flex justify-between">
                <Link to="/">Home</Link>
                <p>About</p>
                <p>Contact</p>
                <p>Blog</p>
            </div>
            <div className="md:w-[20%]">
                {LoginUser ? (
                    <div className="w-[50%] ml-auto">
                        <Button
                            type="submit"
                            onClick={LogoutUser}
                            className="w-[100%] py-3 "
                            variant="outlined"
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            onClick={handleNavigateToLogin}
                            className="w-[100%] py-3"
                            variant="outlined"
                        >
                            Login
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleNavigateToSignup}
                            className="w-[100%] py-3"
                            variant="outlined"
                        >
                            Signup
                        </Button></div>
                )}
            </div>
        </div>
    );
};

export default Nav;
