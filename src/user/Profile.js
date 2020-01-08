import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
// eslint-disable-next-line
import { Link, Redirect } from "react-router-dom";
import { read, update, updateUser } from "./apiUser";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: false,
        buttonText:'Request password reset link',
        success: false
    });

    const { token } = isAuthenticated();
    // eslint-disable-next-line
    const { name, email, password, error, success , buttonText} = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const changePassword = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/forgot-password`,
            data: { email }
        })
            .then(response => {
                console.log('FORGOT PASSWORD SUCCESS', response);
                toast.success(response.data.message);
                setValues({ ...values, buttonText: 'Requested' });
            })
            .catch(error => {
                console.log('FORGOT PASSWORD ERROR', error.response.data);
                toast.error(error.response.data.error);
                setValues({ ...values, buttonText: 'Request password reset link' });
            });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password }).then(
            data => {
                if (data.error) {
                    console.lgo(data.error);
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            name: data.name,
                            email: data.email,
                            success: true
                        });
                    });
                }
            }
        );
    };

    const redirectUser = success => {
        if (success) {
            return <Redirect to="/user/dashboard" />;
        }
    };

    const profileUpdate = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    type="text"
                    onChange={handleChange("name")}
                    className="form-control col-lg-3 col-md-3"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    type="email"
                    onChange={handleChange("email")}
                    className="form-control mb-4 col-lg-3 col-md-3"
                    value={email}
                />
            </div>

            <button onClick={changePassword} className="btn btn-success row ml-0 mb-4">
                {buttonText}
            </button>
            <br/>

            <button onClick={clickSubmit} className="btn btn-primary">
            Submit
            </button>
        </form>
    );

    return (
        <Layout
            title="Profile"
            description="Update your profile.  "
            className="container"
            jumbo='jumbotron'
            learnMore=''
        >
            <h2 className="mb-4">Profile update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    );
};

export default Profile;
