import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../auth";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";


const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const success = await register(username, email, password);
        if (success) {
            navigate("/login"); // Redirect to login after successful registration
        } else {
            setError("Registration failed. Try again.");
        }
    };

    return (
        <div className="w-full flex min-h-screen items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] px-4">
            <div className="w-full max-w-md shadow-md rounded-(--border-radii) p-6 bg-[var(--color-soft)]">
                <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
                {error && <p className="font-[var(--font-weight-error)] text-[var(--color-text-error)] text-center">{error}</p>}
                <InputField
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <InputField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputField
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <PrimaryButton text="Register" onClick={handleRegister} className="w-full" />
                <div className="mt-4 text-center">
                    <p className="text-sm">
                        Already have an account?{" "}
                        <span
                        className="text-[var(--color-accent)] hover:underline cursor-pointer"
                        onClick={() => navigate("/login")}
                        >
                        Log in here
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Register;
