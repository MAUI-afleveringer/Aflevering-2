import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        console.log(`Logging in with email: ${email} and password: ${password}`);


        let url = "http://localhost:8080/api/account/login";
        try {
            let response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            });

            if (response.ok) {
                const token = await response.text();
                localStorage.setItem("token", token);
                alert("Login successful!")
                navigate("/jobs");

                // Change view to some other component
            }
            else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed");
            }
        }
        catch (err) {
            setError("Error: " + err.message);
        }
    }

    const handleLogout = () => {
        setError("");
        localStorage.removeItem("token");
        alert("Logout successful");
        navigate("/")

    }



    return (
        <section id="loginWrapper">
            <form action="" id="loginForm" onSubmit={handleSubmit}>
                <input type="text" name="" id="" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="" id="" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Login" />
                {error && <p className="error">{error}</p>}
            </form>
            <button onClick={handleLogout}>Log Out</button>
        </section>
    )
} 