"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Bell, Loader2, ShieldCheck } from "lucide-react";

export default function AuthPage() {
  const supabase = createClient();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");

    const result =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setBusy(false);

    if (result.error) {
      setMessage(result.error.message);
      return;
    }

    if (mode === "signup") {
      setMessage("Account created. Check your email if confirmation is enabled, then sign in.");
      setMode("signin");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <main className="min-h-screen grid place-items-center px-5">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-lime-300 text-black"><Bell size={20} /></div>
          <div><b className="text-lg">Deadline Guardian</b><p className="text-xs text-zinc-500">Never miss a deadline again.</p></div>
        </div>

        <div className="glass rounded-3xl p-7">
          <div className="mb-6 flex items-center gap-2 text-sm text-zinc-400"><ShieldCheck size={17} className="text-lime-300" /> Your deadlines stay tied to your account.</div>
          <h1 className="text-3xl font-black">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
          <p className="mt-2 text-sm text-zinc-500">{mode === "signin" ? "Sign in to manage your deadlines." : "Start building your personal deadline hub."}</p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 outline-none focus:border-lime-300" />
            <input required minLength={6} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (6+ characters)" className="w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3 outline-none focus:border-lime-300" />
            {message && <p className="rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300">{message}</p>}
            <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime-300 py-3 font-bold text-black disabled:opacity-60">
              {busy && <Loader2 size={16} className="animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMessage(""); }} className="mt-5 w-full text-sm text-zinc-500 hover:text-white">
            {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </main>
  );
}
