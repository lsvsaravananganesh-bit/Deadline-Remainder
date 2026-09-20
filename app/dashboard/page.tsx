"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Bell, CalendarDays, Check, CheckCircle2, Clock3, LogOut, Plus, Sparkles, Trash2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Deadline = {
  id: string;
  title: string;
  description: string | null;
  due_at: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "active" | "completed" | "cancelled";
  source: string;
};

const priorityLabel: Record<Deadline["priority"], string> = {
  low: "Low", medium: "Medium", high: "High", critical: "Critical"
};

function remaining(iso: string) {
  const ms = new Date(iso).getTime() - Date.now();
  if (ms <= 0) return "Overdue";
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours >= 24) return `${Math.floor(hours / 24)}d ${hours % 24}h`;
  if (hours) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export default function Dashboard() {
  const supabase = createClient();
  const router = useRouter();
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [modal, setModal] = useState(false);
  const [capture, setCapture] = useState("");
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [priority, setPriority] = useState<Deadline["priority"]>("medium");
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  async function load() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/auth");
      return;
    }
    setUserEmail(user.email ?? "");
    const { data } = await supabase.from("deadlines").select("*").eq("user_id", user.id).order("due_at", { ascending: true });
    setDeadlines((data as Deadline[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const active = useMemo(() => deadlines.filter(d => d.status === "active"), [deadlines]);
  const overdue = active.filter(d => new Date(d.due_at).getTime() < Date.now());
  const today = active.filter(d => new Date(d.due_at).toDateString() === new Date().toDateString());
  const completed = deadlines.filter(d => d.status === "completed");

  async function addDeadline() {
    if (!title || !due) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase.from("deadlines").insert({
      user_id: user.id, title, due_at: new Date(due).toISOString(), priority, source: "manual"
    }).select().single();
    if (!error && data) setDeadlines(v => [...v, data as Deadline].sort((a,b) => +new Date(a.due_at) - +new Date(b.due_at)));
    setTitle(""); setDue(""); setPriority("medium"); setModal(false);
  }

  async function extract() {
    if (!capture.trim()) return;
    const cleaned = capture.trim().replace(/\s+(by|on)\s+.+$/i, "");
    setTitle(cleaned || capture.trim());
    setDue(new Date(Date.now() + 86400000).toISOString().slice(0, 16));
    setModal(true);
  }

  async function complete(id: string) {
    await supabase.from("deadlines").update({ status: "completed", completed_at: new Date().toISOString() }).eq("id", id);
    setDeadlines(v => v.map(d => d.id === id ? { ...d, status: "completed" } : d));
  }

  async function remove(id: string) {
    await supabase.from("deadlines").delete().eq("id", id);
    setDeadlines(v => v.filter(d => d.id !== id));
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) return <main className="min-h-screen grid place-items-center text-zinc-500">Loading your deadlines…</main>;

  return (
    <main className="min-h-screen">
      <header className="border-b border-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-lime-300 text-black"><Bell size={18}/></div>
            <div><b>Deadline Guardian</b><p className="text-xs text-zinc-600">{userEmail}</p></div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setModal(true)} className="flex items-center gap-2 rounded-xl bg-lime-300 px-4 py-2 text-sm font-bold text-black"><Plus size={16}/> Add deadline</button>
            <button onClick={signOut} className="rounded-xl border border-zinc-800 p-2 text-zinc-400 hover:text-white" title="Sign out"><LogOut size={17}/></button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="grid gap-4 md:grid-cols-4">
          {[[Clock3,"Active",active.length],[AlertTriangle,"Overdue",overdue.length],[CalendarDays,"Today",today.length],[CheckCircle2,"Completed",completed.length]].map(([I,t,n]: any) =>
            <div className="glass rounded-2xl p-5" key={t}><div className="flex justify-between text-zinc-500"><span>{t}</span><I className="text-lime-300" size={18}/></div><div className="mt-3 text-3xl font-black">{n}</div></div>
          )}
        </div>

        <div className="glass mt-6 rounded-2xl p-5">
          <div className="flex items-center gap-2"><Sparkles size={18} className="text-lime-300"/><b>Quick deadline capture</b></div>
          <p className="mt-1 text-sm text-zinc-500">Paste a sentence. For now, Guardian extracts the task title and opens the due-date confirmation step.</p>
          <div className="mt-4 flex gap-2">
            <input value={capture} onChange={e=>setCapture(e.target.value)} placeholder="Submit the report by Friday at 5 PM" className="min-w-0 flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3"/>
            <button onClick={extract} className="rounded-xl bg-zinc-100 px-4 font-bold text-black">Extract</button>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-zinc-500">Your deadlines</h2>
          <div className="space-y-3">
            {active.length === 0 && <div className="glass rounded-2xl p-8 text-center text-zinc-500">No active deadlines yet. Add your first one.</div>}
            {active.map(d =>
              <article className="glass rounded-2xl p-4" key={d.id}>
                <div className="flex items-center gap-3">
                  <button onClick={()=>complete(d.id)} className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-700 hover:border-lime-300"><Check size={16}/></button>
                  <div className="min-w-0 flex-1">
                    <b>{d.title}</b>
                    <div className="mt-1 flex flex-wrap gap-2 text-sm text-zinc-500"><Clock3 size={14}/> {remaining(d.due_at)} remaining · {new Date(d.due_at).toLocaleString()}</div>
                  </div>
                  <span className="text-xs text-zinc-500">{priorityLabel[d.priority]}</span>
                  <button onClick={()=>remove(d.id)}><Trash2 size={16} className="text-zinc-600 hover:text-rose-400"/></button>
                </div>
              </article>
            )}
          </div>
        </section>
      </div>

      {modal && <div className="fixed inset-0 grid place-items-center bg-black/70 p-5">
        <div className="glass w-full max-w-lg rounded-2xl p-6">
          <div className="flex justify-between"><h2 className="text-xl font-bold">Confirm deadline</h2><button onClick={()=>setModal(false)}><X/></button></div>
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task name" className="mt-5 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3"/>
          <input type="datetime-local" value={due} onChange={e=>setDue(e.target.value)} className="mt-3 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3"/>
          <select value={priority} onChange={e=>setPriority(e.target.value as Deadline["priority"])} className="mt-3 w-full rounded-xl border border-zinc-800 bg-zinc-950 p-3">
            <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
          </select>
          <button onClick={addDeadline} className="mt-4 w-full rounded-xl bg-lime-300 py-3 font-bold text-black">Save deadline</button>
        </div>
      </div>}
    </main>
  );
}
