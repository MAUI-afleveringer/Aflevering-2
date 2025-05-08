import { useState } from "react"

export default function Models() {
    const [models, setModels] = useState([]);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    if (token) {
            const decoded = jwtDecode(token);
            console.log(decoded);
            console.log(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] === "Manager");
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

    const createModel = async () => {
        const url = "http://localhost:8080/api/models"
        console.log(decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])

        if (role !== "Manager"){
            alert("You do not have permission to do this. Reason: User not manager");
            return;
        }

        try{
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(this.form),
                credentials: "include",
                "Authorization": "Bearer " + token,
                "Content-type": "application/json"
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || "Failed to create model");
            }
        }
        catch (error){
            setError("Something went wrong " + error.message);
        }
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