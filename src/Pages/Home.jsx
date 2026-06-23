import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-blue-100 text-gray-800 flex flex-col">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center flex-grow px-6 pt-32">
        
        {/* Animated Heading */}
        <h2 className="text-5xl font-extrabold drop-shadow-sm animate-bounce">
          {/* 🔁 Option 1: Bounce (like before) */}
          Welcome to <span className="text-blue-600">Online Market Bajar</span>
        </h2>

        {/* 🔁 Option 2: Floating loop effect (uncomment if you want) */}
        {/* <h2 className="text-5xl font-extrabold drop-shadow-sm animate-[float_3s_ease-in-out_infinite]">
          Welcome to <span className="text-blue-600">DynamicPath</span>
        </h2> */}

        {/* 🔁 Option 3: Shimmer text effect */}
        {/* <h2 className="text-5xl font-extrabold drop-shadow-sm relative inline-block bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500 text-transparent bg-clip-text animate-[shine_3s_linear_infinite]">
          Welcome to DynamicPath
        </h2> */}

        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          Build award-winning websites with React + Tailwind CSS. Fast, elegant, and responsive by design.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold shadow-md hover:scale-105 transition-transform duration-300">
            Get Started
          </button>
          <button className="px-6 py-3 bg-white border border-blue-300 rounded-xl hover:bg-blue-50 transition duration-300 text-blue-600 font-medium">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-16 bg-white/70 backdrop-blur-xl mt-5 rounded-t-3xl shadow-inner"
      >
        {[
          { title: "⚡ Fast", desc: "Experience lightning-fast performance with optimized React components." },
          { title: "📱 Responsive", desc: "Your website will look stunning on every device and screen size." },
          { title: "🎨 Interactive", desc: "Delight users with smooth animations and elegant UI transitions." },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold mb-3 text-blue-600">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 bg-gradient-to-r from-white to-sky-50 border-t border-gray-200">
        © 2025 <span className="text-blue-600 font-semibold">DynamicPath</span>. All rights reserved — 
        <span className="font-medium text-gray-700"> Vishal Mishra</span>.
      </footer>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shine {
          0% { background-position: -200%; }
          100% { background-position: 200%; }
        }
      `}</style>
    </div>
  );
}
