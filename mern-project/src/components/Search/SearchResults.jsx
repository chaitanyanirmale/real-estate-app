import { Search, LoaderCircle, ArrowDown } from "lucide-react";
import ListingItem from "../ListingItem";

export default function SearchResults({
  listings,
  loading,
  showMore,
  onShowMoreClick,
}) {
  return (
    <section className="min-w-0 flex-1 bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-5 py-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
              Property Search
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Find Your Perfect Property
            </h1>

            {!loading && listings.length > 0 && (
              <p className="mt-1 text-sm text-slate-500">
                Showing {listings.length} properties
              </p>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <Search size={20} />
          </div>
        </div>
      </div>
      <div className="p-5 lg:p-8">
        {loading && (
          <div className="flex min-h-[300px] flex-col items-center justify-center">
            <LoaderCircle
              size={38}
              className="animate-spin text-teal-700"
            />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Finding properties...
            </p>
          </div>
        )}
        {!loading && listings.length === 0 && (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Search size={28} className="text-slate-400" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-800">
              No properties found
            </h2>

            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
              We couldn't find any properties matching your current filters.
              Try changing your search criteria.
            </p>
          </div>
        )}
        {!loading && listings.length > 0 && (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {listings.map((listing, index) => (
                <div
                  key={listing._id}
                  className="animate-[fadeUp_0.5s_ease-out_both]"
                  style={{
                    animationDelay: `${Math.min(index * 70, 500)}ms`,
                  }}
                >
                  <ListingItem listing={listing} />
                </div>
              ))}
            </div>
            {showMore && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={onShowMoreClick}
                  className="group inline-flex items-center gap-2 rounded-xl border border-teal-200 bg-white px-6 py-3 font-semibold text-teal-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md"
                >Show More Properties
                  <ArrowDown
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}