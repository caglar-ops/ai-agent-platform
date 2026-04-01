export default function Pricing() {
  const tiers = [
    {
      name: 'Starter',
      price: '$99',
      period: '/month',
      description: 'Perfect for trying out AI agents',
      features: [
        'Up to 3 AI agents',
        '1,000 monthly requests',
        'Basic analytics',
        'Email support',
        'Community access',
      ],
      cta: 'Start Free Trial',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$499',
      period: '/month',
      description: 'For scaling your AI operations',
      features: [
        'Unlimited AI agents',
        '100,000 monthly requests',
        'Advanced analytics & insights',
        'Priority email & chat support',
        'Custom integrations',
        'Team collaboration tools',
      ],
      cta: 'Get Started',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large-scale deployments',
      features: [
        'Unlimited everything',
        'Dedicated account manager',
        'Custom SLA & support',
        'On-premise deployment',
        'API access & webhooks',
        'Advanced security features',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ]

  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-2xl p-8 card-shadow transition-transform hover:scale-105 ${
                tier.highlighted
                  ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white ring-2 ring-indigo-600'
                  : 'bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              {/* Recommended Badge */}
              {tier.highlighted && (
                <div className="inline-block mb-4 px-3 py-1 rounded-full bg-white bg-opacity-20 text-sm font-semibold">
                  Most Popular
                </div>
              )}

              {/* Tier Name */}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className={`text-sm mb-4 ${tier.highlighted ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'}`}>
                {tier.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className={`ml-2 text-sm ${tier.highlighted ? 'text-indigo-100' : 'text-gray-600 dark:text-gray-400'}`}>
                  {tier.period}
                </span>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 rounded-lg font-semibold mb-6 transition-all ${
                  tier.highlighted
                    ? 'bg-white text-indigo-600 hover:bg-gray-100'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600'
                }`}
              >
                {tier.cta}
              </button>

              {/* Features List */}
              <ul className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-3 text-lg">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
