/* Concrete Velocity: utility states use the same mineral canvas, graphite type, lime signal, and direct campaign voice. */
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <main className="utility-page">
      <header className="utility-nav"><button className="utility-brand" onClick={() => setLocation("/")}><span className="utility-mark">↗</span><span>NIKE</span></button><span>NIKE MOTION / 404</span></header>
      <section className="utility-content">
        <div className="utility-index">OFF ROUTE / 404</div>
        <div className="utility-main"><span className="lime-dot" /><h1>That route<br /><em>isn't here.</em></h1><p>The page moved on. Your next move is still clear.</p><button className="lime-button" onClick={() => setLocation("/")}>Back to the edit <ArrowUpRight size={17} /></button></div>
        <div className="utility-foot"><span>KEEP THE MOTION</span><span>00 / 01</span></div>
      </section>
    </main>
  );
}
