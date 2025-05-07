import { useState } from "react"

export default function Models() {
    const [models, setModels] = useState([]);
    const [error, setError] = useState("");
    
    const fetchModels = async () => {
        const url = "http://localhost:8080/api/models";
        const token = localStorage.getItem("token");
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

            if(!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to fetch models");
            }

            const data = await response.json();
            setModels(data);
        }
        catch(error) {
            setError("Something went wrong: " + error.message);
        }
    };

    const createModel = async () => {
        
    };
    
    /*var url = "https://yourUrl";
fetch(url, {
method: 'POST', // Or PUT
body: JSON.stringify(this.form), // assumes your data is in a // form object on your instance.
credentials: 'include',
headers: {
'Authorization': 'Bearer ' + localStorage.getItem("token"),
'Content-Type': 'application/json'
}
}).then(responseJson => {
this.response = responseJson;
})
.catch(error => alert('Something bad happened: ' + error)); */

    return (
        <section>
            <h2>Models-page</h2>

            <button onClick={fetchModels}>Fetch models</button>
            
            {error && <p className="error">{error}</p>}

            <ul>
                {models.map((model, index) => (
                    <li key={index}>{JSON.stringify(model)}</li>
                ))}
            </ul>
        </section>
    );
}