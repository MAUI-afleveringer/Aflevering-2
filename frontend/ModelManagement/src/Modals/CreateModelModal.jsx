import { useEffect, useState } from 'react'

export default function ModelModal({ onClose, addModel }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [nationality, setNationality] = useState("");
    const [height, setHeight] = useState("");
    const [shoeSize, setShoeSize] = useState("");
    const [hairColor, setHairColor] = useState("");
    const [eyeColor, setEyeColor] = useState("");
    const [comments, setComments] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const url = "http://localhost:8080/api/Models"
        const birthDateIso = birthDate ? new Date(birthDate).toISOString() : null;
        const newModel = {
            firstName,
            lastName,
            email,
            phoneNo,
            addressLine1,
            addressLine2,
            zip,
            city,
            country,
            birthDate: birthDateIso,
            nationality,
            height,
            shoeSize,
            hairColor,
            eyeColor,
            comments,
            password
        };

        for (const [key, value] of Object.entries(newModel)) {
            if (!value || value.toString().trim() === "") {
                setError(`Field (${key}) needs to be filled`)
                return;
            }
        }

        try {
            //console.log(JSON.stringify(newModel, null, 2)); For printing what we are sending. 
            const response = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    Authorization: 'bearer ' + token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(newModel)
            });

            if (response.ok) {
                const createModel = await response.json();
                alert("New model added!");
                addModel(createModel);
                console.log(createModel)
                onClose();
            }
            else {
                const errorData = await response.json;
                setError(errorData.message || "Failed to create model");
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
                <h3>Create Model</h3>
                <form action="" className="createForm">
                    <div className="multiInputWrapper">
                        <input type="text" name="" id="" className="formInput" placeholder="Firstname" onChange={(e) => setFirstName(e.target.value)} />
                        <input type="text" name="" id="" className="formInput" placeholder="Lastname" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <input type="text" name="" id="" className="formInput" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="text" name="" id="" className="formInput" placeholder="Phone Number" onChange={(e) => setPhoneNo(e.target.value)} />
                    <input type="text" name="" id="" className="formInput" placeholder="Address Line 1" onChange={(e) => setAddressLine1(e.target.value)} />
                    <input type="text" name="" id="" className="formInput" placeholder="Address Line 2" onChange={(e) => setAddressLine2(e.target.value)} />
                    <div className="multiInputWrapper">
                        <input type="text" name="" id="" className="formInput" placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
                        <input type="text" name="" id="" className="formInput" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                        <input type="text" name="" id="" className="formInput" placeholder="Country" onChange={(e) => setCountry(e.target.value)} />
                    </div>

                    <input type="date" name="" id="" className="formInput" placeholder="Birthdate" onChange={(e) => setBirthDate(e.target.value)} />
                    <input type="text" name="" id="" className="formInput" placeholder="Nationality" onChange={(e) => setNationality(e.target.value)} />
                    <input type="text" name="" id="" className="formInput" placeholder="Height" onChange={(e) => setHeight(e.target.value)} />
                    <input type="text" name="" id="" className="formInput" placeholder="Shoe Size" onChange={(e) => setShoeSize(e.target.value)} />
                    <div className="multiInputWrapper">
                        <input type="text" name="" id="" className="formInput" placeholder="Hair Color" onChange={(e) => setHairColor(e.target.value)} />
                        <input type="text" name="" id="" className="formInput" placeholder="Eye Color" onChange={(e) => setEyeColor(e.target.value)} />
                    </div>
                    <input type="text" name="" id="" className="formInput" placeholder="Comments" onChange={(e) => setComments(e.target.value)} />
                    <input type="password" name="" id="" className="formInput" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <div className="createBtns">
                        <input type="button" value="Create Model" onClick={handleSubmit} />
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