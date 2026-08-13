import { useSelector } from 'react-redux'  
import { useState, useRef, useEffect } from 'react';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure,  deleteUserSuccess, signOutUserStart } from '../redux/user/userSlice.js';
import { User, Mail, Lock, Plus, LogOut, Trash2, Pencil, Home, MapPin, BedDouble, Bath, LoaderCircle,
} from 'lucide-react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


export default function profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError ,setFileUploadError] = useState(false);
  // console.log(file);
  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [showListingsError, setShowListingsError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [userListings, setUserListings] = useState([]);
  // console.log(formData);

  const handlechange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
        const data = await res.json();
        if(data.success === false){
          dispatch(updateUserFailure(data.message));
          return;
        }
        dispatch(updateUserSuccess(data));
        setUpdateSuccess(true);
    }catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }

  const handleDeleteUser = async () => {
      try {
        dispatch(updateUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if(data.success === false){
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data)); // Clear current user
      }
      catch(error){
        dispatch(deleteUserFailure(error.message));
      }
    }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(null)); // Clear current user
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }
      setUserListings(data);
      // console.log(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) =>{
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        console.log(data.message);
        return;
      }
      setUserListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
            My Profile
          </h1>
          <p className="text-slate-500 mt-2">
            Manage your account and properties.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="bg-white rounded-2xl shadow-sm p-6 h-fit">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img src={
                    currentUser.image ||
                    'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-4 border-green-100"/>
                <div className="absolute bottom-1 right-1 bg-green-600 text-white p-2 rounded-full">
                  <User size={15} />
                </div>
              </div>
              <h2 className="text-xl font-bold text-slate-800">
                {currentUser.username}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {currentUser.email}
              </p>
            </div>
            <div className="border-t border-slate-100 my-6" />

            <Link
              to="/create-listing"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white rounded-xl p-3 font-semibold transition"
            >
              <Plus size={19} />
              Create Listing
            </Link>

            <button
              onClick={handleShowListings}
              className="flex items-center justify-center gap-2 w-full mt-3 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl p-3 font-semibold transition"
            >
              <Home size={19} />
              {userListings ? 'Refresh Listings' : 'My Listings'}
            </button>
          </section>

          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Account Settings
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Update your personal information.
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    id="username"
                    defaultValue={currentUser.username}
                    onChange={handlechange}
                    className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    id="email"
                    defaultValue={currentUser.email}
                    onChange={handlechange}
                    className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-slate-700 mb-2"
                >
                  New Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    id="password"
                    placeholder="Enter new password"
                    onChange={handlechange}
                    className="w-full border border-slate-200 rounded-xl p-3.5 pl-11 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />
                </div>
              </div>
              <button
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl p-3.5 font-semibold transition disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <LoaderCircle
                      size={19}
                      className="animate-spin"
                    />
                    Updating...
                  </>
                ) : (
                  'Update Profile'
                )}
              </button>
            </form> 
            {updateSuccess && (
              <p className="text-green-600 text-sm mt-4">
                Profile updated successfully!
              </p>
            )}
            {error && (
              <p className="text-red-600 text-sm mt-4">
                {error}
              </p>
            )}
            <div className="border-t border-slate-100 mt-7 pt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center gap-2 flex-1 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl p-3 font-semibold transition"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="flex items-center justify-center gap-2 flex-1 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl p-3 font-semibold transition"
                >
                  <Trash2 size={18} />
                  Delete Account
                </button>
              </div>
            </div>
          </section>
        </div>
        {userListings && (
          <section className="bg-white rounded-2xl shadow-sm p-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Your Listings
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Manage properties you've created.
                </p>
              </div>
              <Link
                to="/create-listing"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 py-2.5 font-semibold transition"
              >
                <Plus size={18} />
                Add Property
              </Link>
            </div>
            {showListingsError && (
              <p className="text-red-600 text-sm">
                Error showing listings.
              </p>
            )}
            {userListings.length === 0 &&
              !showListingsError && (
                <div className="text-center py-12">
                  <Home
                    size={45}
                    className="mx-auto text-slate-300 mb-3"
                  />
                  <h3 className="font-semibold text-slate-700">
                    No listings yet
                  </h3>
                  <p className="text-sm text-slate-500 mt-1 mb-5">
                    Start by creating your first property listing.
                  </p>
                  <Link
                    to="/create-listing"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold"
                  >
                    <Plus size={18} />
                    Create Listing
                  </Link>
                </div>
              )}
            {userListings.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userListings.map((listing) => (
                  <div
                    key={listing._id}
                    className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition"
                  >
                    <div className="flex">
                      <Link
                        to={`/listing/${listing._id}`}
                        className="w-32 sm:w-40 shrink-0"
                      >
                      {listing.images?.[0] ? (
                          <img
                            src={listing.images[0]}
                            alt={listing.name}
                            className="w-full h-full min-h-[150px] object-cover"
                          />
                        ) : (
                          <div className="w-full h-full min-h-[150px] bg-slate-100 flex items-center justify-center">
                            <Home
                              size={30}
                              className="text-slate-300"
                            />
                          </div>
                        )}
                      </Link>
                      <div className="p-4 flex flex-col flex-1 min-w-0">
                        <Link
                          to={`/listing/${listing._id}`}
                        >
                          <h3 className="font-bold text-slate-800 truncate hover:text-green-600 transition">
                            {listing.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1 text-slate-500 text-xs mt-2">
                          <MapPin size={14} />
                          <span className="truncate">
                            {listing.address}
                          </span>
                        </div>
                        <p className="text-green-700 font-bold mt-3">
                          ₹{' '}
                          {listing.offer
                            ? listing.discountPrice?.toLocaleString(
                                'en-IN'
                              )
                            : listing.regularPrice?.toLocaleString(
                                'en-IN'
                              )}
                        </p>
                        <div className="flex gap-3 text-xs text-slate-500 mt-2">
                          <span className="flex items-center gap-1">
                            <BedDouble size={14} />
                            {listing.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath size={14} />
                            {listing.bathrooms}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-auto pt-4">
                          <Link
                            to={`/update-listing/${listing._id}`}
                            className="flex items-center justify-center gap-1 flex-1 border border-green-600 text-green-700 hover:bg-green-50 rounded-lg py-2 text-sm font-semibold"
                          >
                            <Pencil size={15} />
                            Edit
                          </Link>
                          <button
                            onClick={() =>
                              handleListingDelete(listing._id)
                            }
                            className="flex items-center justify-center gap-1 flex-1 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg py-2 text-sm font-semibold"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  )
}
