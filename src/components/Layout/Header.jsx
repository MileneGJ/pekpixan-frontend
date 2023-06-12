import { Link, useLocation } from "react-router-dom";
import mainlogo from "../../assets/main-logo.jpg";

function Header() {
  const { pathname } = useLocation();
  return (
    <div className="main-header">
      {pathname !== "/" ? (
        <Link className="link-logo" to="/">
          {" "}
          <img src={mainlogo} alt="Logo" />{" "}
        </Link>
      ) : null}
      <Link to="/disciplines">Disciplinas</Link>
      <Link to="/dogs">Perros</Link>
    </div>
  );
}

export default Header;
