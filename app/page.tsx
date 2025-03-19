'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const testimonials = [
    { name: 'Ayera Fatima', text: 'The AI-driven insights are surprisingly helpful. Highly recommend!' },
    { name: 'Eisha Haroon', text: 'Doctor AI has been a lifesaver for my mental health journey!' },
    { name: 'Raffay Khan', text: 'Fast, reliable, and secure. 10/10 experience!' },
    { name: 'Syed Hamza', text: 'I love how accessible and easy it is to use. Very intuitive!' },
    { name: 'Talha Sohail', text: 'A true game-changer in the healthcare industry!' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-12 py-20 bg-gradient-to-r from-green-50 to-white">
        <div className="max-w-xl space-y-6">
          <h2 className="text-5xl font-bold text-gray-800 leading-tight">
            Meet <span className="text-green-600">Doctor AI</span> — Your Personal Healthcare Assistant
          </h2>
          <p className="text-gray-700 text-lg">
            Available 24/7 to support your mental health journey with privacy, AI insights, and care.
          </p>
          <div className="space-x-4">
            <Link href="/register">
              <button className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Get Started
              </button>
            </Link>
            <Link href="/aboutus">
              <button className="px-8 py-4 border border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <Image
            src="/image.png"
            alt="Doctor AI Robot"
            width={500}
            height={500}
            className="rounded-lg shadow-xl"
          />
        </div>
      </section>

 {/* Why Choose Us Section */}
 <section className="px-12 py-20 bg-white">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-16">Why Choose Doctor AI?</h3>
        <div className="grid md:grid-cols-3 gap-12">
          {/* Card 1 */}
          <div className="p-8 bg-gray-50 border rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">🕒</div>
            <h4 className="text-2xl font-bold mb-2">24/7 Availability</h4>
            <p className="text-gray-700">We’re here whenever you need us — day or night.</p>
          </div>
          {/* Card 2 */}
          <div className="p-8 bg-gray-50 border rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">🔒</div>
            <h4 className="text-2xl font-bold mb-2">Secure & Private</h4>
            <p className="text-gray-700">Your privacy is our top priority with end-to-end encryption.</p>
          </div>
          {/* Card 3 */}
          <div className="p-8 bg-gray-50 border rounded-lg shadow-md hover:shadow-xl transition">
            <div className="text-5xl mb-4">🤖</div>
            <h4 className="text-2xl font-bold mb-2">AI-Powered Insights</h4>
            <p className="text-gray-700">Get advanced insights and personalized care powered by AI.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-12 py-20 bg-green-50 text-center">
        <h3 className="text-4xl font-bold text-gray-800 mb-6">What Our Users Say</h3>
        <div className="overflow-hidden relative max-w-4xl mx-auto">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0 w-full text-center px-6">
                <p className="text-lg italic text-gray-700">"{testimonial.text}"</p>
                <p className="font-bold text-green-600 mt-2">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        © 2024 Doctor AI. All Rights Reserved.
      </footer>
    </div>
  );
}
