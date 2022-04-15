import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


const Login = (props) => {
    const [credentials, setCredentials] = useState({ name:"",email: "",contact_no:"", password: "",confirm_Password:"" })
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name :credentials.name, email: credentials.email,contact_no:credentials.contact_no, password: credentials.password ,confirm_Password:credentials.confirm_Password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/");

        }
        else {
            alert("Invalid credentials");
        }
    }

    const onChange = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="name" className="form-control" value={credentials.name} onChange={onChange} name="name" id="Name" />
                </div>


                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="contact_no" className="form-label">contact_no</label>
                    <input type="contact_no" className="form-control" value={credentials.contact_no} onChange={onChange} name="contact_no" id="contact_no" />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirm_Password" className="form-label">confirm_Password</label>
                    <input type="confirm_Password" className="form-control" 
                    value={credentials.confirm_Password} onChange={onChange} name="confirm_Password" id="confirm_Password" />
                </div>
                {/* <div class="col-md-4">
                    <label htmlFor="inputState" className="form-label">gender</label>
                    <select id="inputState" className="form-select">
                        <option selected>Choose...</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div> */}

                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}

export default Login