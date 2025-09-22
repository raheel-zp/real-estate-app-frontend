import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", { name, email, password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto p-6">
      <h2 className="text-xl mb-4">Register</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full mb-2 p-2 border" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2 border" />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full mb-2 p-2 border" />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
