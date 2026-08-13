import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  User,
  Home,
  Building2,
  Info,
  Phone,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Buy",
      path: "/search?type=sale",
      icon: Building2,
    },
    {
      name: "Rent",
      path: "/search?type=rent",
      icon: Building2,
    },
    {
      name: "About",
      path: "/about",
      icon: Info,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: Phone,
    },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path.split("?")[0];
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          
          <Link
            to="/"
            onClick={closeMenu}
            className="group flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm transition duration-300 group-hover:scale-105 group-hover:rotate-3">
              <Home size={20} />
            </div>

            <div className="leading-tight">
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                Prime<span className="text-teal-700">Nest</span>
              </h1>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "text-teal-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-teal-700"
                  }`}
                >
                  <Icon
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />

                  {link.name}

                  <span
                    className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-teal-700 transition-all duration-300 ${
                      active ? "w-5" : "w-0 group-hover:w-5"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/search"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-600 transition-all duration-300 hover:bg-teal-50 hover:text-teal-700 hover:scale-105"
              aria-label="Search properties"
            >
              <Search size={19} />
            </Link>

            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
            >
              <User size={17} />
              <span>Profile</span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 transition-all duration-300 hover:bg-slate-100 md:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen
              ? "max-h-[500px] pb-4 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col gap-1 border-t border-slate-100 pt-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    active
                      ? "bg-teal-50 text-teal-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-teal-700"
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </Link>
              );
            })}

            <Link
              to="/search"
              onClick={closeMenu}
              className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-slate-50 hover:text-teal-700"
            >
              <Search size={18} />
              Search Properties
            </Link>

            <Link
              to="/profile"
              onClick={closeMenu}
              className="flex items-center gap-3 rounded-xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-teal-800"
            >
              <User size={18} />
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}