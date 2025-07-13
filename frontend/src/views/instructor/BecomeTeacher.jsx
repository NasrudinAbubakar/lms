import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../utils/useAxios";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";

function BecomeTeacher() {
    const [form, setForm] = useState({
        image: "",
        full_name: "",
        bio: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        about: "",
        country: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm({ ...form, image: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        try {
            await useAxios.post("/become-teacher/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/instructor/dashboard/");
        } catch (err) {
            setError(
                err.response?.data?.detail ||
                err.response?.data?.non_field_errors?.[0] ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <BaseHeader />
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow p-4">
                            <h2 className="mb-4 text-center">Become a Teacher</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <div className="mb-3">
                                    <label className="form-label">Profile Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        className="form-control"
                                        value={form.full_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Bio</label>
                                    <input
                                        type="text"
                                        name="bio"
                                        className="form-control"
                                        value={form.bio}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">About</label>
                                    <textarea
                                        name="about"
                                        className="form-control"
                                        value={form.about}
                                        onChange={handleChange}
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        className="form-control"
                                        value={form.country}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Facebook</label>
                                    <input
                                        type="url"
                                        name="facebook"
                                        className="form-control"
                                        value={form.facebook}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Twitter</label>
                                    <input
                                        type="url"
                                        name="twitter"
                                        className="form-control"
                                        value={form.twitter}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">LinkedIn</label>
                                    <input
                                        type="url"
                                        name="linkedin"
                                        className="form-control"
                                        value={form.linkedin}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting..." : "Become a Teacher"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <BaseFooter />
        </>
    );
}

export default BecomeTeacher;