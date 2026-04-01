import { useState } from 'react'

export default function FAQ() {
  const [expanded, setExpanded] = useState(0)

  const faqs = [
    {
      question: 'What is the AI Agent Platform?',
      answer:
        'The AI Agent Platform is a comprehensive suite of tools for building, deploying, and managing autonomous AI agents. It provides pre-built templates, integrations, and a visual builder to get you started in minutes.',
    },
    {
      question: 'How do I get early access?',
      answer:
        'Simply join our waitlist by entering your email in the hero section above. We\'ll send you an invitation link when beta access becomes available for your account.',
    },
    {
      question: 'Do you offer a free trial?',
      answer:
        'Yes! All plans include a 14-day free trial with full access to features. No credit card is required to start.',
    },
    {
      question: 'Can I integrate with my existing tools?',
      answer:
        'Absolutely. Our platform supports integrations with popular tools like Slack, Zapier, HubSpot, and more. Enterprise plans offer custom integrations.',
    },
    {
      question: 'What kind of support do you offer?',
      answer:
        'We provide email support for all plans. Professional plans get priority support, and Enterprise customers get a dedicated account manager available 24/7.',
    },
    {
      question: 'Is there a contract or long-term commitment?',
      answer:
        'No contracts! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the start of your next billing cycle.',
    },
  ]

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Got questions? We've got answers.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 overflow-hidden card-shadow"
            >
              {/* Question */}
              <button
                onClick={() => setExpanded(expanded === index ? -1 : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white text-lg">{faq.question}</span>
                <span
                  className={`transform transition-transform ${expanded === index ? 'rotate-180' : ''}`}
                >
                  ▼
                </span>
              </button>

              {/* Answer */}
              {expanded === index && (
                <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 border-t-2 border-gray-200 dark:border-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <button className="btn-primary">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  )
}
