import { useState } from 'react'

export default function JobModal({ onClose, addJob }) {
    //parameters for adding new job
    const [customerName, setCustomerName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [days, setDays] = useState("");
    const [location, setLocation] = useState("");
    const [comments, setComments] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        const token = localStorage.getItem("token");
        e.preventDefault();
        if (!customerName || !startDate || !days || !location || !comments) setError("please fill out all fields!");

        const url = "http://localhost:8080/api/Jobs"
        try {
            const response = await fetch(url, {
                body: JSON.stringify({ customerName, startDate, days, location, comments }),
                headers: new Headers({
                    Authorization: 'bearer' + token,
                    'Content-Type': 'application/json'
                })
            });

            if (response.ok) {
                const newJob = await response.json();
                alert("New job addded");
                addJob(newJob);
                console.log(newJob);
                onClose();
            }
            else {
                const errorData = await response.json;
                setError(errorData.message || "failed to create new job");
            }

        }
        catch (e) {
            setError(`Error: ${e.message}`);
        }
    }


    return (
        <>
            <div className="dark"></div>
            <section className="createModal">
                <h3>Create Job</h3>
                <form action="" className="createForm">
                    <input type="text" className="formInput" placeholder="Customername" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                    <input type="date" c />
                    <input type="text" className="formInput" placeholder="Customername" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                </form>
            </section>
        </>
    )

    //<input type="date"></input>
}