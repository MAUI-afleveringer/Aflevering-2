import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react";
import React from "react";

export default function Jobs() {
    const [data, setData] = useState([]);

    const token = localStorage.getItem("token");

    const fetchAllJobs = async () => {
        const url = "http://localhost:8080/api/Jobs";
        const response = await fetch(url,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        const result = await response.json();
        setData(result);

    }

    const fetchJobsByModel = async (modelId) => {
        const url = `http://localhost:8080/api/Models/${modelId}/jobs`;
        const response = await fetch(url,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Add if response succeed here
        const result = await response.json();
        setData(result);

    }

    function createNewJob(newJob) {
        setData(prevData => [prevData, newJob])
    }

    useEffect(() => {
        const decoded = jwtDecode(token);
        console.log(decoded);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

        if (role === "Manager") fetchAllJobs();

        else if (role === "Model") fetchJobsByModel(decoded["ModelId"]);
    })

    return (
        <main>

            <h1>Jobs</h1>
            {
                data ?
                    data.map(job => (
                        <React.Fragment key={job.jobId}>
                            <section className="job">
                                <p className="jobId">{job.jobId}</p>
                                <p className="jobCustomer">{job.constumer}</p>
                                <p className="jobStartDate">{job.startDate}</p>
                                <p className="jobId">{job.days}</p>
                                <p className="jobLocation">{job.location}</p>
                                <p className="jobComments">{job.comments}</p>
                            </section>
                        </React.Fragment>
                    ))
                    :
                    <p>Loading...</p>
            }
        </main>


    )
}