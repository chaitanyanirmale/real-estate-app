import {
  Search,
  SlidersHorizontal,
  Car,
  Sofa,
  Tag,
} from "lucide-react";

export default function SearchFilters({
  sidebardata,
  handleChange,
  handleSubmit,
}) {
  return (
    <aside className="w-full border-b border-slate-200 bg-white md:w-80 md:border-b-0 md:border-r">
      <div className="sticky top-16 p-5 lg:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <SlidersHorizontal size={20} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Search Filters
            </h2>

            <p className="text-xs text-slate-500">
              Find your perfect property
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Search location
            </label>

            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                id="searchTerm"
                placeholder="City, area or property..."
                value={sidebardata.searchTerm}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100"
              />
            </div>
          </div>
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Property Type
            </label>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "all", label: "All" },
                { id: "rent", label: "Rent" },
                { id: "sale", label: "Sale" },
              ].map((item) => (
                <label
                  key={item.id}
                  className={`cursor-pointer rounded-xl border p-3 text-center text-sm font-medium transition ${
                    sidebardata.type === item.id
                      ? "border-teal-600 bg-teal-50 text-teal-700"
                      : "border-slate-200 text-slate-600 hover:border-teal-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    id={item.id}
                    onChange={handleChange}
                    checked={sidebardata.type === item.id}
                    className="hidden"
                  />

                  {item.label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Amenities
            </label>
            <div className="space-y-2">
              <label
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition ${
                  sidebardata.parking
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Car size={18} className="text-slate-500" />

                  <span className="text-sm font-medium text-slate-700">
                    Parking
                  </span>
                </div>

                <input
                  type="checkbox"
                  id="parking"
                  checked={sidebardata.parking}
                  onChange={handleChange}
                  className="h-4 w-4 accent-teal-700"
                />
              </label>

              <label
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition ${
                  sidebardata.furnished
                    ? "border-teal-500 bg-teal-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sofa size={18} className="text-slate-500" />

                  <span className="text-sm font-medium text-slate-700">
                    Furnished
                  </span>
                </div>

                <input
                  type="checkbox"
                  id="furnished"
                  checked={sidebardata.furnished}
                  onChange={handleChange}
                  className="h-4 w-4 accent-teal-700"
                />
              </label>
              <label
                className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition ${
                  sidebardata.offer
                    ? "border-amber-400 bg-amber-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Tag size={18} className="text-slate-500" />

                  <span className="text-sm font-medium text-slate-700">
                    Special Offers
                  </span>
                </div>

                <input
                  type="checkbox"
                  id="offer"
                  checked={sidebardata.offer}
                  onChange={handleChange}
                  className="h-4 w-4 accent-amber-500"
                />
              </label>

            </div>
          </div>

          <div>
            <label
              htmlFor="sort_order"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Sort Properties
            </label>

            <select
              id="sort_order"
              onChange={handleChange}
              value={`${sidebardata.sort}_${sidebardata.order}`}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="regularPrice_desc">
                Price: High to Low
              </option>

              <option value="regularPrice_asc">
                Price: Low to High
              </option>

              <option value="createdAt_desc">
                Latest
              </option>

              <option value="createdAt_asc">
                Oldest
              </option>
            </select>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-teal-800 hover:shadow-lg"
          >
            <Search size={18} />
            Search Properties
          </button>
        </form>
      </div>
    </aside>
  );
}