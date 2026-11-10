import React, { useState } from 'react';

const FAQAccordion = ({ faqs = [], title = 'Frequently asked questions' }) => {
  const [openIndex, setOpenIndex] = useState(null);

  if (!Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  return (
    <section
      className="rounded-3xl border border-black/5 bg-white/85 p-6 shadow-sm md:p-10"
      aria-labelledby="faq-title"
    >
      <h2
        id="faq-title"
        className="mb-6 text-center text-2xl font-bold text-neutral-900 md:text-3xl"
      >
        {title}
      </h2>

      <div className="mx-auto max-w-3xl divide-y divide-neutral-200">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const buttonId = `faq-button-${index}`;
          const panelId = `faq-panel-${index}`;

          return (
            <div key={`${faq.question}-${index}`} className="py-4">
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 rounded-xl px-1 py-3 text-left text-base font-semibold text-neutral-900 transition hover:text-[#b45309] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b45309]"
                >
                  <span>{faq.question}</span>
                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border border-neutral-300 text-lg transition ${
                      isOpen ? 'rotate-45 border-[#b45309] text-[#b45309]' : ''
                    }`}
                  >
                    +
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="px-1 pb-2 pt-1 text-sm leading-relaxed text-neutral-600 md:text-base"
              >
                {faq.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQAccordion;
