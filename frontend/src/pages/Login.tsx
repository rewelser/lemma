import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../auth";
import { AuthContext } from "../context/AuthContext";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import ThemeToggle from "../components/ThemeToggle"; // adjust path if needed

const Login: React.FC = () => {
    // return <div><h1>Login Page</h1></div>; // empty page
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const handleLogin = async () => {
        setError("");
        const token = await login(username, password);
        if (token && authContext) {
            authContext.login(token);
            navigate("/profile");
        } else {
            setError("invalid credentials. Please try again.");
        }
    };
// outer div used to have bg-gray-100 dark:bg-brand-chiolet
// inner div used to have bg-primary-light bg-white
// h1 inside that used to have text-black
    return (
    <div className="w-full flex min-h-screen items-center justify-center px-4 bg-[var(--color-bg)] text-[var(--color-text)]">
        <div className="w-full max-w-md bg-primary-light shadow-md rounded-(--border-radii) p-6 bg-[var(--color-soft)]">
            <h1 className="text-2xl font-(--font-weight-header) text-center mb-4">Login</h1>
            {error && <p className="font-[var(--font-weight-error)] text-[var(--color-text-error)] text-center">{error}</p>}
            <InputField
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <PrimaryButton text="Login" onClick={handleLogin} className="w-full" />
            <div className="mt-4 text-center">
                <p className="text-sm">
                    Don’t have an account?{" "}
                    <span
                    className="text-[var(--color-accent)] hover:underline cursor-pointer"
                    onClick={() => navigate("/register")}
                    >
                    Register here
                    </span>
                </p>
            </div>

        </div>
        <ThemeToggle />
    </div>
    );
  };

  
  export default Login;
  