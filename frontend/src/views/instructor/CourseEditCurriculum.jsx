import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Cookie from "js-cookie";

import Sidebar from "./Partials/Sidebar";
import Header from "./Partials/Header";
import BaseHeader from "../partials/BaseHeader";
import BaseFooter from "../partials/BaseFooter";
import { Link, useNavigate, useParams } from "react-router-dom";

import useAxios from "../../utils/useAxios";
import UserData from "../plugin/UserData";
import Swal from "sweetalert2";
import Toast from "../plugin/Toast";

function CourseEditCurriculum() {
    const [courseData, setCourseData] = useState({});
    const [imagePreview, setImagePreview] = useState("");
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const param = useParams();

    useEffect(() => {
        useAxios.get(`course/category/`).then((res) => {
            setCategory(res.data);
        });
    }, []);

    const handleImageUpload = async (event) => {
        setImagePreview(null);
        setLoading(true);

        const file = event.target.files[0];

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await useAxios.post("/file-upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response?.data?.url) {
                setImagePreview(response?.data?.url);
                console.log(response?.data?.url);
                setLoading(false);
                setCourseData({
                    ...courseData,
                    image: response?.data?.url,
                });
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            setLoading(false);
        }
    };

    const handleFileUpload = async (event) => {
        setFileLoading(true);

        const file = event.target.files[0];

        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await useAxios.post("/file-upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response?.data?.url) {
                setFileLoading(false);
                setCourseData({
                    ...courseData,
                    file: response?.data?.url,
                });
            }
        } catch (error) {
            console.error("Error uploading course intro:", error);
            setLoading(false);
        }
    };

    const handleCourseInputChange = (event) => {
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const json = {
            title: courseData?.title,
            description: courseData?.description,
            image: courseData?.image,
            file: courseData?.file,
            level: courseData?.level,
            language: courseData?.language,
            price: courseData?.price,
            category: courseData?.category,
        };

        const response = await useAxios.post(`teacher/course-create/`, json);
        console.log(response.data);
        navigate(`/instructor/edit-course/${response?.data?.course_id}/`);
        Swal.fire({
            icon: "success",
            title: "Course Created Successfully",
        });
    };

    const fetchCourseDetail = () => {
        useAxios.get(`course/category/`).then((res) => {
            setCategory(res.data);
        });

        useAxios.get(`teacher/course-detail/${param.course_id}/`).then((res) => {
            setCourseData(res.data);
            setImagePreview(res?.data?.image);
        });
    };

    useEffect(() => {
        fetchCourseDetail();
    }, []);
    console.log(courseData);

    return (
        <>
            <BaseHeader />

            <section className="pt-5 pb-5">
                <div className="container">
                    <Header />
                    <div className="row mt-0 mt-md-4">
                        <Sidebar />
                        <form className="col-lg-9 col-md-8 col-12" onSubmit={handleSubmit}>
                            <>
                                <section className="pb-8 mt-5">
                                    <div className="card mb-3">
                                        {/* Basic Info Section */}
                                        <div className="card-header border-bottom px-4 py-3">
                                            <h4 className="mb-0">Basic Information</h4>
                                        </div>
                                        <div className="card-body">
                                            <label htmlFor="courseTHumbnail" className="form-label">
                                                Thumbnail Preview
                                            </label>
                                            <img
                                                style={{
                                                    width: "100%",
                                                    height: "330px",
                                                    objectFit: "cover",
                                                    borderRadius: "10px",
                                                }}
                                                className="mb-4"
                                                src={imagePreview || "https://www.eclosio.ong/wp-content/uploads/2018/08/default.png"}
                                                alt=""
                                            />
                                            <div className="mb-3">
                                                <label htmlFor="courseTHumbnail" className="form-label">
                                                    Course Thumbnail
                                                </label>
                                                <input id="courseTHumbnail" className="form-control" type="file" name="image" onChange={handleImageUpload} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="courseTitle" className="form-label">
                                                    Intro Video
                                                </label>
                                                <input id="introvideo" className="form-control" type="file" name="file" onChange={handleFileUpload} />

                                                {courseData?.file && (
                                                    <p>
                                                        <a target="__blank" href={courseData?.file}>
                                                            Preview Video
                                                        </a>
                                                    </p>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="courseTitle" className="form-label">
                                                    Title
                                                </label>
                                                <input id="courseTitle" className="form-control" type="text" placeholder="" name="title" value={courseData?.title} onChange={handleCourseInputChange} />
                                                <small>Write a 60 character course title.</small>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Courses category</label>
                                                <select className="form-select" name="category" value={courseData?.category?.id} onChange={handleCourseInputChange}>
                                                    <option value="">-------------</option>
                                                    {category?.map((c, index) => (
                                                        <option key={index} value={c.id}>
                                                            {c.title}
                                                        </option>
                                                    ))}
                                                </select>
                                                <small>Help people find your courses by choosing categories that represent your course.</small>
                                            </div>
                                            <div className="mb-3">
                                                <select className="form-select" onChange={handleCourseInputChange} value={courseData?.level} name="level">
                                                    <option value="">Select level</option>
                                                    <option value="Beginner">Beginner</option>
                                                    <option value="Intemediate">Intemediate</option>
                                                    <option value="Advanced">Advanced</option>
                                                </select>
                                            </div>

                                            <div className="mb-3">
                                                <select className="form-select" onChange={handleCourseInputChange} value={courseData?.language} name="language">
                                                    <option value="">Select Language</option>
                                                    <option value="English">English</option>
                                                    <option value="Spanish">Spanish</option>
                                                    <option value="French">French</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Course Description</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={courseData?.description}
                                                    onReady={(editor) => {
                                                        // You can store the "editor" and use when it is needed.
                                                        console.log("Editor is ready to use!", editor);
                                                    }}
                                                    onChange={(event, editor) => {
                                                        setCourseData({
                                                            ...courseData,
                                                            description: editor.getData(),
                                                        });
                                                    }}
                                                    onBlur={(event, editor) => {
                                                        // console.log("Blur.", editor);
                                                    }}
                                                    onFocus={(event, editor) => {
                                                        // console.log("Focus.", editor);
                                                    }}
                                                    config={{
                                                        toolbar: ["bold", "italic", "link", "bulletedList", "numberedList", "blockQuote", "undo", "redo"],
                                                    }}
                                                />
                                                <small>A brief summary of your courses.</small>
                                            </div>
                                            <label htmlFor="courseTitle" className="form-label">
                                                Price
                                            </label>
                                            <input id="courseTitle" className="form-control" type="number" value={courseData?.price} onChange={handleCourseInputChange} name="price" placeholder="$20.99" />
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <Link to={`/instructor/edit-course/${param?.course_id}/curriculum/`} className="btn btn-primary">
                                            Manage Curriculum <i className="fas fa-arrow-right ms-2"></i>
                                        </Link>
                                        <button className="btn btn-lg btn-success w-100 mt-2" type="submit">
                                            Update Course <i className="fas fa-check-circle"></i>
                                        </button>
                                    </div>
                                </section>
                            </>
                        </form>
                    </div>
                </div>
            </section>

            <BaseFooter />
        </>
    );
}

export default CourseEditCurriculum;
