import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Home, MapPin, BedDouble, Bath, Car, Armchair, Tag, Upload, Trash2, Image as ImageIcon, Save, LoaderCircle} from 'lucide-react';


export default function CreateListing() {
    const {currentUser} = useSelector(state => state.user);
    const navigate = useNavigate();
    const params = useParams();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        images: [],
        name:'',
        description: '',
        address:'',
        type:'rent',
        bedrooms:1,
        bathrooms:1,
        regularPrice:50,
        discountPrice:0,
        offer: false,
        parking: false,
        furnished: false,
    })
    // console.log(formData);
    // const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId;
            const res = await fetch(`/api/listing/get/${listingId}`);
            const data = await res.json();
            if(data.success === false){
                console.log(data.message);
                return;
            }
            setFormData(data);
        }
        fetchListing();
    }, [files]);


    
    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent'){
            setFormData({
                ...formData,
                type: e.target.id
            })
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setFormData({
                ...formData,
               [e.target.id]: e.target.checked
            })
        }
        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.images.length < 1) return setError('You must upload at least one image');
            if(+formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price')
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/update/${params.listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            })
            const data = await res.json();
            setLoading(false);
            if(data.success === false){
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }
    
    // if (fetching) {
    //     return (
    //     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
    //         <div className="flex items-center gap-2 text-slate-600">
    //         <LoaderCircle
    //             size={22}
    //             className="animate-spin"
    //         />
    //         Loading listing...
    //         </div>
    //     </div>
    //     );
    // }
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Home size={20} />
            <span className="font-semibold">
              Property Management
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            Update Listing
          </h1>
          <p className="text-slate-500 mt-2">
            Update your property information and images.
          </p>
        </div>
        <form onSubmit={handleSubmit}
className="space-y-6">

          <section className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                <Home size={20} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Property Information
                </h2>

                <p className="text-sm text-slate-500">
                  Basic information about your property.
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 gap-5">

              {/* NAME */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Property Name
                </label>

                <input
                  type="text"
                  id="name"
                  placeholder="e.g. Modern 2 BHK Apartment"
                  maxLength="62"
                  minLength="10"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl p-3.5 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  id="description"
                  placeholder="Describe your property..."
                  required
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl p-3.5 outline-none resize-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />

              </div>

              {/* ADDRESS */}

              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Address
                </label>

                <div className="relative">

                  <MapPin
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    id="address"
                    placeholder="Property address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />

                </div>

              </div>

            </div>

          </section>
          
          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-5">
              Property Type
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition ${
                  formData.type === 'sale'
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}>
                <input type="radio" name="type" id="sale" checked={formData.type === 'sale'} onChange={handleChange} className="accent-green-600"/>
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
                className={`flex items-center gap-3 border rounded-xl p-4 cursor-pointer transition ${
                  formData.type === 'rent'
                    ? 'border-green-500 bg-green-50'
                    : 'border-slate-200 hover:bg-slate-50'
                }`} >
                <input
                  type="radio"
                  name="type"
                  id="rent"
                  checked={formData.type === 'rent'}
                  onChange={handleChange}
                  className="accent-green-600"
                />

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

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-5">
              Property Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <BedDouble size={20}  className="text-green-600"/>
                  <label className="font-semibold">
                    Bedrooms
                  </label>
                </div>
                <input type="number" id="bedrooms" min="1" max="10" required value={formData.bedrooms} onChange={handleChange} className="w-full border border-slate-200 rounded-lg p-3" />
              </div>
              <div className="border border-slate-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Bath
                    size={20}
                    className="text-green-600"
                  />
                  <label className="font-semibold">
                    Bathrooms
                  </label>
                </div>
                <input type="number" id="bathrooms" min="1" max="10" required value={formData.bathrooms} onChange={handleChange} className="w-full border border-slate-200 rounded-lg p-3"/>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-slate-50">
                <input type="checkbox" id="parking" checked={formData.parking} onChange={handleChange} className="w-5 h-5 accent-green-600"/>
                <Car size={19} />
                <span className="font-medium">
                  Parking
                </span>
              </label>
              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-slate-50">
                <input type="checkbox" id="furnished" checked={formData.furnished} onChange={handleChange} className="w-5 h-5 accent-green-600"/>
                <Armchair size={19} />
                <span className="font-medium">
                  Furnished
                </span>
              </label>
              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:bg-slate-50">
                <input type="checkbox" id="offer" checked={formData.offer} onChange={handleChange} className="w-5 h-5 accent-green-600"/>
                <Tag size={19} />
                <span className="font-medium">
                  Special Offer
                </span>
              </label>
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-5">
              Pricing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Regular Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">₹</span>
                  <input type="number" id="regularPrice" min="50" max="1000000" required value={formData.regularPrice} onChange={handleChange} className="w-full border border-slate-200 rounded-xl p-3.5 pl-9"/>
                </div>
                {formData.type === 'rent' && (
                  <p className="text-xs text-slate-500 mt-1">
                    Price per month
                  </p>
                )}
              </div>

              {formData.offer && (
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Discounted Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">₹</span>
                    <input type="number" id="discountPrice" min="0" max="1000000" required value={formData.discountPrice} onChange={handleChange} className="w-full border border-slate-200 rounded-xl p-3.5 pl-9"/>
                  </div>
                  {formData.type === 'rent' && (
                    <p className="text-xs text-slate-500 mt-1">
                      Discounted monthly price
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>

          <section className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 text-green-700 rounded-lg">
                <ImageIcon size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                Property Images
              </h2>
            </div>
            <p className="text-sm text-slate-500 mb-5">
              The first image will be used as the cover image.
              You can have up to 6 images.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                className="flex-1 border border-slate-200 rounded-xl p-3 text-sm"/>
              <button
                type="button"
                disabled={
                  uploading ||
                  files.length === 0 ||
                  formData.images.length >= 6
                } className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-5 py-3 font-semibold disabled:opacity-50">
                {uploading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin"/>
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Upload
                  </>
                )}
              </button>
            </div>

            {formData.images.length > 0 && (
              <div className="mt-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {formData.images.flat().map((image, index) => (
                    <div key={`${image}-${index}`} className="relative group rounded-xl overflow-hidden border border-slate-200">
                      <img src={`http://localhost:5000${image}`} alt={`Property ${index + 1}`} className="w-full h-40 object-cover"/>
                      {index === 0 && (
                        <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                          Cover
                        </span>
                      )}
                      <button type="button" onClick={() => handleDeleteImage(index)} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg opacity-90">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

          <button disabled={loading || uploading} className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl p-4 font-semibold text-lg transition disabled:opacity-60">
            {loading ? (
              <>
                <LoaderCircle size={20} className="animate-spin" />
                Updating Listing...
              </>
            ) : (
              <>
                <Save size={20} />
                Update Listing
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  )
}
