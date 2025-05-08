import { useEffect, useState } from 'react'

export default function DeleteModelToJobModal({onClose, deleteFromJob }) {

    const [modelId, setModelId] = useState("");
    const [jobId, setJobId] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        if (!jobId || !modelId) {
            setError("Please fill all fields!");
            return;
        }

        const jobIdInt = parseInt(jobId);
        const modelIdInt = parseInt(modelId)

        const url = `http://localhost:8080/api/Jobs/${jobIdInt}/model/${modelIdInt}`
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: new Headers({
                    Authorization: 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });

            if (response.ok) {
                alert("Model removed from job!");
                onClose();
            }
            else {
                const errorData = await response.json;
                setError(errorData.message || "Failed to remove model from job");
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
                <h3>Remove Model From Job</h3>
                <form action="" className="createForm">
                    <input type="number" name="" id="" className="formInput" placeholder="Job ID" value={jobId} onChange={(e) => setJobId(e.target.value)} />
                    <input type="number" name="" id="" className="formInput" placeholder="Model ID" value={modelId} onChange={(e) => setModelId(e.target.value)} />
                    <div className="createBtns">
                        <input type="button" value="Remove" onClick={handleSubmit} />
                        <input type="button" value="Close" onClick={onClose} />
                    </div>
                </form>
                <p>{error}</p>
            </section>
        </>
    )
}