import { useEffect, useState } from 'react'

export default function AddModelToJobModal({onClose, deleteFromJob }) {

    const [modelId, setModelId] = useState("");
    const [jobId, setJobId] = useState("");

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        if (!jobId || !modelId) setError("Please fill all fields!");

        const url = `http://localhost:8080/api/Jobs/${jobId}/model/${modelId}`
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                ///body: JSON.stringify({ jobId, modelId }),
                headers: new Headers({
                    Authorization: 'bearer ' + token,
                    'Content-Type': 'application/json'
                })
            });

            if (response.ok) {
                const deleteModelFromJob = await response.json();
                deleteFromJob(deleteModelFromJob);
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
                    <input type="int" name="" id="" className="formInput" placeholder="Job ID" value={firstName} onChange={(e) => setJobId(e.target.value)} />
                    <input type="int" name="" id="" className="formInput" placeholder="Model ID" value={lastName} onChange={(e) => setModelId(e.target.value)} />
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