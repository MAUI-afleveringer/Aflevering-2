import { useState } from 'react'

export default function JobModal({ onClose, addJob }) {
    //parameters for adding new job
    const [customer, setcustomer] = useState("");
    const [startDate, setStartDate] = useState("");
    const [days, setDays] = useState("");
    const [location, setLocation] = useState("");
    const [comments, setComments] = useState("");

    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!customer || !startDate || !days || !location || !comments){
            setError("please fill out all fields!");
            return;
        } 

        const startDateIso = startDate ? new Date(startDate).toISOString(): null;

        const newModel = {
            customer,
            startDate: startDateIso,
            days,
            location,
            comments
        }

        const url = "http://localhost:8080/api/Jobs"
        try {
            console.log(JSON.stringify(newModel, null, 2)); //For printing what we are sending. 
            const response = await fetch(url, {
                method: "POST",
                headers: new Headers({
                    Authorization: 'bearer ' + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ customer, startDate: startDateIso, days, location, comments })
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
                    <input type="text" className="formInput" placeholder="customer" value={customer} onChange={(e) => setcustomer(e.target.value)} />
                    <input type="date" className="formInput" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    <input type="number" className="formInput" placeholder="Days" value={days} onChange={(e) => setDays(e.target.value)} />
                    <input type="text" className="formInput" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    <input type="text" className="formInput" placeholder="Comments" value={comments} onChange={(e) => setComments(e.target.value)} />
                    <div className="createBtns">
                        <input type="button" value="Add job" onClick={handleSubmit} />
                        <input type="button" value="Close" onClick={onClose} />
                    </div>
                </form>
                <p>{error}</p>
            </section>
        </>
    )
}