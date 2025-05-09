import { useState } from "react"
import { jwtDecode } from 'jwt-decode';
import ModelModal from "../Modals/CreateModelModal";
import { createPortal } from 'react-dom';

export default function Models() {
    const [models, setModels] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem("token");
    if (token) {
        const decoded = jwtDecode(token);
        console.log(decoded);
        console.log(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Manager");
        console.log(decoded["ModelId"]); // get ModelId 
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    }

    const fetchModels = async () => {
        const url = "http://localhost:8080/api/models";
        console.log("Bruger token:", token);

        try {
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to fetch models");
            }

            const data = await response.json();
            setModels(data);
        }
        catch (error) {
            setError("Something went wrong: " + error.message);
        }
    };

    function addModel(newModel) {
        setModels(prevData => [...prevData, newModel])
    };

    return (
        <section className="mainPage">
            <h1 className="header">Models-page</h1>

            <button onClick={fetchModels}>Fetch models</button>
            <button onClick={() => setShowModal(true)}>Create new model</button>

            {error && <p className="error">{error}</p>}

            <main className="allJobs-box">
                {models.map((model) => (

                    <section className="job">
                        <p>{model.firstName} {model.lastName}</p>
                        <p>{model.email}</p>
                        <p>{model.phoneNo}</p>
                        <p>{model.addressLine1}</p>
                        <p>{model.zip}</p>
                        <p>{model.city}</p>


                    </section>
                ))}
            </main>

            {showModal && createPortal(
                <ModelModal onClose={() => setShowModal(false)} addModel={addModel} />, document.body
            )}
        </section>
    );
}