import { useState } from 'react'

export default function ManagerModal({ onClose }) {

    const { firstName, setFirstName } = useState("");
    const { lastName, setLastName } = useState("");
    const { email, setEmail } = useState("");
    const { password, setPassword } = useState("");
    const { error, setError } = useState("");



    return (
        <>
            <div className="dark"></div>
            <section className="createModal">
                <h3>Create Manager</h3>
                <form action="" className="createForm">
                    <input type="text" name="" id="" className="formInput" placeholder="Firstname" />
                    <input type="text" name="" id="" className="formInput" placeholder="Lastname" />
                    <input type="text" name="" id="" className="formInput" placeholder="Email" />
                    <input type="password" name="" id="" className="formInput" placeholder="Password" />
                    <div className="createBtns">
                        <input type="button" value="Create Manager" />
                        <input type="button" value="Close" onClick={onClose} />
                    </div>
                </form>
            </section>
        </>
    )
}