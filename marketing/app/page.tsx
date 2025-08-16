'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


export default function Home() {
  const [currentYear, setCurrentYear] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavOpen(false);
  };

  return (
    <>
      {/* Decorative background blobs */}
      {/* <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.02"%3E%3Cpath d="M0 0h1v50H0z"/%3E%3Cpath d="M0 0h50v1H0z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] z-[-2]" aria-hidden="true"></div> */}
      <div className="fixed w-[400px] h-[400px] rounded-full bg-pink-400 blur-[80px] opacity-10 -top-[200px] -right-[200px] z-[-1]" aria-hidden="true"></div>
      <div className="fixed w-[300px] h-[300px] rounded-full bg-violet-400 blur-[80px] opacity-10 -bottom-[150px] -left-[150px] z-[-1]" aria-hidden="true"></div>
      <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
        <span className="absolute text-3xl opacity-10 top-[20%] left-[10%] animate-[float_6s_ease-in-out_infinite]" data-seed="0.2">📈</span>
        <span className="absolute text-3xl opacity-10 top-[30%] right-[15%] animate-[float_6s_ease-in-out_infinite_1s]" data-seed="1.1">💰</span>
        <span className="absolute text-3xl opacity-10 top-[60%] left-[20%] animate-[float_6s_ease-in-out_infinite_2s]" data-seed="2.3">💵</span>
        <span className="absolute text-3xl opacity-10 top-[70%] right-[25%] animate-[float_6s_ease-in-out_infinite_3s]" data-seed="0.8">🤝</span>
        <span className="absolute text-3xl opacity-10 top-[80%] left-[30%] animate-[float_6s_ease-in-out_infinite_4s]" data-seed="1.9">🤖</span>
        {/* <img className="emoji3d e6 ig" alt="Instagram" src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" /> */}

        {/* Bulk emojis for dense background */}
        <span className="absolute text-2xl opacity-[0.05] top-[140%] left-[5%] animate-[float_6s_ease-in-out_infinite_0.4s]" data-seed="0.4">📈</span>
        <span className="absolute text-2xl opacity-[0.05] top-[155%] left-[18%] animate-[float_6s_ease-in-out_infinite_1.2s]" data-seed="1.2">💵</span>
        <span className="absolute text-2xl opacity-[0.05] top-[160%] right-[8%] animate-[float_6s_ease-in-out_infinite_2.1s]" data-seed="2.1">💰</span>
        <span className="absolute text-2xl opacity-[0.05] top-[180%] right-[14%] animate-[float_6s_ease-in-out_infinite_0.9s]" data-seed="0.9">📈</span>
        <span className="absolute text-2xl opacity-[0.05] top-[200%] left-[12%] animate-[float_6s_ease-in-out_infinite_1.6s]" data-seed="1.6">💵</span>
        <span className="absolute text-2xl opacity-[0.05] top-[230%] left-[8%] animate-[float_6s_ease-in-out_infinite_2.7s]" data-seed="2.7">💰</span>
        <span className="absolute text-2xl opacity-[0.05] top-[250%] right-[6%] animate-[float_6s_ease-in-out_infinite_0.7s]" data-seed="0.7">📈</span>
        <span className="absolute text-2xl opacity-[0.05] top-[270%] left-[20%] animate-[float_6s_ease-in-out_infinite_1.4s]" data-seed="1.4">💵</span>
      </div>

      {/* Side-follow 3D characters */}
      {/* <ModelViewer 
        className="fixed top-1/2 -translate-y-1/2 -left-[100px] w-[200px] h-[200px] z-[-1] pointer-events-none" 
        id="sideMonkey" 
        src="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Suzanne/glTF-Binary/Suzanne.glb" 
        ar 
        shadow-intensity="0.8" 
        camera-controls 
        disable-zoom 
        auto-rotate 
        autoplay 
        interaction-prompt="none" 
        exposure="1.0" 
        aria-hidden="true"
      /> */}

      <header className="fixed top-0 left-0 right-0 z-[1000] backdrop-blur-md bg-gradient-to-r from-[color-mix(in_srgb,#ffd6c0,white_20%)] to-[color-mix(in_srgb,#b6f3e6,white_20%)] border-b border-[rgba(13,27,42,0.08)]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex items-center justify-between py-[18px]">
            <div className="flex items-center gap-3">
              <Image 
                className="w-[52px] h-[52px] rounded-[14px] block object-cover" 
                src="/favicon.png" 
                alt="Fix AI logo" 
                width={52}
                height={52}
              />
              <span className="font-['Space_Grotesk'] font-bold text-[36px] text-[#0d1b2a] tracking-[-0.01em]">Fix AI</span>
            </div>
            <nav className="flex items-center" aria-label="Primary">
              <button 
                className="md:hidden flex flex-col bg-transparent border-none cursor-pointer p-2" 
                onClick={() => setIsNavOpen(!isNavOpen)}
                aria-label="Open menu" 
                aria-expanded={isNavOpen}
              >
                <span className="w-[25px] h-[3px] bg-[#0d1b2a] mb-[2px] transition-all duration-300"></span>
                <span className="w-[25px] h-[3px] bg-[#0d1b2a] mb-[2px] transition-all duration-300"></span>
                <span className="w-[25px] h-[3px] bg-[#0d1b2a] transition-all duration-300"></span>
              </button>
              <div className={`md:flex items-center gap-8 ${isNavOpen ? 'absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md flex-col p-6 border-b border-black/10 shadow-lg md:static md:bg-transparent md:border-none md:shadow-none md:p-0' : 'hidden'}`}>
                <button 
                  className="bg-transparent font-semibold border-none font-['Inter'] text-base text-[#0d1b2a] cursor-pointer transition-colors duration-300 p-4 md:p-2 hover:text-[#0ea5e9] md:bg-transparent md:w-auto md:text-left md:border-b md:border-black/10 md:last:border-b-0 md:border-none" 
                  onClick={() => scrollToSection('installation')}
                >
                  Installation
                </button>
                <button 
                  className="bg-transparent font-semibold border-none font-['Inter'] text-base text-[#0d1b2a] cursor-pointer transition-colors duration-300 p-4 md:p-2 hover:text-[#0ea5e9] md:bg-transparent md:w-auto md:text-left md:border-b md:border-black/10 md:last:border-b-0 md:border-none" 
                  onClick={() => scrollToSection('usecases')}
                >
                  Use cases
                </button>
                <button 
                  className="bg-transparent font-semibold border-none font-['Inter'] text-base text-[#0d1b2a] cursor-pointer transition-colors duration-300 p-4 md:p-2 hover:text-[#0ea5e9] md:bg-transparent md:w-auto md:text-left md:border-b md:border-black/10 md:last:border-b-0 md:border-none" 
                  onClick={() => scrollToSection('pricing')}
                >
                  Pricing
                </button>
                <button 
                  className="inline-flex underline underline-offset-2 items-center justify-center px-4 py-2 bg-[#0ea5e9] text-black font-semibold text-base rounded-lg transition-all duration-300 hover:bg-yellow-400 hover:-translate-y-0.5 hover:shadow-lg mt-4 md:mt-0 md:w-auto md:justify-center" 
                  onClick={() => scrollToSection('survey')}
                >
                  GET YOURS NOW
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-6 pt-[80px] pb-12">
        {/* Home / VSL */}
        <section id="home" className="tab-panel active" role="tabpanel" aria-labelledby="home-tab">
          <div className="text-center py-16">
            <h1 className="text-5xl md:text-6xl sm:text-3xl mb-4 bg-gradient-to-r from-[#0ea5e9] font-['Space_Grotesk'] font-bold to-[#a78bfa] bg-clip-text text-neutral-900">AI that rizzes up your leads</h1>
            <p className="text-2xl md:text-2xl text-[#4a5568] mb-12 font-semibold">Instagram DM AI agent</p>

            <div className="flex justify-center gap-6 flex-wrap">
              <button 
                className="cursor-pointer inline-flex items-center justify-center py-3 bg-[#ef4444] text-black font-bold text-2xl rounded-xl transition-all duration-300 hover:bg-[#da3434] hover:-translate-y-0.5 hover:shadow-lg w-full max-w-[300px] md:w-full md:max-w-[250px]" 
                onClick={() => scrollToSection('survey')}
              >
                GET YOURS NOW
              </button>
            </div>
          </div>

          {/* Metrics image + Booked call GIF */}
          <div id="media" className="bg-white/40 backdrop-blur-md rounded-2xl p-12 my-6 shadow-lg border border-[rgba(13,27,42,0.08)]">
            <h2 className="text-center text-4xl md:text-3xl font-bold mb-8 text-[#0d1b2a]">See the results</h2>
            <div className="grid grid-cols-1 gap-8 my-8 md:grid-cols-2">
              <figure className="relative">
                <Image 
                  className="w-full h-auto rounded-lg shadow-lg aspect-video object-cover" 
                  id="metricsImage" 
                  alt="Metrics dashboard" 
                  loading="lazy" 
                  decoding="async" 
                  src="/assets/metrics-preview.png"
                  width={800}
                  height={450}
                />
                <figcaption className="text-center mt-2 text-sm text-[#4a5568]">KPI Dashboard</figcaption>
              </figure>
              <figure className="relative">
                <Image 
                  className="w-full h-auto rounded-lg shadow-lg aspect-[4/5] object-cover" 
                  id="bookingGif" 
                  alt="Call being booked automatically" 
                  loading="lazy" 
                  decoding="async" 
                  src="/assets/booked-call.gif"
                  width={400}
                  height={533}
                />
                <figcaption className="text-center mt-2 text-sm text-[#4a5568]">Booked call demo</figcaption>
              </figure>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-12 my-12 shadow-lg border border-[rgba(13,27,42,0.08)]">
            <h2 id="installation" className="text-center text-4xl md:text-3xl font-bold mb-8 text-[#0d1b2a]">Install in under 5 minutes!</h2>
            <ol className="list-none my-8">
              <li className="mb-6 pl-12 relative text-lg before:content-['1'] before:absolute before:left-0 before:top-0 before:bg-[#0ea5e9] before:text-white before:w-6 before:h-6 before:rounded-full before:flex before:items-center before:justify-center before:text-sm before:font-semibold"><strong>Make an account with us</strong></li>
              <li className="mb-6 pl-12 relative text-lg before:content-['2'] before:absolute before:left-0 before:top-0 before:bg-[#0ea5e9] before:text-white before:w-6 before:h-6 before:rounded-full before:flex before:items-center before:justify-center before:text-sm before:font-semibold"><strong>Connect your Instagram</strong></li>
              <li className="mb-6 pl-12 relative text-lg before:content-['3'] before:absolute before:left-0 before:top-0 before:bg-[#0ea5e9] before:text-white before:w-6 before:h-6 before:rounded-full before:flex before:items-center before:justify-center before:text-sm before:font-semibold"><strong>Modify the template prompt to your use-case</strong></li>
              <li className="mb-6 pl-12 relative text-lg before:content-['4'] before:absolute before:left-0 before:top-0 before:bg-[#0ea5e9] before:text-white before:w-6 before:h-6 before:rounded-full before:flex before:items-center before:justify-center before:text-sm before:font-semibold"><strong>Connect AI agent to your account </strong> – <span className="text-[#4a5568] text-sm">This is what we&apos;ve made easy for you</span></li>
              <li className="mb-6 pl-12 relative text-lg before:content-['5'] before:absolute before:left-0 before:top-0 before:bg-[#0ea5e9] before:text-white before:w-6 before:h-6 before:rounded-full before:flex before:items-center before:justify-center before:text-sm before:font-semibold"><strong>Book calls on autopilot!</strong></li>
            </ol>
            <div className="grid grid-cols-1 gap-8 my-8 md:grid-cols-2">
              <figure className="relative">
                <Image 
                  id="complexWorkflowGif" 
                  alt="Overly complex workflow" 
                  loading="lazy" 
                  decoding="async" 
                  src="/assets/complex-workflow.png"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <figcaption className="text-center mt-2">❌ <span className="text-[#4a5568] font-semibold">Don&apos;t spend time building this.</span></figcaption>
              </figure>
              <figure className="relative">
                <Image 
                  id="simpleInstallGif" 
                  alt="Simple 2-second install" 
                  loading="lazy" 
                  decoding="async" 
                  src="/assets/simple-install.gif"
                  width={400}
                  height={300}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <figcaption className="text-center mt-2">✅ <span className="text-[#4a5568] font-semibold">just install this in 2 seconds</span></figcaption>
              </figure>
            </div>
          </div>

          <section id="usecases" className="my-12">
            <h2 className="text-center text-4xl md:text-3xl font-bold mb-8 text-[#0d1b2a]">More than just an appointment setter, it&apos;s AI YOU</h2>
            <p className="text-center text-[#4a5568] mb-8">Here&apos;s some of the ways you can use it:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 my-8">
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-lg border-l-4 border-[#0ea5e9]">
                <h3 className="text-2xl font-bold mb-2 text-[#0d1b2a]">Qualify Inbound Leads + Set Sales Calls</h3>
                <p className="text-[#4a5568]">Talk to all your leads 24/7 and and only book calls with qualified prospects.</p>
              </div>
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-lg border-l-4 border-[#0ea5e9]">
                <h3 className="text-2xl font-bold mb-2 text-[#0d1b2a]">Answer FAQs</h3> 
                <p className="text-[#4a5568]">Consistent replies with your tone, links, and route them where you want.</p>
              </div>
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-lg border-l-4 border-[#0ea5e9]">
                <h3 className="text-2xl font-bold mb-2 text-[#0d1b2a]">Set up dates for you</h3>
                <p className="text-[#4a5568]">Got no game with the ladies? Your AI agent will get you so many dates with baddies you won&apos;t know what to do</p>
              </div>
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-lg border-l-4 border-[#0ea5e9]">
                <h3 className="text-2xl font-bold mb-2 text-[#0d1b2a]">Have conversations with anyone!</h3>
                <p className="text-[#4a5568]">Want to bully men in your DMs? Troll your friends? Invite people to a party/gathering? Have AI take care of all of it</p>
              </div>
            </div>
          </section>

          <div id="pricing" className="bg-white/70 backdrop-blur-md rounded-2xl p-12 my-12 shadow-lg border border-[rgba(13,27,42,0.08)]">
            <h2 className="text-center text-4xl md:text-3xl font-bold mb-8 text-[#0d1b2a]">Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
              <article className="bg-white border-2 border-gray-300 rounded-2xl p-12 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <header className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-[#0d1b2a]">Instagram DM AI Agent</h3>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl font-black text-black">Free</span>
                    <span className="text-sm text-[#4a5568]">First 500 credits (~50 responses)</span>
                  </div>
                </header>
                <ul className="list-none my-8 text-left">
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#f472b6] before:font-bold">Pay-by-usage</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#f472b6] before:font-bold">1 AI agent</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#f472b6] before:font-bold">Prompt template</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#f472b6] before:font-bold">KPI dashboard</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#f472b6] before:font-bold">1 Campaign</li>
                </ul>
                <button 
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#0ea5e9] text-white font-semibold text-base rounded-lg transition-all duration-300 hover:bg-[#0284c7] hover:-translate-y-0.5 hover:shadow-lg w-full mt-6" 
                  onClick={() => scrollToSection('survey')}
                >
                  Get started
                </button>
              </article>

              <article className="bg-white border-2 border-[#0ea5e9] rounded-2xl p-12 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl scale-105 md:scale-100">
                <header className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 text-[#0d1b2a]">AI Appointment Setting System</h3>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl font-black text-black">Custom</span>
                  </div>
                </header>
                <ul className="list-none my-8 text-left">
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#f472b6] before:font-bold">Setup Cost + Monthly Fee</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#f472b6] before:font-bold">Multi-agent Appointment Setter</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#f472b6] before:font-bold">Custom KPI + Analytics Dashboard </li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#f472b6] before:font-bold">1:1 support</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#f472b6] before:font-bold">Multiple campaigns</li>
                </ul>
                <a 
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#0d1b2a] text-white font-semibold text-base rounded-lg transition-all duration-300 hover:bg-[#1e293b] hover:-translate-y-0.5 hover:shadow-lg w-full mt-6" 
                  href="https://api.leadconnectorhq.com/widget/bookings/fixai-strategy-consultation" 
                  target="_blank" 
                  rel="noopener"
                >
                  BOOK CALL
                </a>
              </article>
            </div>
          </div>

          <div id="survey" className="bg-white/70 backdrop-blur-md rounded-2xl p-12 my-12 shadow-lg border border-[rgba(13,27,42,0.08)]">
            <h2 className="text-center text-4xl md:text-3xl font-bold mb-8 text-[#0d1b2a]">Join the waitlist</h2>
            {/* Contact collection survey embed */}
            {/* <iframe 
              src="https://api.leadconnectorhq.com/widget/survey/9tZr3hfxdkR7WN0elENu" 
              style={{border:'none',width:'100%'}} 
              scrolling="no" 
              id="9tZr3hfxdkR7WN0elENu" 
              title="survey"
            ></iframe> */}

            <div className="w-full md:w-8/10 m-auto">

            <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="full_name">Full Name</Label>
              <Input 
                id="full_name" 
                name="full_name" 
                // value={formData.full_name}
                // onChange={(e) => handleInputChange('full_name', e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                // value={formData.email}
                // onChange={(e) => handleInputChange('email', e.target.value)}
                required 
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="instagram_username">Instagram username</Label>
              <Input 
                id="instagram_username" 
                name="instagram_username" 
                placeholder="@ismaeljimenez.ai"
                // value={formData.instagram_username}
                // onChange={(e) => handleInputChange('instagram_username', e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="interest_reason">What makes you interested in an AI appointment setter?</Label>
              <Textarea
                id="interest_reason" 
                name="interest_reason" 
                placeholder="Type your message here"
                // value={formData.interest_reason}
                // onChange={(e) => handleInputChange('interest_reason', e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="planned_usage">What do you plan on using it for?</Label>
              <Textarea 
                id="planned_usage" 
                name="planned_usage" 
                placeholder="Type your message here"
                // value={formData.planned_usage}
                // onChange={(e) => handleInputChange('planned_usage', e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="business_instagram">Do you run a business and post content on Instagram?</Label>
              <Textarea 
                id="business_instagram" 
                name="business_instagram" 
                placeholder="Type your message here"
                // value={formData.business_instagram}
                // onChange={(e) => handleInputChange('business_instagram', e.target.value)}
              />
            </div>
          </div>

            </div>

          </div>
        </section>
      </main>

      <footer className="text-white py-12 mt-16  backdrop-blur-md bg-gradient-to-r from-[color-mix(in_srgb,#ffd6c0,white_20%)] to-[color-mix(in_srgb,#b6f3e6,white_20%)] border-b border-[rgba(13,27,42,0.08)]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex justify-between items-center flex-wrap gap-6  md:text-center">
            <p className="text-[#4a5568] text-sm">© <span id="year">{currentYear}</span> Fix AI LLC. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" aria-disabled="true" className="text-neutral-700 no-underline transition-colors duration-300 hover:underline">Terms</a>
              <a href="#" aria-disabled="true" className="text-neutral-700 no-underline transition-colors duration-300 hover:underline">Privacy</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </>
  );
}
