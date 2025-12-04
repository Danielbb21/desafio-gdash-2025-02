
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuthContext } from '../../providers/authProvider';
import { jwtDecode } from 'jwt-decode';

interface ILinks {
  name: string;
  path: string;
}

interface IToken {
  sub: string;
  role: string;
  username: string;
}


export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuthContext();
  const { username } = jwtDecode<IToken>(user || '');

  const links: ILinks[] = [];
  links.push({ name: "Home", path: "/home" });
  links.push({ name: "Profile", path: "/profile" });

  const { logout } = useAuthContext();
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            {/* <Link to="/home">
              <img src={trocoLogo} alt="Logo" className="h-12 w-auto" />
            </Link> */}
          </div>

          <div className='flex items-center justify-center'>
            <span>Usuário: {username}</span>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === link.path
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              className="px-3 py-2 rounded-md text-sm font-medium text-red-500 hover:bg-gray-200"
              onClick={() => logout()}
            >
              Sair
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1 bg-white shadow-md">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
                }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <button
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-200"
            onClick={() => logout()}
          >
            Sair
          </button>
        </div>
      )}
    </nav>
  );
};