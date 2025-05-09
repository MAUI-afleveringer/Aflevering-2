import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react'
const token = localStorage.getItem("token");

export default function ExpenseModal({ onClose, addExpense }) {
    const decoded = jwtDecode(token);


    const [jobId, setJobId] = useState("");
    const [date, setDate] = useState("");
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        const modelId = decoded["ModelId"];
        e.preventDefault();
        setError("");

        const url = "http://localhost:8080/api/Expenses"
        const dateIso = date ? new Date(date).toISOString() : null;

        for (const [key, value] of Object.entries({ jobId, dateIso, text, amount })) {
            if (!value || value.toString().trim() === "") {
                setError(`Field (${key}) needs to be filled`)
                return;
            }
        }

        try {
            // console.log(modelId)
            // console.log(JSON.stringify(newModel, null, 2));
            if (amount <= 0) {
                setError("Amount must be bigger than 0");
                return;
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'bearer ' + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({ modelId, jobId, dateIso, text, amount })
            });

            if (response.ok) {
                const createExpense = await response.json();
                alert("New expense added!");
                addExpense(createExpense);
                console.log(createExpense)
                onClose();
            }
            else {
                const errorData = await response.json;
                setError(errorData.message || "Failed to create expense");
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
                <h3>Add expense to job</h3>
                <form action="" className="createForm">
                    <input type="text" name="" id="" className="formInput" placeholder="Job ID" onChange={(e) => setJobId(e.target.value)} />
                    <input type="date" name="" id="" className="formInput" placeholder="Date" onChange={(e) => setDate(e.target.value)} />
                    <input type="text" name="" id="" className="formInput" placeholder="Text" onChange={(e) => setText(e.target.value)} />
                    <input type="int" name="" id="" className="formInput" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
                    <div className="createBtns">
                        <input type="button" value="Add expense to job" onClick={handleSubmit} />
                        <input type="button" value="Close" onClick={onClose} />
                    </div>
                </form>
                <p>{error}</p>
            </section>
        </>
    )
}

/*
    "firstName": "string",
    "lastName": "string",
    "email": "user@example.com",
    "phoneNo": "string",
    "addressLine1": "string",
    "addressLine2": "string",
    "zip": "string",
    "city": "string",
    "country": "string",
    "birthDate": "2025-05-08T08:30:26.565Z",
    "nationality": "string",
    "height": "string",
    "shoeSize": "string",
    "hairColor": "string",
    "eyeColor": "string",
    "comments": "string",
    "password": "string"
*/