import { Home, Search, ShieldCheck, UserRound, MapPin, Heart, ArrowRight, CheckCircle2} from 'lucide-react';
import { Link } from 'react-router-dom';


export default function About() {
  const features = [
    {
      icon: Search,
      title: 'Easy Property Search',
      description:
        'Search and filter properties based on your requirements and find the right place quickly.',
    },
    {
      icon: Home,
      title: 'Property Listings',
      description:
        'Create and manage property listings with details such as pricing, location, bedrooms, bathrooms and amenities.',
    },
    {
      icon: UserRound,
      title: 'User Accounts',
      description:
        'Create an account, manage your profile and keep track of your property listings from one place.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Platform',
      description:
        'User authentication and protected operations help keep your account and property information secure.',
    },
  ];

  const technologies = [
    'React',
    'Node.js',
    'Express.js',
    'MongoDB',
    'Redux',
    'Tailwind CSS',
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-green-950" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-28">

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-6">
              <Home size={18} className="text-green-400" />
              <span className="text-sm text-slate-200">
                Welcome to PrimeNest
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Find a place that
              <span className="text-green-400">
                {' '}feels like home.
              </span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl mt-6 max-w-2xl leading-relaxed">
              PrimeNest is a modern real estate platform designed to make
              discovering, listing and managing properties simple and
              convenient.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/search" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold transition">
                Explore Properties
                <ArrowRight size={19} />
              </Link>
              <Link to="/create-listing" className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10 px-6 py-3 rounded-xl font-semibold transition">
                List Your Property
                <Home size={19} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-green-600 font-semibold uppercase tracking-wide text-sm">
              About PrimeNest
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mt-2">
              A simpler way to discover your next property.
            </h2>
            <p className="text-slate-600 mt-5 leading-relaxed">
              PrimeNest brings property seekers and property owners together
              through a simple and user-friendly platform. Users can explore
              available properties, view detailed information and contact
              property owners.
            </p>

            <p className="text-slate-600 mt-4 leading-relaxed">
              Property owners can create listings, upload property images,
              update listing information and manage their properties directly
              from their account.
            </p>
            <div className="mt-7 space-y-3">
              {[
                'Browse and search properties',
                'Create and manage property listings',
                'View detailed property information',
                'Manage your account and listings',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-green-600 shrink-0" />
                  <span className="text-slate-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8">
              <div className="bg-green-50 rounded-2xl p-8">
                <div className="flex items-center justify-center">
                  <div className="bg-green-600 text-white p-6 rounded-3xl shadow-lg">
                    <Home size={64} />
                  </div>
                </div>
                <h3 className="text-center text-2xl font-bold text-slate-800 mt-6">
                  Your Property Journey
                </h3>
                <p className="text-center text-slate-500 mt-3">
                  Search. Discover. Connect. Find your perfect place.
                </p>
                <div className="grid grid-cols-3 gap-3 mt-8">
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <Search size={22} className="mx-auto text-green-600" />
                    <p className="text-xs font-semibold text-slate-600 mt-2">
                      Search
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <MapPin size={22} className="mx-auto text-green-600"/>
                    <p className="text-xs font-semibold text-slate-600 mt-2">
                      Discover
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <Heart size={22} className="mx-auto text-green-600" />
                    <p className="text-xs font-semibold text-slate-600 mt-2">
                      Choose
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-20">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white">
          <div className="max-w-3xl">
            <p className="text-green-400 font-semibold uppercase tracking-wide text-sm">
              Built With
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              Modern technology stack
            </h2>

            <p className="text-slate-400 mt-4 leading-relaxed">
              PrimeNest is built using modern web technologies to provide a
              responsive and scalable real estate experience.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium"
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}