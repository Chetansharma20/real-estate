"use client";

import Image from "next/image";

export default function AboutPage() {
  const PARTNERS = [
    {
      name: "Kartik Mudaliar",
      role: "Director & Co-Founder",
      image: "/kartik mudaliar.png",
      description:
        "With 30+ years of real estate experience, Kartik Mudaliar brings deep industry expertise and strategic leadership, driving growth with a customer-first approach.",
    },
    {
      name: "Akshay Mithiya",
      role: "Director & Co-Founder",
      image: "/akshay mithiya.png",
      description:
        "Years of real estate expertise, driven by trust, integrity, and client-first advisory. Also the Real Estate Developer behind Trishika Elite, delivering quality developments with a commitment to excellence.",
    },
    {
      name: "Somen Ghosh",
      role: "Managing Director & Co-Founder",
      image: "/somesh ghosh.png",
      description:
        "20+ years of expertise in housing finance and real estate, delivering trusted, client-first advisory.",
    },
    {
      name: "Shyam Mithiya",
      role: "Chief Operating Officer",
      image: "/shyam mithiya.png",
      description:
        "Chartered Accountancy (CA) background and Co-founder of a 100X.VC-backed startup, with expertise in finance, strategy, and operations.",
    },
    {
      name: "Sandeep Raut",
      role: "Business Head",
      image: "/sandeep raut.png",
      description:
        "With 19+ years of real estate experience in sales & marketing, Sandeep Raut specializes in business development, sales strategy, and team leadership, driving growth with a client-first approach.",
    },
  ];

  const PRINCIPLES = [
    {
      numeral: "I",
      title: "Excellence",
      description:
        "We set the highest benchmarks in property advisory, ensuring a premium service experience for commercial and luxury residential clients.",
    },
    {
      numeral: "II",
      title: "Transparency",
      description:
        "Honest evaluations, transparent legal routing, and clear base price structures without hidden advisory charges.",
    },
    {
      numeral: "III",
      title: "Bespoke Curation",
      description:
        "Tailor-made property matches aligned to your exact location, budget, and preferences — sea view, city view, ready-to-move.",
    },
  ];

  return (
    <div className="bg-[#F4F6F9] min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 border-b border-[#172033]/10">
        <div className="max-w-5xl mx-auto">
          <span className="block text-[11px] tracking-[0.35em] uppercase text-[#C9A84C] font-mono font-semibold mb-4">
            Your Personal Real Estate Advisor
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#172033] font-semibold leading-[1.15] max-w-3xl">
            At Bricksage, we believe buying a property is one of life&apos;s biggest decisions, not just a transaction.
          </h1>
          <div className="mt-8 space-y-5 text-[#172033]/70 text-base sm:text-lg font-light max-w-2xl leading-relaxed">
            <p>
              With over 30 years of real estate experience, we help you make informed decisions with honest advice, market expertise, and complete transparency.
            </p>
            <p>
              We don&apos;t start with projects—we start with you. We understand your goals, compare the right options, and recommend only what we truly believe is the best fit.
            </p>
            <p className="font-medium text-[#172033]/90">
              No pressure. No sales tactics. Just trusted guidance to help you make the smartest real estate decision with confidence.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 border-t border-[#172033]/10 pt-6 max-w-2xl gap-6">
            {[
              ["30+", "Years of Experience"],
              ["500+", "Clients Advised"],
              ["1000+", "Properties Evaluated"],
            ].map(([num, label]) => (
              <div key={label} className="text-center sm:text-left">
                <div className="font-serif text-3xl sm:text-4xl text-[#172033]">
                  {num}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#172033]/50">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="block text-[11px] tracking-[0.35em] uppercase text-[#C9A84C] font-mono font-semibold mb-3">
              Leadership
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#172033] font-semibold">
              The Partners
            </h2>
          </div>

          <div>
            {PARTNERS.map((p, i) => (
              <div
                key={p.name}
                className={`group flex flex-col ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } gap-8 md:gap-14 items-center border-t border-[#172033]/10 py-12 first:border-t-0`}
              >
                <div className="relative w-[280px] sm:w-[320px] md:w-[360px] shrink-0 overflow-hidden mx-auto md:mx-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-auto group-hover:scale-105 transition-all duration-700 rounded-lg"
                  />
                </div>

                <div className="flex-1 text-center md:text-left">
                  <span className="font-mono text-xs text-[#C9A84C] tracking-widest">
                    PARTNER — {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[#172033] font-semibold">
                    {p.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[#172033]/50">
                    {p.role}
                  </p>
                  <p className="mt-4 text-[#172033]/70 leading-relaxed font-light max-w-xl mx-auto md:mx-0">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 bg-[#172033] text-[#F4F6F9]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-serif italic text-xl sm:text-2xl text-[#C9A84C]">
            Every property has a price.
          </p>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold mt-1 mb-10">
            The right decision has value.
          </p>

          <p className="text-left sm:text-justify text-[#F4F6F9]/70 leading-relaxed font-light">
            <span className="float-left font-serif text-6xl leading-[0.8] pr-3 pt-1 text-[#C9A84C]">
              A
            </span>
            t Bricksage, we exist to help people make decisions they will
            never regret. With over thirty years of experience in the real
            estate industry, we&apos;ve learned that buying a home isn&apos;t
            about finding the most expensive property or the biggest
            amenities — it&apos;s about finding the place that fits your
            life, your future, and your ambitions.
          </p>

          <p className="mt-6 text-[#F4F6F9]/70 leading-relaxed font-light text-left sm:text-justify">
            That&apos;s why we don&apos;t begin with projects — we begin with
            people. We listen before we recommend, we understand before we
            advise, and we compare before we conclude. If we wouldn&apos;t
            recommend a property to our own family, we won&apos;t recommend
            it to you.
          </p>

          <p className="mt-8 font-serif font-semibold text-lg sm:text-xl border-t border-[#F4F6F9]/15 pt-8">
            We don&apos;t sell property. We help you make the smartest real
            estate decision of your life.
          </p>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="block text-[11px] tracking-[0.35em] uppercase text-[#C9A84C] font-mono font-semibold mb-3">
            What Guides Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#172033] font-semibold mb-12">
            Our Principles
          </h2>

          <div>
            {PRINCIPLES.map((v) => (
              <div
                key={v.numeral}
                className="flex gap-4 sm:gap-8 items-start sm:items-baseline border-t border-[#172033]/10 py-8 first:border-t-0"
              >
                <span className="font-serif text-3xl text-[#C9A84C] w-10 shrink-0">
                  {v.numeral}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-[#172033] font-semibold">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[#172033]/60 font-light leading-relaxed max-w-2xl">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-[#172033]/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#172033] font-semibold">
            Ready to make your next move?
          </h2>
          <p className="mt-3 text-[#172033]/60 font-light">
            Speak with an advisor before you decide — no pressure, no hidden
            agenda.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-block border border-[#172033] px-8 py-3 font-mono text-xs uppercase tracking-widest text-[#172033] hover:bg-[#172033] hover:text-[#F4F6F9] transition-colors duration-300"
          >
            Speak with an Advisor
          </a>
        </div>
      </section>
    </div>
  );
}