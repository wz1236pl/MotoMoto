import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../src/Assets/Logo.svg';
import { Link } from 'react-router-dom';
import CarList from './CarList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const navigation = [
  { name: 'Dodaj Ogłoszenie', to: '/AddAnnouncement' },
  { name: 'Ulubione', to: '/Favorite' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserEmail, setLoggedInUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    const storedEmail = localStorage.getItem('loggedInUserEmail');
    setLoggedInUserEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUserEmail');
    setIsLoggedIn(false);
    setLoggedInUserEmail("");
  };

  const renderAuthLinks = () => {
    if (isLoggedIn) {
      return (
        <>
          <Link to="/ResetPassword" className="text-sm font-semibold leading-6 text-gray-900 pr-2">
            Resetuj hasło
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold leading-6 text-gray-900 pr-2"
          >
            Wyloguj
          </button>
          <ToastContainer />
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 pr-2">
            Zaloguj
          </Link>
          <Link to="/register" className="text-sm font-semibold leading-6 text-gray-900">
            Zarejestruj
          </Link>
        </>
      );
    }
  };

  useEffect(() => {
    if (loggedInUserEmail) {
      toast.success(`Witaj ${loggedInUserEmail}`);
    }
  }, [loggedInUserEmail]);

  return (
    <div className="container mr-auto ml-auto">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/#" className="-m-1.5 p-1.5">
              <img className="h-8 w-auto" src={logo} alt="logo"></img>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} to={item.to} className="text-sm font-semibold leading-6 text-gray-900">
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {renderAuthLinks()}
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="/#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img className="h-8 w-auto" src={logo} alt="logo-mobile" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item, index) => (
                    <a key={index}>
                      <Link to={item.to}>{item.name}<br /></Link>
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  {renderAuthLinks()}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <CarList />
    </div>
  );
};

export default Header;
