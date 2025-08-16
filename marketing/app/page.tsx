'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import React from 'react';
import WaitlistForm from '@/components/waitlist-form';


export default function Home() {
  const [currentYear, setCurrentYear] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString());
  }, []);

  useEffect(() => {
    const targetDate = new Date('2025-08-25T00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    // Update immediately
    updateCountdown();
    
    // Update every second
    const timer = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Use getBoundingClientRect for more accurate positioning
      const rect = element.getBoundingClientRect();
      const headerHeight = 80;
      const additionalOffset = 20;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = scrollTop + rect.top - headerHeight - additionalOffset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
    setIsNavOpen(false);
  };

  return (
    <>
      {/* Sticky countdown bar */}
      <div className="fixed top-0 left-0 right-0 z-[1001] bg-red-500 text-white py-2 sm:py-3 px-4 shadow-lg">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-bold flex gap-2 justify-center sm:justify-start">
              <span>🚀</span> 
              <span className="hidden xs:inline">CLAIM EARLY ACCESS NOW</span>
              <span className="xs:hidden">EARLY ACCESS</span>
            </h2>
            <p className="text-sm sm:text-base opacity-90 hidden sm:block">Limited time offer - Don&apos;t miss out!</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-2xl font-bold bg-white/20 rounded-lg px-2 sm:px-3 py-1 min-w-[50px] sm:min-w-[60px]">
                {countdown.days.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold opacity-80">DAYS</span>
            </div>
            <span className="text-lg sm:text-xl font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-2xl font-bold bg-white/20 rounded-lg px-2 sm:px-3 py-1 min-w-[50px] sm:min-w-[60px]">
                {countdown.hours.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold opacity-80">HOURS</span>
            </div>
            <span className="text-lg sm:text-xl font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-2xl font-bold bg-white/20 rounded-lg px-2 sm:px-3 py-1 min-w-[50px] sm:min-w-[60px]">
                {countdown.minutes.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold opacity-80">MINS</span>
            </div>
            <span className="text-lg sm:text-xl font-bold">:</span>
            <div className="flex flex-col items-center">
              <span className="text-lg sm:text-2xl font-bold bg-white/20 rounded-lg px-2 sm:px-3 py-1 min-w-[50px] sm:min-w-[60px]">
                {countdown.seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-xs font-semibold opacity-80">SECS</span>
            </div>
          </div>
        </div>
      </div>

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


      <header className="fixed top-[80px] sm:top-[72px] left-0 px-4 xl:px-0 right-0 z-[1000] backdrop-blur-md bg-gradient-to-r from-[color-mix(in_srgb,#ffd6c0,white_20%)] to-[color-mix(in_srgb,#b6f3e6,white_20%)] border-b border-[rgba(13,27,42,0.08)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between py-[18px]">
            <div className="flex items-center gap-3">
              <Image 
                className="w-[52px] h-[52px] rounded-[14px] block object-cover" 
                src="/favicon.ico" 
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
              <div className={`md:flex items-center gap-2 ${isNavOpen ? 'absolute top-full left-0 right-0 bg-white/98 backdrop-blur-md flex-col p-6 border-b border-black/10 shadow-lg md:static md:bg-transparent md:border-none md:shadow-none md:p-0' : 'hidden'}`}>
                <button 
                  className="bg-transparent font-bold border-none font-['Inter'] text-lg text-[#0d1b2a] cursor-pointer transition-colors duration-300 md:py-2 md:px-4 hover:text-[#0ea5e9] md:bg-white/50 rounded-xl md:w-auto md:text-left md:border-b md:border-black/10 md:last:border-b-0 md:border-none" 
                  onClick={() => scrollToSection('installation')}
                >
                  Installation
                </button>
                <button 
                  className="bg-transparent font-bold border-none font-['Inter'] text-lg text-[#0d1b2a] cursor-pointer transition-colors duration-300 md:py-2 md:px-4 hover:text-[#0ea5e9] md:bg-white/50 rounded-xl md:w-auto md:text-left md:border-b md:border-black/10 md:last:border-b-0 md:border-none" 
                  onClick={() => scrollToSection('usecases')}
                >
                  Use cases
                </button>
                <button 
                  className="bg-transparent font-bold border-none font-['Inter'] text-lg text-[#0d1b2a] cursor-pointer transition-colors duration-300 p-4 md:py-2 md:px-4 hover:text-[#0ea5e9] md:bg-white/50 rounded-xl md:w-auto md:text-left md:border-b md:border-black/10 md:last:border-b-0 md:border-none" 
                  onClick={() => scrollToSection('pricing')}
                >
                  Pricing
                </button>
                <button 
                  className="cursor-pointer inline-flex underline underline-offset-2 items-center justify-center px-5 py-3 bg-gradient-to-br from-emerald-200 via-cyan-300 to-sky-400 text-black font-bold text-xl rounded-xl transition-all duration-300 hover:from-emerald-300 hover:via-cyan-400 hover:to-sky-500 hover:-translate-y-0.5 hover:shadow-lg mt-4 md:mt-0 md:w-auto md:justify-center" 
                  onClick={() => scrollToSection('survey')}
                >
                  GET YOURS NOW
                </button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto pt-[168px] sm:pt-[160px] pb-0 px-4 xl:px-0">
        {/* Home / VSL */}
        <section id="home" className="tab-panel active" role="tabpanel" aria-labelledby="home-tab">
          <div className="text-center py-8">
            <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-[#0ea5e9] font-['Space_Grotesk'] font-bold to-[#a78bfa] bg-clip-text tracking-tight text-neutral-900">AI that maximizes engagement in your DMs</h1>
            <p className="text-2xl md:text-2xl text-[#4a5568] mb-6 font-semibold">Instagram DM AI Agent for creators, businesses, & personal use</p>

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
          <div id="media" className="bg-white/40 backdrop-blur-md rounded-2xl p-12 my-4 shadow-lg border border-[rgba(13,27,42,0.08)]">
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

          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-12 my-12 shadow-lg border border-[rgba(13,27,42,0.08)]">
            <h2 id="early-access" className="text-center text-4xl md:text-3xl font-bold mb-8 text-[#0d1b2a]">Early Access Perks</h2>
            <ul className="list-none my-8">
                <li className="mb-6 pl-8 relative text-lg before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-[#0ea5e9] before:text-white before:w-3 before:h-3 before:rounded-full before:flex before:items-center before:justify-center before:text-xs before:font-semibold"><strong>First 500 messages</strong></li>
               <li className="mb-6 pl-8 relative text-lg before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-[#0ea5e9] before:text-white before:w-3 before:h-3 before:rounded-full before:flex before:items-center before:justify-center before:text-xs before:font-semibold"><strong>Priority support for 6 months</strong></li>
               <li className="mb-6 pl-8 relative text-lg before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:bg-[#0ea5e9] before:text-white before:w-3 before:h-3 before:rounded-full before:flex before:items-center before:justify-center before:text-xs before:font-semibold"><strong>Access to newest use-case templates</strong></li>
            </ul>
            <div className='flex flex-col gap-1'>

              <h2 className='font-semibold text-3xl'>🔥🔥BONUS🔥🔥</h2>
              <h2 className='font-semibold text-2xl'>Refer 4 friends and get ADDITIONAL 500 MESSAGES ($50 value → FREE)</h2>
            </div>
            {/* <div className="grid grid-cols-1 gap-8 my-8 md:grid-cols-2">
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
            </div> */}
          </div>

          <section id="usecases" className="my-12">
            <h2 className="text-center text-4xl md:text-3xl font-bold mb-8 text-[#0d1b2a]">More than just an appointment setter, it&apos;s AI YOU</h2>
            <p className="text-center text-[#4a5568] mb-8">Here&apos;s some of the ways you can use it:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 my-8">
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-lg border-l-4 border-[#0ea5e9]">
                <h3 className="text-2xl font-bold mb-2 text-[#0d1b2a]">Qualify Inbound Leads + Set Sales Calls</h3>
                <p className="text-[#4a5568]">Respond to any inbound message within minutes, 24/7 and only book calls with qualified prospects.</p>
              </div>
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-lg border-l-4 border-[#0ea5e9]">
                <h3 className="text-2xl font-bold mb-2 text-[#0d1b2a]">Answer FAQs</h3> 
                <div className='grid gap-2'>
                  <p className="text-[#4a5568]"><span className="font-bold">Creators:</span> Help your fans by answering their questions, access useful information, or create incentivized games with them in your DMs</p>
                  <p className="text-[#4a5568]"><span className="font-bold">Businesses:</span> Help your customers identify the right service, make a reservation, RSVP to an event, or route to resources.</p>
                </div>
              </div>
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-lg border-l-4 border-[#0ea5e9]">
                <h3 className="text-2xl font-bold mb-2 text-[#0d1b2a]">Attract (or scare) Dates</h3>
                <p className="text-[#4a5568]">Got 0 luck with the huzz? Have AI message them for you.
                Want to scare huzz that message you? Have AI roast them.</p>
              </div>
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-lg border-l-4 border-[#0ea5e9]">
                <h3 className="text-2xl font-bold mb-2 text-[#0d1b2a]">Have fun with your friends</h3>
                <p className="text-[#4a5568]">Want to play a joke on your friends/family/colleagues ?
                Have AI argue, instigate, roast, or tell them nice things to make their day!</p>
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
                    <span className="text-4xl font-black text-black relative">
                      <span className="line-through decoration-red-500 decoration-3">$19.99</span>
                    </span>
                    <span className="text-4xl font-black text-black">Free</span>
                    <span className="text-sm text-[#4a5568]">Limited time to early access users</span>
                    {/* <span className="text-sm text-[#4a5568]">First 500 credits (~50 responses)</span> */}
                  </div>
                </header>
                <ul className="list-none my-8 text-left">
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">All early-access perks</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">Commercial license to install for others</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">Pay-by-usage</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">1 AI agent</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">Prompt template</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">KPI dashboard</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">1 Campaign</li>
                </ul>
                <button 
                  className="cursor-pointer inline-flex items-center justify-center px-6 py-3 bg-gradient-to-br from-emerald-200 via-cyan-300 to-sky-400 text-black font-bold text-lg rounded-lg transition-all duration-300 hover:bg-[#0284c7] hover:-translate-y-0.5 hover:shadow-lg w-full mt-6" 
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
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">Setup Cost + Monthly Fee</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">Multi-agent Appointment Setter</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">Custom KPI + Analytics Dashboard </li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">1:1 support</li>
                  <li className="py-1 relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-[#10b981] before:font-bold">Multiple campaigns</li>
                </ul>
                <a 
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#0d1b2a] text-white font-bold text-lg rounded-lg transition-all duration-300 hover:bg-[#1e293b] hover:-translate-y-0.5 hover:shadow-lg w-full mt-6" 
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
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="px-4 xl:px-0 text-white py-12 mt-16  backdrop-blur-md bg-gradient-to-r from-[color-mix(in_srgb,#ffd6c0,white_20%)] to-[color-mix(in_srgb,#b6f3e6,white_20%)] border-b border-[rgba(13,27,42,0.08)]">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex justify-between items-center flex-wrap gap-6  md:text-center">
            <p className="text-[#4a5568] text-sm">© <span id="year">{currentYear}</span> Fix AI LLC. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" aria-disabled="true" className="text-neutral-700 no-underline transition-colors duration-300 hover:underline">Terms</a>
              <a href="#" aria-disabled="true" className="text-neutral-700 no-underline transition-colors duration-300 hover:underline">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
