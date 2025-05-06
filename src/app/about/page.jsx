export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <div className="text-center py-10 bg-gray-100">
        <h1 className="text-4xl font-bold">About Us</h1>
        <p className="text-lg mt-2">Learn more about our journey and mission</p>
      </div>

      {/* Company Introduction */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/about.jpg" // replace with your image
            alt="About our store"
            className="rounded-lg shadow-md w-[400] h-[150] mt-16 "
          />
          <div>
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-600">
              Welcome to MR shop, your number one source for all things [product category]. 
              We're dedicated to providing you the very best of products, with an emphasis on quality, reliability, and uniqueness.
            </p>
            <p className="text-gray-600 mt-4">
              Founded in 2025 by Mamun Ahmed, MR shop has come a long way from its beginnings. 
              When Mamun first started out, his passion for helping others find quality items drove him to start his own business.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">Our Mission & Vision</h2>
          <p className="text-gray-700">
            Our mission is to simplify shopping by delivering high-quality, affordable products right to your door.
            We aim to build a trustworthy brand that values transparency, customer satisfaction, and innovation.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-semibold text-center mb-10">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Customer First</h3>
            <p className="text-gray-600">We listen, understand, and serve our customers' needs with care and speed.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Integrity</h3>
            <p className="text-gray-600">We’re honest, transparent, and committed to doing what's best for our customers and team.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-gray-600">We constantly improve and push boundaries to deliver the best shopping experience.</p>
          </div>
        </div>
      </section>

      {/* Footer Message */}
      <div className="bg-gray-100 py-10 text-center">
        <p className="text-lg text-gray-700">
          Thank you for visiting us and being a part of our journey.
        </p>
        <p className="mt-2">– The MR shop Team</p>
      </div>
    </div>
  );
}