import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  BedDouble,
  Bath,
  Tag,
} from 'lucide-react';

export default function ListingItem({ listing }) {
  const price = listing.offer
    ? listing.discountPrice
    : listing.regularPrice;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full sm:w-[250px] group">
      <Link to={`/listing/${listing._id}`}>
        <div className="relative overflow-hidden">
          <img
            src={
              listing.images?.[0] ||
              'https://images.pexels.com/photos/8134847/pexels-photo-8134847.jpeg'
            }
            alt={listing.name}
            className="h-[320px] sm:h-[220px] w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
            {listing.type}
          </span>

          {listing.offer && (
            <span className="absolute top-3 right-3 flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
              <Tag size={11} />
              Offer
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col gap-2">
          <h3 className="truncate text-lg font-semibold text-slate-800 group-hover:text-green-600 transition-colors">
            {listing.name}
          </h3>
          <div className="flex items-center gap-1 text-slate-500">
            <MapPin
              size={17}
              className="text-green-600 shrink-0"
            />
            <p className="text-sm truncate">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-slate-500 line-clamp-2 min-h-[40px]">
            {listing.description}
          </p>
          <div className="mt-2">
            <p className="text-xl font-bold text-slate-800">
              ₹{price?.toLocaleString('en-IN')}
              {listing.type === 'rent' && (
                <span className="text-xs font-normal text-slate-500">
                  {' '}/ month
                </span>
              )}
            </p>
            {listing.offer && (
              <p className="text-xs text-slate-400 line-through">
                ₹{listing.regularPrice?.toLocaleString('en-IN')}
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 mt-2 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1 text-slate-600">
              <BedDouble
                size={18}
                className="text-green-600"
              />

              <span className="text-xs font-medium">
                {listing.bedrooms}{' '}
                {listing.bedrooms > 1 ? 'Beds' : 'Bed'}
              </span>
            </div>
            <div className="flex items-center gap-1 text-slate-600">
              <Bath
                size={18}
                className="text-green-600"
              />

              <span className="text-xs font-medium">
                {listing.bathrooms}{' '}
                {listing.bathrooms > 1 ? 'Baths' : 'Bath'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}