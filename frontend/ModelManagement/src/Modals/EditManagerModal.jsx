import { useEffect, useState } from 'react'

export default function UpdateManagerModal({
    currentFirstName,
    CurrentLastName,
    CurrentEmail,
    managerId,
    onClose }) {

    const [firstName, setFirstName] = useState(currentFirstName || "");
    const [lastName, setLastName] = useState(CurrentLastName || "");
    const [email, setEmail] = useState(CurrentEmail || "");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        if (!firstName || !lastName || !email) setError("Please fill all fields!");

        const url = `http://localhost:8080/api/Managers/${managerId}`
        try {
            const response = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify({ firstName, lastName, email }),
                headers: new Headers({
                    Authorization: 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });

            if (response.ok) {
                const newManager = await response.json();
                alert("manager updated!");
                onClose();
            }
            else {
                const errorData = await response.json;
                setError(errorData.message || "Failed to update manager");
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
                    <input type="text" name="" id="" className="formInput" placeholder="Firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input type="text" name="" id="" className="formInput" placeholder="Lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input type="text" name="" id="" className="formInput" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className="createBtns">
                        <input type="button" value="Update Manager" onClick={handleSubmit} />
                        <input type="button" value="Close" onClick={onClose} />
                    </div>
                </form>
                <p>{error}</p>
            </section>
        </>
    )
}