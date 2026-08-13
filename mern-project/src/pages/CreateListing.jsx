import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Home, MapPin, BedDouble, Bath, Car, Armchair, Tag, Upload, Trash2, ImagePlus, IndianRupee} from 'lucide-react';

export default function CreateListing() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    images: [],
    name: '',
    description: '',
    address: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleImageUpload = async () => {
    if (files.length === 0) {
      return setImageUploadError('Please select at least one image');
    }
    if (files.length > 6) {
      return setImageUploadError('You can only upload up to 6 images');
    }
    if (formData.images.length + files.length > 6) {
      return setImageUploadError('You can only have up to 6 images');
    }
    setUploading(true);
    setImageUploadError(false);
    try {
      const formDataObj = new FormData();
      for (let i = 0; i < files.length; i++) {
        formDataObj.append('images', files[i]);
      }
      const res = await fetch('/api/listing/upload', {
        method: 'POST',
        body: formDataObj,
      });
      const data = await res.json();
      if (data.success === false) {
        setImageUploadError(data.message);
        setUploading(false);
        return;
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...data.urls],
      }));
      setImageUploadError(false);
      setFiles([]);
    } catch (error) {
      setImageUploadError(error.message);
    }
    setUploading(false);
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    if (id === 'sale' || id === 'rent') {
      setFormData((prev) => ({
        ...prev,
        type: id,
      }));
      return;
    }
    if (
      id === 'parking' ||
      id === 'furnished' ||
      id === 'offer'
    ) {
      setFormData((prev) => ({
        ...prev,
        [id]: checked,
      }));
      return;
    }
    if (
      type === 'number' ||
      type === 'text' ||
      type === 'textarea'
    ) {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length < 1) {
        return setError('You must upload at least one image');
      }
      if (+formData.regularPrice < +formData.discountPrice) {
        return setError(
          'Discount price must be lower than regular price'
        );
      }
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-green-100 rounded-xl">
              <Home className="text-green-700" size={25} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
              Create Listing
            </h1>
          </div>
          <p className="text-slate-500 ml-1">
            Add your property details and publish your listing.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <section className="bg-white rounded-2xl shadow-sm p-5 sm:p-7 mb-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Basic Information
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Tell potential buyers or renters about your property.
              </p>
            </div>
            <div className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Property Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="e.g. Modern 3 Bedroom Apartment"
                  maxLength="62"
                  minLength="10"
                  required
                  onChange={handleChange}
                  value={formData.name}
                  className="w-full border border-slate-200 rounded-xl p-3.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Describe the property, nearby facilities, features, etc."
                  required
                  rows="5"
                  onChange={handleChange}
                  value={formData.description}
                  className="w-full border border-slate-200 rounded-xl p-3.5 outline-none resize-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Property Address
                </label>
                <div className="relative">
                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600"
                  />
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter property location"
                    required
                    onChange={handleChange}
                    value={formData.address}
                    className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white rounded-2xl shadow-sm p-5 sm:p-7 mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-5">
              Property Type
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition ${
                  formData.type === 'sale'
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                <input
                  type="radio"
                  id="sale"
                  name="propertyType"
                  checked={formData.type === 'sale'}
                  onChange={handleChange}
                  className="accent-green-600"/>
                <div>
                  <p className="font-semibold text-slate-800">
                    For Sale
                  </p>
                  <p className="text-xs text-slate-500">
                    Sell this property
                  </p>
                </div>
              </label>
              <label
                className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition ${
                  formData.type === 'rent'
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:border-slate-300'
                }`}>
                <input
                  type="radio"
                  id="rent"
                  name="propertyType"
                  checked={formData.type === 'rent'}
                  onChange={handleChange}
                  className="accent-green-600"/>
                <div>
                  <p className="font-semibold text-slate-800">
                    For Rent
                  </p>
                  <p className="text-xs text-slate-500">
                    Rent this property
                  </p>
                </div>
              </label>
            </div>
          </section>
          <section className="bg-white rounded-2xl shadow-sm p-5 sm:p-7 mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-5">
              Property Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BedDouble
                      size={20}
                      className="text-green-700"/>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">
                      Bedrooms
                    </p>
                    <p className="text-xs text-slate-400">
                      Number of bedrooms
                    </p>
                  </div>
                </div>
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  onChange={handleChange}
                  value={formData.bedrooms}
                  className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-green-500"/>
              </div>
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Bath
                      size={20}
                      className="text-green-700"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-700">
                      Bathrooms
                    </p>
                    <p className="text-xs text-slate-400">
                      Number of bathrooms
                    </p>
                  </div>
                </div>
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  onChange={handleChange}
                  value={formData.bathrooms}
                  className="w-full border border-slate-200 rounded-lg p-3 outline-none focus:border-green-500"/>
              </div>
            </div>
          </section>
          <section className="bg-white rounded-2xl shadow-sm p-5 sm:p-7 mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-5">
              Amenities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label
                className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition ${
                  formData.parking
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200'
                }`}>
                <input
                  type="checkbox"
                  id="parking"
                  onChange={handleChange}
                  checked={formData.parking}
                  className="accent-green-600 w-4 h-4"/>
                <Car
                  size={20}
                  className="text-green-600"
                />
                <span className="font-medium text-slate-700">
                  Parking
                </span>
              </label>
              <label
                className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition ${
                  formData.furnished
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  id="furnished"
                  onChange={handleChange}
                  checked={formData.furnished}
                  className="accent-green-600 w-4 h-4"/>
                <Armchair
                  size={20}
                  className="text-green-600"
                />
                <span className="font-medium text-slate-700">
                  Furnished
                </span>
              </label>
              <label
                className={`cursor-pointer border rounded-xl p-4 flex items-center gap-3 transition ${
                  formData.offer
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200'
                }`}>
                <input
                  type="checkbox"
                  id="offer"
                  onChange={handleChange}
                  checked={formData.offer}
                  className="accent-green-600 w-4 h-4"
                />
                <Tag
                  size={20}
                  className="text-green-600"
                />
                <span className="font-medium text-slate-700">
                  Special Offer
                </span>
              </label>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-5 sm:p-7 mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-5">
              Pricing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="regularPrice"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  {formData.type === 'rent'
                    ? 'Monthly Rent'
                    : 'Property Price'}
                </label>
                <div className="relative">

                  <IndianRupee
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="number"
                    id="regularPrice"
                    min="50"
                    max="100000000"
                    required
                    onChange={handleChange}
                    value={formData.regularPrice}
                    className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>

              {formData.offer && (
                <div>
                  <label
                    htmlFor="discountPrice"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Discounted Price
                  </label>

                  <div className="relative">
                    <IndianRupee
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="number"
                      id="discountPrice"
                      min="0"
                      max="100000000"
                      required
                      onChange={handleChange}
                      value={formData.discountPrice}
                      className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-5 sm:p-7 mb-6">
            <div className="flex items-start gap-3 mb-5">
              <div className="p-3 bg-green-100 rounded-xl">
                <ImagePlus
                  size={22}
                  className="text-green-700"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Property Images
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Upload up to 6 images. The first image will be the cover.
                </p>
              </div>

            </div>

            <div className="border-2 border-dashed border-slate-200 rounded-xl p-5">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  onChange={(e) =>
                    setFiles(Array.from(e.target.files))
                  }
                  className="flex-1 p-3 border border-slate-200 rounded-xl"
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                />
                <button
                  onClick={handleImageUpload}
                  disabled={uploading}
                  type="button"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-60"
                >
                  <Upload size={18} />
                  {uploading
                    ? 'Uploading...'
                    : 'Upload Images'}
                </button>
              </div>
              {imageUploadError && (
                <p className="text-red-600 text-sm mt-3">
                  {imageUploadError}
                </p>
              )}

            </div>
            {formData.images.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-slate-700 mb-3">
                  Uploaded Images ({formData.images.length}/6)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formData.images.map((url, index) => (
                    <div
                      key={index}
                      className="relative group rounded-xl overflow-hidden aspect-video bg-slate-100"
                    >

                      <img
                        src={url}
                        alt={`Property ${index + 1}`}
                        className="w-full h-full object-cover"
                      />

                      {index === 0 && (
                        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                          Cover Image
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition"
                        title="Remove image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </section>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-5">
              {error}
            </div>
          )}

          <button
            disabled={loading || uploading}
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-xl p-4 font-semibold text-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading
              ? 'Creating Listing...'
              : 'Create Listing'}
          </button>
        </form>
      </div>
    </main>
  );
}