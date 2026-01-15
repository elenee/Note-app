import { Link } from "react-router-dom";
import { LogoIcon } from "../../Icons/Icons";

const Logo = () => {
  return (
    <div className="py-3">
      <Link to="/notes">
        <LogoIcon/>
      </Link>
    </div>
  );
};

export default Logo;
