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
        <nav className= "nav" style={{ padding: '10px', borderBottom: '5px solid #ccc'}}>
            <button className="buttonNavbar" onClick={handleNavigateToJobs}>Jobs</button>
            <button className="buttonNavbar" onClick={handleNavigateToModels}>Models</button>
            <button className="buttonNavbar" onClick={handleNavigateToManagers}>Managers</button>
            <button className="buttonNavbar" onClick={handleNavigateToExpenses}>Expenses</button>
            <button className="buttonNavbar" onClick={handleLogout}>Log Out</button>

        </nav>
    );
}