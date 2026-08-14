import { ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const FeaturedProjects = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  // console.log(saleListings);
  
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
          console.log(error);
      }
    }
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <section className="bg-slate-50 py-20">
        <div className="container-custom">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-teal-700">
                Featured Properties
              </span>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Explore Our Latest Listings
              </h2>

              <p className="mt-3 max-w-xl text-slate-500">
                Discover carefully selected properties that match your lifestyle,
                location, and budget.
              </p>
            </div>

            <Link
              to="/search"
              className="group inline-flex items-center gap-2 font-semibold text-teal-700 transition hover:text-teal-800"
            >
              View all properties
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rentListings?.slice(0, 6).map((listing, index) => (
              <Link
                key={listing._id}
                to={`/listing/${listing._id}`}
                className="group card card-hover overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={listing.images?.flat()?.[0] ? `${import.meta.env.VITE_API_URL}${listing.images.flat()[0]}` : 'https://images.pexels.com/photos/8134847/pexels-photo-8134847.jpeg'
                    }
                    alt={listing.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-teal-700 shadow-sm">
                      {listing.type === "rent" ? "For Rent" : "For Sale"}
                    </span>
                  </div>
                  {listing.offer && (
                    <div className="absolute right-4 top-4">
                      <span className="rounded-full bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm">
                        Special Offer
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-2xl font-bold drop-shadow-md">
                      $
                      {listing.offer
                        ? listing.discountPrice?.toLocaleString()
                        : listing.regularPrice?.toLocaleString()}
                    </p>

                    {listing.type === "rent" && (
                      <span className="text-sm text-white/80">/ month</span>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="line-clamp-1 text-lg font-bold text-slate-900 transition-colors group-hover:text-teal-700">
                    {listing.name}
                  </h3>

                  <p className="mt-2 line-clamp-1 text-sm text-slate-500">
                    {listing.address}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-400">Bedrooms</p>
                      <p className="mt-1 font-semibold text-slate-700">
                        {listing.bedrooms}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Bathrooms</p>
                      <p className="mt-1 font-semibold text-slate-700">
                        {listing.bathrooms}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Type</p>
                      <p className="mt-1 font-semibold capitalize text-slate-700">
                        {listing.type}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
  )
}

export default FeaturedProjects