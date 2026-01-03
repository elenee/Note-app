import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="py-3">
      <Link to='/notes'>
        <img src="/logo.svg" alt="logo" className="w-max-[100%]" />
      </Link>
    </div>
  );
};

export default Logo;
