import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const WhyCoooseUs = () => {
  return (
    <section className="bg-white py-20">
        <div className="container-custom"> 
          <div className="mb-10 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-teal-700">
              Explore Properties
            </span>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Browse By Property Type
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Find the perfect property based on your needs, lifestyle, and
              investment goals.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Link to="/search?type=all&propertyType=apartment" className="group relative h-72 overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80"
                alt="Apartments"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-sm font-medium text-white/70">
                  Modern Living
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  Apartments
                </h3>

                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
                  Explore
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>

            <Link
              to="/search?type=all&propertyType=house"
              className="group relative h-72 overflow-hidden rounded-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
                alt="Houses"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-sm font-medium text-white/70">
                  Family Homes
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  Houses
                </h3>

                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
                  Explore
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>

            <Link
              to="/search?type=all&propertyType=villa"
              className="group relative h-72 overflow-hidden rounded-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Villas"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-sm font-medium text-white/70">
                  Premium Living
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  Villas
                </h3>

                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
                  Explore
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>

            <Link
              to="/search?type=all&propertyType=commercial"
              className="group relative h-72 overflow-hidden rounded-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
                alt="Commercial Property"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 text-white">
                <p className="text-sm font-medium text-white/70">
                  Business Spaces
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  Commercial
                </h3>

                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
                  Explore
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default WhyCoooseUs