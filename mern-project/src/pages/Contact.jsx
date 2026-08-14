import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle2, ArrowRight} from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-5">
              <MessageSquare size={17}className="text-green-400"/>
              <span className="text-sm text-slate-300">
                Get in touch
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">
              Let's talk about
              <span className="text-green-400">
                {' '}your property.
              </span>
            </h1>
            <p className="text-slate-400 text-lg mt-5 max-w-2xl leading-relaxed">
              Have a question about a property, listing or PrimeNest?
              Send us a message and we'll be happy to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-2xl p-7 sm:p-8 text-white h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-green-600 p-2.5 rounded-xl">
                  <Home size={22} />
                </div>
                <span className="text-xl font-bold">
                  Prime<span className="text-green-400">Nest</span>
                </span>
              </div>
              <h2 className="text-2xl font-bold">
                Contact Information
              </h2>
              <p className="text-slate-400 mt-3 leading-relaxed">
                We're here to help. Reach out to us through any of the
                following channels.
              </p>
              <div className="space-y-6 mt-8">
                <div className="flex gap-4">
                  <div className="bg-white/10 p-3 rounded-xl h-fit">
                    <Mail
                      size={20}
                      className="text-green-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">
                      Email
                    </p>
                    <p className="font-medium mt-1">
                      support@primenest.com
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white/10 p-3 rounded-xl h-fit">
                    <Phone
                      size={20}
                      className="text-green-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">
                      Phone
                    </p>
                    <p className="font-medium mt-1">
                      +91 98765 XXXXX
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white/10 p-3 rounded-xl h-fit">
                    <MapPin
                      size={20}
                      className="text-green-400"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">
                      Location
                    </p>
                    <p className="font-medium mt-1">
                      Pune, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 mt-10 pt-7">
                <p className="text-sm text-slate-400 mb-3">
                  Looking for a property?
                </p>
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-semibold"
                >
                  Browse Properties
                  <Send size={16} />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
              {submitted ? (
                <div className="min-h-[500px] flex flex-col items-center justify-center text-center">
                  <div className="bg-green-100 text-green-600 p-4 rounded-full">
                    <CheckCircle2 size={42} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 mt-6">
                    Message Sent!
                  </h2>
                  <p className="text-slate-500 mt-2 max-w-md">
                    Thank you for contacting EstateHub. We've received
                    your message and will get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-7">
                    <h2 className="text-2xl font-bold text-slate-800">
                      Send us a message
                    </h2>
                    <p className="text-slate-500 mt-2">
                      Fill out the form below and we'll get back to you.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-slate-700 mb-2">
                          Your Name
                        </label>
                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                          <input type="text" id="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"/>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
                          <input type="email" id="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"/>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                        Subject
                      </label>

                      <input type="text" id="subject" placeholder="What would you like to discuss?" value={formData.subject} onChange={handleChange} required className="w-full border border-slate-200 rounded-xl p-3.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"/>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-slate-700 mb-2">
                        Message
                      </label>

                      <textarea id="message" rows="7" placeholder="Write your message..." value={formData.message} onChange={handleChange} required className="w-full border border-slate-200 rounded-xl p-3.5 outline-none resize-none focus:border-green-500 focus:ring-2 focus:ring-green-100"/>
                    </div>
                    <button type="submit" className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl p-3.5 font-semibold transition">
                      Send Message
                      <Send size={18} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}