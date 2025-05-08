import { useState } from 'react'

export default function ManagerModal({ onClose, addManager }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        if (!firstName || !lastName || !email || !password) setError("Please fill all fields!");

        const url = "http://localhost:8080/api/Managers"
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ firstName, lastName, email, password }),
                headers: new Headers({
                    Authorization: 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });

            if (response.ok) {
                const newManager = await response.json();
                alert("New manager added!");
                addManager(newManager);
                console.log(newManager)
                onClose();
            }
            else {
                const errorData = await response.json;
                setError(errorData.message || "Failed to create manager");
            }
        }
        catch (err) {
            setError(`Error: ${err.message}`);
        }
    }

    return (
        <>
            <div className="dark"></div>
            <section className="createModal">
                <h3>Create Manager</h3>
                <form action="" className="createForm">
                    <input type="text" name="" id="" className="formInput" placeholder="Firstname" onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" name="" id="" className="formInput" placeholder="Lastname" onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" name="" id="" className="formInput" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" name="" id="" className="formInput" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <div className="createBtns">
                        <input type="button" value="Create Manager" onClick={handleSubmit} />
                        <input type="button" value="Close" onClick={onClose} />
                    </div>
                </form>
                <p>{error}</p>
            </section>
        </>
    )
}