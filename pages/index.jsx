import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Pricing from '../components/Pricing'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function Home({ darkMode, toggleDarkMode }) {
  return (
    <>
      <Head>
        <title>AI Agent Platform - Early Access Waitlist</title>
        <meta name="description" content="The next generation platform for building, deploying, and scaling AI agents. Join our waitlist for early access." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AI Agent Platform - Early Access Waitlist" />
        <meta property="og:description" content="The next generation platform for building, deploying, and scaling AI agents." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>" />
      </Head>

      <div className={darkMode ? 'dark' : ''}>
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <section id="pricing">
          <Pricing />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="faq">
          <FAQ />
        </section>
        <Footer />
      </div>
    </>
  )
}
