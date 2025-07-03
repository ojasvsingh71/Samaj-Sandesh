import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", { name, email, password });
            alert("Registered successfully! Please login.");
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="p-4 max-w-sm mx-auto mt-20 border rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <form onSubmit={handleRegister} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Register
                </button>
                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
}