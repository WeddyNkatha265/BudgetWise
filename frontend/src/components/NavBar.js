import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/add-budget">Add Budget</Link>
      <Link to="/manage-expenses">Manage Expenses</Link>
    </nav>
  );
}

export default NavBar;
