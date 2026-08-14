import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper/core';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

import {
  Bath,
  BedDouble,
  Armchair,
  MapPin,
  Car,
  Share2,
  Check,
  Tag,
} from 'lucide-react';

import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  const params = useParams();

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const discount =
    listing?.offer
      ? Number(listing.regularPrice) - Number(listing.discountPrice)
      : 0;

  return (
    <main className="bg-slate-50 min-h-screen">

      {loading && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-xl font-medium text-slate-600">
            Loading property...
          </p>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center min-h-[50vh]">
          <p className="text-xl font-medium text-red-500">
            Something went wrong!
          </p>
        </div>
      )}

      {listing && !loading && !error && (
        <div>
          <section className="relative">
            <Swiper
              navigation
              className="listing-swiper"
            >
              {listing.images && listing.images.flat().length > 0 ? (
                listing.images.flat().map((url, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-[300px] sm:h-[450px] lg:h-[550px]">
                      <img
                        src={`http://localhost:5000${url}`}
                        alt={`${listing.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>
                  <div className="h-[300px] sm:h-[450px] lg:h-[550px] flex items-center justify-center bg-slate-200">
                    <p className="text-slate-500">
                      No image available
                    </p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
            <button
              onClick={handleShare}
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition"
              aria-label="Share property"
            >
              <Share2
                size={20}
                className="text-slate-700"
              />
            </button>
            {listing.images?.length > 0 && (
              <div className="absolute bottom-5 right-5 z-10 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
                {listing.images.length} Photos
              </div>
            )}
            {copied && (
              <div className="absolute top-20 right-5 z-20 flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
                <Check size={15} />
                Link copied!
              </div>
            )}

          </section>

          <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
            <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-7">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  {listing.type === 'rent'
                    ? 'For Rent'
                    : 'For Sale'}
                </span>

                {listing.offer && (
                  <span className="flex items-center gap-1 bg-red-100 text-red-600 text-xs font-semibold px-3 py-1.5 rounded-full">
                    <Tag size={13} />
                    Special Offer
                  </span>
                )}

              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                {listing.name}
              </h1>
              <div className="flex items-start gap-2 mt-3 text-slate-500">
                <MapPin
                  size={18}
                  className="text-green-600 mt-0.5 shrink-0"
                />

                <p className="text-sm sm:text-base">
                  {listing.address}
                </p>
              </div>
              <div className="mt-6">
                <div className="flex flex-wrap items-baseline gap-3">
                  <p className="text-2xl sm:text-3xl font-bold text-slate-800">
                    ₹
                    {listing.offer
                      ? listing.discountPrice.toLocaleString('en-IN')
                      : listing.regularPrice.toLocaleString('en-IN')}
                  </p>
                  {listing.type === 'rent' && (
                    <span className="text-sm text-slate-500">
                      / month
                    </span>
                  )}
                </div>
                {listing.offer && (
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-slate-400 line-through">
                      ₹{listing.regularPrice.toLocaleString('en-IN')}
                    </span>

                    <span className="text-sm font-semibold text-green-600">
                      Save ₹{discount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7">
                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                  <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                    <BedDouble
                      size={19}
                      className="text-green-700"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Bedrooms
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
                      {listing.bedrooms}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                  <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                    <Bath
                      size={19}
                      className="text-green-700"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Bathrooms
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
                      {listing.bathrooms}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                  <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                    <Car
                      size={19}
                      className="text-green-700"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Parking
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
                      {listing.parking ? 'Available' : 'No'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                  <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                    <Armchair
                      size={19}
                      className="text-green-700"
                    />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Furnished
                    </p>

                    <p className="text-sm font-semibold text-slate-700">
                      {listing.furnished ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-7 mt-5">
              <h2 className="text-xl font-bold text-slate-800 mb-3">
                Property Description
              </h2>
              <p className="text-slate-600 leading-7 text-sm sm:text-base">
                {listing.description}
              </p>
            </div>
            {currentUser &&
              listing.userRef !== currentUser._id &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="w-full mt-5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl p-3.5 transition-colors uppercase tracking-wide"
                >
                  Contact Landlord
                </button>
            )}

            {contact && (
              <div className="mt-5">
                <Contact listing={listing} />
              </div>
            )}
          </section>
        </div>
      )}
    </main>
  );
}