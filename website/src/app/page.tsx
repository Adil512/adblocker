'use client'
import { Shield, Zap, Lock, LineChart, Chrome, Download } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [activeBrowser, setActiveBrowser] = useState('chrome')

  const browsers = [
    { id: 'chrome', name: 'Chrome', icon: Chrome },
    { id: 'firefox', name: 'Firefox', icon: Shield },
    { id: 'edge', name: 'Edge', icon: Shield },
    { id: 'brave', name: 'Brave', icon: Shield }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-black/20 backdrop-blur-md z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <a href="https://adblocker.dev/" className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-blue-500" />
                <span className="text-white font-bold text-xl">AdBlocker</span>
              </a>
              <div className="hidden md:flex space-x-6">
                <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
                <a href="#browsers" className="text-gray-300 hover:text-white transition">Browsers</a>
                <a href="#stats" className="text-gray-300 hover:text-white transition">Statistics</a>
                <a href="#faq" className="text-gray-300 hover:text-white transition">FAQ</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://github.com/Adil512/adblocker" 
                 className="text-gray-300 hover:text-white transition">GitHub</a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                Download Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with 3D Animation */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            The Ultimate <span className="text-blue-500">Ad Blocker</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the web without distractions. Block ads, trackers, and malware across all major browsers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
  <a 
    href="https://adblocker.dev/" 
    className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105"
  >
    <Download className="w-5 h-5 group-hover:animate-bounce" />
    Install Ad Blocker
  </a>
  <a 
    href="https://adblocker.dev/"
    className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg transition transform hover:scale-105"
  >
    Learn More
  </a>
</div>
        </div>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.1
              }}
            >
              <Shield className="w-12 h-12 text-blue-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Browser Selection */}
      <section id="browsers" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Choose Your Browser
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {browsers.map((browser) => (
              <button
                key={browser.id}
                onClick={() => setActiveBrowser(browser.id)}
                className={`p-6 rounded-xl transition transform hover:scale-105 ${
                  activeBrowser === browser.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <browser.icon className="w-8 h-8 mx-auto mb-2" />
                <span className="block text-center">{browser.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Stats Section */}
      <section id="stats" className="py-24 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <StatsCard
              icon={<Shield className="w-12 h-12 text-blue-500" />}
              number="1B+"
              label="Ads Blocked"
            />
            <StatsCard
              icon={<Lock className="w-12 h-12 text-blue-500" />}
              number="100M+"
              label="Users Protected"
            />
            <StatsCard
              icon={<Zap className="w-12 h-12 text-blue-500" />}
              number="50%"
              label="Faster Browsing"
            />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Advanced Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <FeatureCard
                key={i}
                title="Smart Detection"
                description="Advanced algorithms to detect and block even the most sophisticated ads"
                icon={<Shield className="w-6 h-6 text-blue-500" />}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">AdBlocker</h3>
              <p className="text-gray-400">
                The most advanced ad blocking solution for a better browsing experience.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#browsers" className="text-gray-400 hover:text-white">Browsers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

const StatsCard = ({ icon, number, label }) => (
  <div className="bg-white/5 rounded-2xl p-8 text-center transform transition hover:scale-105">
    <div className="flex justify-center mb-4">{icon}</div>
    <div className="text-4xl font-bold text-white mb-2">{number}</div>
    <div className="text-gray-400">{label}</div>
  </div>
)

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-lg transform transition hover:scale-105">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold text-white ml-2">{title}</h3>
    </div>
    <p className="text-gray-400">{description}</p>
  </div>
)