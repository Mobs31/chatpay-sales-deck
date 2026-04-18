import { useState, useEffect, useRef } from "react";

const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0 }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`
    }}>
      {children}
    </div>
  );
};


const ROICalculator = () => {
  const [orders, setOrders] = useState(200);
  const [avg, setAvg] = useState(25);
  const [pct, setPct] = useState(15);
  const [switched, setSwitched] = useState(50);
  const uberCost = (orders * avg * pct) / 100;
  const chatpaySaving = (switched * avg * pct) / 100;
  const netGain = chatpaySaving - 39;
  return (
    <div style={{ background: "#0d0f1a", border: "1px solid #1a2035", borderRadius: 16, padding: "2rem" }}>
      <p style={{ color: "#6fa3ff", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Run Your Own Numbers</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem", marginBottom: "1.8rem" }}>
        {[
          { label: "Monthly orders via Uber Eats / Just Eat", value: orders, setter: setOrders, min: 50, max: 1000, step: 10 },
          { label: "Average order value (€)", value: avg, setter: setAvg, min: 10, max: 100, step: 5 },
          { label: "Platform commission (%)", value: pct, setter: setPct, min: 10, max: 30, step: 1 },
          { label: "Customers switching to WhatsApp", value: switched, setter: setSwitched, min: 10, max: orders, step: 5 },
        ].map(({ label, value, setter, min, max, step }) => (
          <div key={label}>
            <div style={{ color: "#8096c0", fontSize: "0.68rem", marginBottom: "0.3rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.4rem", marginBottom: "0.3rem" }}>
              {label.includes("€") ? `€${value}` : label.includes("%") ? `${value}%` : value}
            </div>
            <input type="range" min={min} max={max} step={step} value={value} onChange={e => setter(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#3b7ff6", cursor: "pointer" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", borderTop: "1px solid #151c2e", paddingTop: "1.5rem" }}>
        {[
          { label: "Monthly platform fees", value: `€${uberCost.toFixed(0)}`, sub: "you're paying them", color: "#e05252" },
          { label: "ChatPay subscription", value: "€39", sub: "flat monthly fee", color: "#4a5a80" },
          { label: "Net monthly gain", value: `€${netGain.toFixed(0)}`, sub: "straight to your pocket", color: "#4caf87" },
        ].map(({ label, value, sub, color }) => (
          <div key={label} style={{ background: "#111525", border: "1px solid #151c2e", borderRadius: 10, padding: "1rem", textAlign: "center" }}>
            <div style={{ color: "#7a8db5", fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.4rem" }}>{label}</div>
            <div style={{ color, fontWeight: 700, fontSize: "1.55rem", marginBottom: "0.2rem" }}>{value}</div>
            <div style={{ color: "#6a7aa0", fontSize: "0.65rem" }}>{sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ChatPaySalesDeck() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setTimeout(() => setHeroVisible(true), 120); }, []);

  const S = { maxWidth: 840, margin: "0 auto", padding: "4rem 1.5rem" };
  const BLUE = "#3b7ff6";
  const BLUE_L = "#6fa3ff";
  const BORDER = "#131a2e";
  const CARD = "#0d0f1a";

  const Tag = ({ label }) => (
    <p style={{ color: BLUE, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, marginBottom: "0.6rem" }}>{label}</p>
  );
  const H2 = ({ children }) => (
    <h2 style={{ fontWeight: 800, fontSize: "clamp(1.75rem, 4vw, 2.4rem)", lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: "1rem" }}>{children}</h2>
  );

  return (
    <div style={{ background: "#09090f", color: "#e0e6f5", fontFamily: "'Inter', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; background: #09090f; }
        ::-webkit-scrollbar-thumb { background: #3b7ff6; border-radius: 2px; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, borderBottom: `1px solid ${BORDER}`, background: "rgba(9,9,15,0.9)", backdropFilter: "blur(14px)", padding: "0 1.5rem" }}>
        <div style={{ maxWidth: 840, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
          <span style={{ fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>
            <span style={{ color: "#fff" }}>Chat</span><span style={{ color: BLUE }}>Pay</span>
          </span>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: "relative", borderBottom: `1px solid ${BORDER}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 55% 30%, rgba(59,127,246,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ ...S, paddingTop: "5.5rem", paddingBottom: "5.5rem" }}>
          <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(28px)", transition: "all 0.85s cubic-bezier(.22,1,.36,1)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", background: "#0c1020", border: `1px solid ${BORDER}`, borderRadius: 100, padding: "0.28rem 0.9rem", marginBottom: "2rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: BLUE, display: "inline-block", boxShadow: `0 0 8px ${BLUE}` }} />
              <span style={{ color: "#8096c0", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>AI-Powered Commerce in Chat</span>
            </div>
            <h1 style={{ fontWeight: 900, fontSize: "clamp(2.6rem, 7vw, 4rem)", lineHeight: 1.08, letterSpacing: "-0.035em", color: "#fff", marginBottom: "1.4rem" }}>
              AI That <span style={{ color: BLUE_L }}>Sells</span><br />For You
            </h1>
            <p style={{ color: "#8096c0", fontSize: "1.05rem", lineHeight: 1.75, maxWidth: 500, marginBottom: "2.5rem" }}>
              Deploy AI sales agents inside Telegram &amp; WhatsApp. Your customers browse, shop, and pay — all without leaving the chat.
            </p>

          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={S}>
          <FadeIn>
            <Tag label="The Problem" />
            <H2>Every Uber Eats order costs you <span style={{ color: BLUE_L }}>more than you think.</span></H2>
            <p style={{ color: "#8096c0", lineHeight: 1.8, maxWidth: 560, marginBottom: "2.5rem", fontSize: "0.93rem" }}>
              Platforms like Uber Eats and Just Eat charge 15–20% per order. On top of that, they own the customer relationship — not you. Your regulars are their users. You have no way to reach them directly, reward them, or bring them back without paying again.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {[
              { stat: "15–20%", label: "Commission per order paid to Uber Eats / Just Eat" },
              { stat: "€0", label: "Customer data you receive from these platforms" },
              { stat: "Forever", label: "How long they keep that customer as theirs" },
            ].map(({ stat, label }, i) => (
              <FadeIn key={stat} delay={i * 0.1}>
                <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.5rem" }}>
                  <div style={{ fontWeight: 800, fontSize: "2.1rem", color: "#e05252", marginBottom: "0.5rem", letterSpacing: "-0.02em" }}>{stat}</div>
                  <div style={{ color: "#7a8db5", fontSize: "0.82rem", lineHeight: 1.55 }}>{label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* SOLUTION */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={S}>
          <FadeIn>
            <Tag label="The Solution" />
            <H2>From Chat to Checkout <span style={{ color: BLUE_L }}>in Seconds.</span></H2>
            <p style={{ color: "#8096c0", lineHeight: 1.8, maxWidth: 560, marginBottom: "2.5rem", fontSize: "0.93rem" }}>
              ChatPay is a <strong style={{ color: "#7a9acc" }}>retention and margin recovery tool</strong> that builds a direct channel between you and your existing customers — so every order goes through you, not a middleman.
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1rem" }}>
            {[
              { icon: "💬", title: "Conversational Ordering", body: "Customers message your WhatsApp, browse the menu, get AI recommendations, and order — all in one chat. No redirects. No apps." },
              { icon: "📲", title: "You Own the Relationship", body: "Every customer who orders through ChatPay is yours. Broadcast promos, announce dishes, run deals — directly to them, forever." },
              { icon: "💶", title: "Zero Commission", body: "Flat €39/month. Every euro from every order goes straight to you — no cuts, no hidden fees, no surprises." },
              { icon: "🔁", title: "Built-In Loyalty", body: "Create habits, not one-offs. 'Order 5 times, get a free dessert' — keeps customers returning through your channel, not Uber's." },
            ].map(({ icon, title, body }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.5rem", height: "100%" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.98rem", color: "#c8d4f0", marginBottom: "0.5rem" }}>{title}</div>
                  <div style={{ color: "#7a8db5", fontSize: "0.82rem", lineHeight: 1.65 }}>{body}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ROI */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={S}>
          <FadeIn>
            <Tag label="The Numbers" />
            <H2>Build AI Sales Assistants <span style={{ color: BLUE_L }}>and keep every cent.</span></H2>
            <p style={{ color: "#8096c0", lineHeight: 1.8, maxWidth: 520, marginBottom: "2rem", fontSize: "0.93rem" }}>
              No setup. No code. Just plug in your store and start selling. Adjust the sliders to see your real monthly savings.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}><ROICalculator /></FadeIn>
        </div>
      </div>

      {/* COMPARISON */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={S}>
          <FadeIn>
            <Tag label="How We Compare" />
            <H2>ChatPay vs. the alternatives.</H2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                    {["", "Uber Eats / Just Eat", "Your Website", "ChatPay"].map((h, i) => (
                      <th key={h} style={{ padding: "0.8rem 1rem", textAlign: i === 0 ? "left" : "center", color: i === 3 ? BLUE : "#5a6a90", fontWeight: i === 3 ? 700 : 500, background: i === 3 ? "rgba(59,127,246,0.07)" : "transparent" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Commission per order", "15–20%", "0%", "0%"],
                    ["Monthly fee", "None", "Hosting costs", "€39/month"],
                    ["Brings new customers", "✓ Strong", "✗ Limited", "Retention-focused"],
                    ["You own the customer data", "✗ No", "✓ Yes", "✓ Yes"],
                    ["Direct marketing to customers", "✗ No", "Limited", "✓ WhatsApp broadcasts"],
                    ["AI handles every conversation", "✗ No", "✗ No", "✓ Yes"],
                    ["Loyalty programme built in", "✗ No", "Only if built", "✓ Yes"],
                    ["Checkout inside the chat", "✗ No", "✗ No", "✓ Yes"],
                  ].map(([label, ...vals], ri) => (
                    <tr key={label} style={{ borderBottom: "1px solid #0e1220", background: ri % 2 === 0 ? "#0b0d15" : "transparent" }}>
                      <td style={{ padding: "0.85rem 1rem", color: "#7a8db5" }}>{label}</td>
                      {vals.map((v, vi) => (
                        <td key={vi} style={{ padding: "0.85rem 1rem", textAlign: "center", fontWeight: vi === 2 ? 600 : 400, color: vi === 2 ? BLUE_L : v.startsWith("✓") ? "#4caf87" : v.startsWith("✗") ? "#5a6a90" : "#6080a0", background: vi === 2 ? "rgba(59,127,246,0.05)" : "transparent" }}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={S}>
          <FadeIn>
            <Tag label="Common Questions" />
            <H2>The hard questions, <span style={{ color: BLUE_L }}>answered directly.</span></H2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
            {[
              { q: "Will ChatPay bring me new customers?", a: "Honestly, not in the way Uber Eats does. And that's exactly why it works.\n\nUber Eats brings you customers but takes 20–30% of every order. ChatPay does the exact opposite. It helps you bring those customers back, sell to them directly, and keep the full profit margin.\n\nSo instead of constantly paying to chase new customers, you finally start making real money from the ones you already have." },
              { q: "My customers already order from my website. Why do I need this?", a: "Your website works. But it only captures demand. ChatPay helps you create it.\n\nA website depends on customers already knowing what they want and going out of their way to order. Most don't — they hesitate, they browse, they leave. That's where you lose sales.\n\nChatPay brings ordering into the conversation, right inside the messaging apps your customers already use daily. It helps you take orders faster with no searching or friction, increase order value by recommending drinks, sides, or upgrades at the right moment, and bring customers back with simple offers sent directly to people who've already ordered.\n\nYour website is your storefront. ChatPay is your sales engine." },
              { q: "Is it worth it?", a: "Let's keep it simple.\n\nIf just 20 orders a month move off Uber Eats, you're no longer paying the 20% commission. That's about €5 saved per order, or €100 per month.\n\nChatPay is €39/month (or €29 on our partner plan) — so you're already up €60+ from a very small shift.\n\nEverything after that is pure upside." },
            ].map(({ q, a }, i) => (
              <FadeIn key={q} delay={i * 0.1}>
                <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "1.5rem" }}>
                  <div style={{ fontWeight: 700, fontSize: "0.98rem", color: "#c0ccec", marginBottom: "0.6rem" }}>{q}</div>
                  <div style={{ color: "#7a8db5", fontSize: "0.84rem", lineHeight: 1.85, whiteSpace: "pre-line" }}>{a}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div style={S}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <Tag label="Pricing" />
              <H2>Simple, transparent pricing.</H2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.2rem", maxWidth: 700, margin: "0 auto" }}>
              {/* Pay As You Go */}
              <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "2rem" }}>
                <div style={{ color: "#8096c0", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Pay As You Go</div>
                <div style={{ fontWeight: 900, fontSize: "3rem", color: "#fff", lineHeight: 1, letterSpacing: "-0.04em" }}>€39</div>
                <div style={{ color: "#7a8db5", fontSize: "0.8rem", marginBottom: "0.6rem" }}>per month</div>
                <div style={{ color: "#8096c0", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Fully flexible, no lock-in contracts. Cancel anytime.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.8rem" }}>
                  {[
                    "AI sales agent on WhatsApp & Telegram",
                    "Full menu / product catalogue integration",
                    "Zero commission on every order",
                    "Customer broadcast messaging",
                    "Loyalty programme tools",
                    "Dedicated onboarding support",
                  ].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#8096c0", fontSize: "0.84rem" }}>
                      <span style={{ color: BLUE, fontWeight: 700 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <a href="https://chatpay.ie" target="_blank" rel="noreferrer"
                  style={{ display: "block", color: BLUE, padding: "0.85rem", borderRadius: 10, fontWeight: 600, fontSize: "0.88rem", textAlign: "center", textDecoration: "none", border: `1px solid ${BORDER}` }}>
                  chatpay.ie →
                </a>
              </div>
              {/* Long-Term */}
              <div style={{ background: CARD, border: `1px solid ${BLUE}`, borderRadius: 16, padding: "2rem", position: "relative" }}>
                <div style={{ position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: BLUE, color: "#fff", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.25rem 0.8rem", borderRadius: 100 }}>
                  Best Value
                </div>
                <div style={{ color: BLUE_L, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1rem" }}>Long-Term Partner</div>
                <div style={{ fontWeight: 900, fontSize: "3rem", color: "#fff", lineHeight: 1, letterSpacing: "-0.04em" }}>€29</div>
                <div style={{ color: "#7a8db5", fontSize: "0.8rem", marginBottom: "0.6rem" }}>per month</div>
                <div style={{ color: "#8096c0", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Available on a 2-year plan. Save €240/year vs. month-to-month.
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.8rem" }}>
                  {[
                    "Everything in Pay As You Go",
                    "Priority support",
                    "Early access to new features",
                    "Dedicated account manager",
                  ].map(f => (
                    <div key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "#8096c0", fontSize: "0.84rem" }}>
                      <span style={{ color: BLUE, fontWeight: 700 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <a href="https://chatpay.ie" target="_blank" rel="noreferrer"
                  style={{ display: "block", background: BLUE, color: "#fff", padding: "0.85rem", borderRadius: 10, fontWeight: 700, fontSize: "0.88rem", textAlign: "center", textDecoration: "none" }}>
                  chatpay.ie →
                </a>
              </div>
            </div>
            <p style={{ color: "#5a6a90", fontSize: "0.74rem", lineHeight: 1.6, textAlign: "center", marginTop: "1.5rem" }}>
              Built in Ireland for Irish businesses. The CHQ Building, Custom House Quay, North Wall, Dublin.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: "1.8rem", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontWeight: 700, fontSize: "0.85rem" }}>
            <span style={{ color: "#fff" }}>Chat</span><span style={{ color: BLUE }}>Pay</span>
          </span>
        <span style={{ color: "#5a6a90", fontSize: "0.7rem", letterSpacing: "0.04em" }}>© 2025 ChatPay. AI commerce, reimagined.</span>
      </div>
    </div>
  );
}
