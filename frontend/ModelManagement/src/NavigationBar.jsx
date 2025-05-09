import { Link, useNavigate } from "react-router-dom";

export default function NavigationBar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    };

    const handleNavigateToJobs = () => {
        navigate("/jobs")
    };
    const handleNavigateToModels = () => {
        navigate("/models")
    };
    const handleNavigateToManagers = () => {
        navigate("/managers")
    };
    const handleNavigateToExpenses = () => {
        navigate("/expenses")
    };

    return (
        <nav className="nav" style={{ padding: '10px', borderBottom: '0px solid #ccc', marginRight: '10px' }}>
            <a style={{ marginRight: '10px' }}>
                <button className="buttonNavbar" onClick={handleNavigateToJobs}>Jobs</button>
                <button className="buttonNavbar" onClick={handleNavigateToModels}>Models</button>
                <button className="buttonNavbar" onClick={handleNavigateToManagers}>Managers</button>
                <button className="buttonNavbar" onClick={handleNavigateToExpenses}>Expenses</button>
            </a>
            <b>
                <button className="buttonNavbar" onClick={handleLogout}>Log Out</button>
            </b>

        </nav>
    );
}