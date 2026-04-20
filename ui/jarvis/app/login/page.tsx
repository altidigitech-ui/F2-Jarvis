"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      setError(data.error || "Erreur de connexion");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#020612" }}>
      <div
        className="w-full max-w-sm p-8 rounded-2xl"
        style={{
          background: "rgba(5, 8, 18, 0.6)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0, 255, 180, 0.15)",
        }}
      >
        <div className="text-center mb-8">
          <div className="text-xs font-mono text-[#00ffb4] mb-2">◆ JARVIS</div>
          <div className="text-[10px] font-mono text-slate-600 tracking-widest">
            FOUNDRYTWO · ACCÈS RESTREINT
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-mono text-slate-500 mb-1 block">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-[#00ffb4] outline-none transition-colors"
              required
              autoFocus
            />
          </div>
          <div>
            <label className="text-[10px] font-mono text-slate-500 mb-1 block">MOT DE PASSE</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-[#00ffb4] outline-none transition-colors"
              required
            />
          </div>

          {error && (
            <div className="text-[11px] text-red-400 font-mono">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #00ffb4, #00b890)",
              color: "#020612",
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
