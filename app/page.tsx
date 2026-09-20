import Link from "next/link";
import { ArrowRight, BellRing, BrainCircuit, CalendarClock, CheckCircle2, FileText, Mail, ShieldCheck, Zap } from "lucide-react";

const features = [
  { icon: BrainCircuit, title: "AI deadline capture", text: "Paste a message like “Submit the report by Friday at 5 PM” and turn it into a structured deadline." },
  { icon: BellRing, title: "Escalating alerts", text: "Get increasingly urgent reminders as the deadline approaches instead of one easy-to-ignore notification." },
  { icon: CalendarClock, title: "One deadline hub", text: "Keep assignments, projects, exams, applications and personal tasks in one place." },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_10%,rgba(190,242,100,.13),transparent_35%),radial-gradient(circle_at_10%_80%,rgba(163,230,53,.07),transparent_30%)]" />
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-lime-300 text-black shadow-[0_0_35px_rgba(190,242,100,.2)]"><BellRing size={20}/></div>
          <div><b className="text-lg">Deadline Guardian</b><p className="text-[10px] uppercase tracking-[.22em] text-zinc-600">Never miss a deadline</p></div>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
          <a href="#how" className="hover:text-white">How it works</a><a href="#features" className="hover:text-white">Features</a>
          <Link href="/auth" className="rounded-xl border border-zinc-800 px-4 py-2 text-white hover:border-lime-300">Sign in</Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-24 pt-20 lg:grid-cols-[1.1fr_.9fr] lg:pt-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/5 px-3 py-1.5 text-xs text-lime-200"><Zap size={13}/> Built for people who forget deadlines</div>
          <h1 className="max-w-4xl text-5xl font-black leading-[.98] tracking-tight sm:text-6xl lg:text-7xl">Your deadlines.<br/><span className="text-lime-300">Guarded.</span></h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400">Deadline Guardian turns scattered instructions into one intelligent deadline system — so the important date doesn’t disappear inside a chat, email, document or your memory.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/auth" className="group flex items-center justify-center gap-2 rounded-xl bg-lime-300 px-6 py-3.5 font-bold text-black transition hover:translate-y-[-1px]">Protect my deadlines <ArrowRight size={18} className="transition group-hover:translate-x-1"/></Link>
            <a href="#how" className="rounded-xl border border-zinc-800 px-6 py-3.5 text-center font-semibold text-white hover:border-zinc-600">See how it works</a>
          </div>
          <div className="mt-8 flex flex-wrap gap-5 text-xs text-zinc-500"><span className="flex items-center gap-2"><ShieldCheck size={15} className="text-lime-300"/> Private by account</span><span className="flex items-center gap-2"><CheckCircle2 size={15} className="text-lime-300"/> Built for students & professionals</span></div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-lime-300/5 blur-3xl"/>
          <div className="glass relative rounded-3xl p-4 shadow-2xl shadow-black/40">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/90 p-5">
              <div className="flex items-center justify-between"><div><p className="text-xs text-zinc-500">TODAY</p><h2 className="mt-1 text-xl font-bold">Deadline radar</h2></div><div className="rounded-lg bg-lime-300/10 p-2 text-lime-300"><BellRing size={18}/></div></div>
              <div className="mt-5 space-y-3">
                {[
                  ["Digital Electronics Assignment","5h 24m","HIGH"],
                  ["SIH Presentation","1d 3h","CRITICAL"],
                  ["Project documentation","3d 8h","MEDIUM"],
                ].map(([name,time,p])=><div key={name} className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4"><div className="flex justify-between gap-3"><b className="text-sm">{name}</b><span className="text-[10px] font-bold text-lime-300">{p}</span></div><p className="mt-2 text-sm text-zinc-500">Due in <span className="text-zinc-200">{time}</span></p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-800"><div className="h-full w-2/3 rounded-full bg-lime-300"/></div></div>)}
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-lime-300/15 bg-lime-300/5 p-3 text-xs text-zinc-400"><BellRing size={15} className="text-lime-300"/> Next alert: <b className="text-white">6 hours before</b></div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-zinc-900 bg-zinc-950/50">
        <div className="mx-auto max-w-7xl px-5 py-20"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.2em] text-lime-300">The problem we solve</p><h2 className="mt-3 text-3xl font-black sm:text-4xl">You shouldn’t need to remember to remember.</h2><p className="mt-4 text-zinc-500">The system is designed around the moment a deadline first appears — not the moment you finally remember it.</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">{features.map(({icon:Icon,title,text})=><div key={title} className="glass rounded-2xl p-6"><div className="grid h-11 w-11 place-items-center rounded-xl bg-lime-300/10 text-lime-300"><Icon size={20}/></div><h3 className="mt-5 font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{text}</p></div>)}</div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {[["01","Capture","Paste a message, add a deadline manually, or connect future sources like email and calendar.",FileText],["02","Guard","Guardian stores the deadline and tracks exactly how much time remains.",CalendarClock],["03","Alert","Reminders become more urgent as the deadline approaches.",Mail]].map(([n,t,d,I]:any)=><div key={n} className="rounded-2xl border border-zinc-900 p-6"><span className="text-sm font-black text-lime-300">{n}</span><I className="mt-8 text-zinc-600" size={22}/><h3 className="mt-5 text-xl font-bold">{t}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{d}</p></div>)}
        </div>
      </section>

      <section className="mx-5 mb-8 overflow-hidden rounded-3xl border border-lime-300/15 bg-lime-300/5">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-7 py-10 md:flex-row md:items-center md:px-10"><div><h2 className="text-2xl font-black">Stop losing deadlines to busy days.</h2><p className="mt-2 text-sm text-zinc-500">Create your first protected deadline in seconds.</p></div><Link href="/auth" className="flex items-center gap-2 rounded-xl bg-lime-300 px-5 py-3 font-bold text-black">Get started <ArrowRight size={17}/></Link></div>
      </section>

      <footer className="mx-auto flex max-w-7xl items-center justify-between px-5 py-8 text-xs text-zinc-600"><span>© 2026 Deadline Guardian</span><span>Built to make deadlines harder to forget.</span></footer>
    </main>
  );
}