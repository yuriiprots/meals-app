import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">All Recipes</Link>
          </li>
          <li>
            <Link to="/recipe/1" className="hover:text-gray-300">Recipe Page (Test)</Link>
          </li>
          <li>
            <Link to="/selection" className="hover:text-gray-300">Selection</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
