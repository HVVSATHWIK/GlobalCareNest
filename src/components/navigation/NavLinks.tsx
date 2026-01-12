import { Link } from 'react-router-dom';
import { navItems } from './navItems';

const NavLinks = () => {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-[#B9E5E8] hover:text-[#219B9D] transition-colors"
        >
          <item.icon className="h-4 w-4" />
          <span>{item.name}</span>
        </Link>
      ))}
    </>
  );
};

export default NavLinks;