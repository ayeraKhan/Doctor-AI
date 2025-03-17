export default function AboutUs() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 space-y-8 bg-white text-center">
        <h1 className="text-4xl font-bold text-green-700">About Doctor AI</h1>
        <p className="text-gray-600 max-w-3xl">
          Doctor AI is your personal AI-powered psychologist, always available to help you manage your mental well-being. Our mission is to make mental health support accessible, private, and effective for everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mt-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-600">Our Vision</h2>
            <p className="text-gray-600">
              We envision a world where mental health care is as easy and accessible as sending a message. With AI, we aim to provide personalized care tailored to your needs.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-green-600">How We Help</h2>
            <p className="text-gray-600">
              Doctor AI listens, understands, and guides you through tough times — offering suggestions, quotes, and conversation to help you feel better anytime.
            </p>
          </div>
        </div>
      </div>
    );
  }
  