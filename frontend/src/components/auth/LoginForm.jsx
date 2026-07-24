import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await loginUser(formData);
      await login(response.access_token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="login-email" className="mb-2 block text-sm font-medium leading-5 text-slate-300">Email</Label>
        <div className="relative">
          <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500" />
          <input id="login-email" name="username" type="email" value={formData.username} onChange={handleChange} placeholder="Enter your email" autoComplete="email" style={{ paddingLeft: "3rem", paddingRight: "1rem" }} className="h-12 w-full rounded-xl border border-slate-700/90 bg-slate-950/55 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10" required />
        </div>
      </div>

      <div>
        <Label htmlFor="login-password" className="mb-2 block text-sm font-medium leading-5 text-slate-300">Password</Label>
        <div className="relative">
          <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500" />
          <input id="login-password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Enter your password" autoComplete="current-password" style={{ paddingLeft: "3rem", paddingRight: "3rem" }} className="h-12 w-full rounded-xl border border-slate-700/90 bg-slate-950/55 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10" required />
          <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-2.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-800 hover:text-slate-200" aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
        <div className="flex items-center gap-2.5"><Checkbox id="remember" /><Label htmlFor="remember" className="cursor-pointer text-sm leading-5 text-slate-400">Remember me</Label></div>
        <button type="button" className="shrink-0 text-sm font-medium text-cyan-300 transition hover:text-cyan-200">Forgot Password?</button>
      </div>

      {error && <div className="rounded-xl border border-red-400/15 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>}
      <Button type="submit" disabled={loading} className="h-12 w-full rounded-xl bg-cyan-400 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/20 hover:bg-cyan-300">{loading ? "Signing in..." : "Login"}</Button>
      <p className="pt-0.5 text-center text-sm leading-5 text-slate-400">Don&apos;t have an account? <Link to="/register" className="font-semibold text-cyan-300 transition hover:text-cyan-200">Register</Link></p>
    </form>
  );
}

export default LoginForm;
