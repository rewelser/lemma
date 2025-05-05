import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import PrimaryButton from "../components/PrimaryButton";
import InputField from "../components/InputField";
import ThemeToggle from "../components/ThemeToggle"; // adjust path if needed

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const [email, setEmail] = useState(""); // stub, could be prefilled from user info
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleLogout = () => {
        authContext?.logout();
        navigate("/login");
    };

    const handleEmailChange = async () => {
        if (!email) return alert("Email cannot be empty.");
        // TODO: call backend API
        alert(`Would update email to: ${email}`);
      };
    
      const handlePasswordChange = async () => {
        if (!newPassword || newPassword !== confirmPassword) {
          return alert("Passwords do not match or are empty.");
        }
        // TODO: call backend API
        alert(`Would change password to: ${newPassword}`);
      };

    return (
        <div className="w-full flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4">
            <div className="w-full max-w-md bg-[var(--color-soft)] shadow-md rounded-(--border-radii) p-6 text-center text-[var(--color-text)]">
                <h1 className="text-2xl font-(--font-weight-header) mb-4">
                    Welcome to Your Profile
                </h1>
                <p className="mb-6">
                    Manage your account settings below.
                </p>
                {/* Theme toggle */}
                <div className="mb-6">Site Theme:&nbsp;&nbsp;
                    <ThemeToggle />
                </div>

                {/* Change Email */}
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Change Email</label>
                    <InputField
                        type="email"
                        placeholder="New email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PrimaryButton text="Update Email" onClick={handleEmailChange} />
                </div>

                {/* Change Password */}
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">Change Password</label>
                    <InputField
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <InputField
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <PrimaryButton text="Update Password" onClick={handlePasswordChange} />
                </div>

                {/* Logout */}
                <div className="mt-6">
                    <PrimaryButton text="Logout" onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
};

export default Profile;
