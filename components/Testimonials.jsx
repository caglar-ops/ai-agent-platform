export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      title: 'CTO, TechVenture Inc',
      quote:
        'The AI Agent Platform transformed how we approach automation. We deployed our first agent in hours, not weeks.',
      avatar: '👩‍💼',
    },
    {
      name: 'Marcus Johnson',
      title: 'Founder, DataFlow Systems',
      quote:
        'Incredible platform. The support team is responsive and genuinely cares about our success. Highly recommended.',
      avatar: '👨‍💼',
    },
    {
      name: 'Emily Rodriguez',
      title: 'Head of Operations, CloudCore',
      quote:
        'We\'ve reduced operational overhead by 40% using intelligent agents. ROI was clear within the first month.',
      avatar: '👩‍🔬',
    },
  ]

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Loved by <span className="gradient-text">Innovators</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join thousands of teams using AI agents to scale their business.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200 dark:border-gray-700 card-shadow"
            >
              {/* Stars */}
              <div className="mb-4 text-2xl">⭐⭐⭐⭐⭐</div>

              {/* Quote */}
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Brands Section */}
        <div className="mt-20 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm uppercase tracking-widest mb-8">
            Trusted by leading companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['TechVenture', 'DataFlow', 'CloudCore', 'InnovateLabs', 'FutureScale'].map((brand, idx) => (
              <div key={idx} className="text-gray-400 dark:text-gray-600 font-semibold">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
