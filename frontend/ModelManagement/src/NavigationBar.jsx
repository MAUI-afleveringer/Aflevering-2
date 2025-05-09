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
        <nav style={{ padding: '10px', borderBottom: '5px solid #ccc'}}>
            <button onClick={handleNavigateToJobs}>Jobs</button>
            <button onClick={handleNavigateToModels}>Models</button>
            <button onClick={handleNavigateToManagers}>Managers</button>
            <button onClick={handleNavigateToExpenses}>Expenses</button>
            <button onClick={handleLogout}>Log Out</button>

        </nav>
    );
}