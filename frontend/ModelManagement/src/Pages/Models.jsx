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
            <li className="listStyle">
            <h1 className="header">Models</h1>
            <li className="listStyle">
            <button className="paddingBetweenButtons" onClick={fetchModels}>Fetch models</button>
            <button className="paddingBetweenButtons" onClick={() => setShowModal(true)}>Create new model</button>
            </li>
            </li>
            {error && <p className="error">{error}</p>}

            <main className="allJobs-box">
                {models.map((model) => (

                    <section className="job">
                        <p>Name: {model.firstName} {model.lastName}</p>
                        <p>Email: {model.email}</p>
                        <p>Phone: {model.phoneNo}</p>
                        <p>Address: {model.addressLine1}</p>
                        <p>Zip code: {model.zip}</p>
                        <p>City: {model.city}</p>
                        <p>Model ID: {model.modelId}</p>


                    </section>
                ))}
            </main>

            {showModal && createPortal(
                <ModelModal onClose={() => setShowModal(false)} addModel={addModel} />, document.body
            )}
        </section>
    );
}