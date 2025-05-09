import { useEffect, useState } from 'react'

export default function AddModelToJobModal({
    onClose,
    jobId,
    AddModel }) {

    const [modelId, setModelId] = useState(0);
    const [error, setError] = useState("");


    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        if (!modelId) setError("Please fill model id!");

        const url = `http://localhost:8080/api/Jobs/${jobId}/model/${modelId}`
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({ jobId, modelId }),
                headers: new Headers({
                    Authorization: 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });

            if (response.ok) {
                const updatedJob = await response.json();
                alert("Model added!");
                AddModel(updatedJob);
                onClose();
            }
            else {
                const errorData = await response.json();
                setError(errorData.modelId || "Failed to add model");
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
                    <input type="number" className="formInput" placeholder="Id of model" onChange={(e) => setModelId(e.target.value)} />
                    <div className="createBtns">
                        <input type="button" value="Add Model" onClick={handleSubmit} />
                        <input type="button" value="Close" onClick={onClose} />
                    </div>
                </form>
                <p>{error}</p>
            </section>
        </>
    )
}