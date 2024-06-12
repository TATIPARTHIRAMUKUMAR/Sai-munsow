import React, { useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, StepConnector, Button, Divider, stepConnectorClasses, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { assign_users, course_content, create_course, loadStudentList, track_course } from '../../redux/action';
import AssignUsers from './AssignUsers';
import TopicandSubtopic from './Topic/TopicandSubtopic';
import GLOBAL_CONSTANTS from '../../../GlobalConstants';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 17,
        left: 'calc(-50% + 1.5rem)',
        right: 'calc(50% + 1.5rem)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#886CC0',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#886CC0',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const CustomStepperComponent = ({ Edit }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const { course, step } = location.state || {};
    const [currentStep, setCurrentStep] = useState(step || 0);
    const [courseDetails, setCourseDetails] = useState(course || { name: '', description: '', image: '' });
    const [selectedRows, setSelectedRows] = useState([]);
    const [courseData, setCoursedata] = useState(course || {});
    const [topics, setTopics] = useState(course?.topics || []);

    const steps = ['Course Details', 'Assign Users', 'Create Course Content'];

    const [params, setParams] = useState({
        limit: 100,
        mode: "Student",
        branch_name: GLOBAL_CONSTANTS?.user_cred?.branch_name
    });

    useEffect(() => {
        dispatch(loadStudentList(params));
    }, [dispatch, params]);

    useEffect(() => {
        if (id && step === 2) {
            console.log("Making API call:", id);
            dispatch(track_course(id, (resp) => {
                if (resp?.data) {
                    setCoursedata(resp.data);
                    setTopics(resp.data.topics);
                    // console.log(resp?.data,"dataa")
                }
            }));
        }
    }, [id, step, dispatch]);

    const handleNext = () => {
        if (currentStep === 0) {
            dispatch(create_course(courseDetails, (resp) => {
                setCoursedata(resp?.data);
                setCurrentStep(prevStep => prevStep + 1);
            }));
        } else if (currentStep === 1) {
            const payload = {
                "course_id": courseData?.course_id,
                "user_ids": selectedRows
            };
            dispatch(assign_users(payload, (resp) => {
                setCurrentStep(prevStep => prevStep + 1);
            }));
        } else if (currentStep === 2) {
            const payload = {
                "course_id": courseData?.course_id,
                "content": topics
            };
            dispatch(course_content(payload, (resp) => {
                navigate("/courseList");
            }));
        }
    };

    const handleChange = (event) => {
        setCourseDetails({ ...courseDetails, [event.target.name]: event.target.value });
    };

    const onBack = () => {
        navigate("/courseList");
    };

    //for add image functionality. work and handle after backend is build.
    // const [file, setFile] = useState();
    // function handleImageChange(e) {
    //     setFile(URL.createObjectURL(e.target.files[0]));
    // }

    return (
        <div className="p-5">
            <div className="w-full mx-auto bg-white rounded-xl">
                <div className='flex justify-between w-full items-center'>
                    <div className='w-2/5'>
                        <div className='flex'>
                            <Button
                                startIcon={<ArrowBackIcon />}
                                onClick={onBack}
                                variant="contained"
                                style={{
                                    marginLeft: '1rem',
                                    marginTop: '1rem',
                                    marginBottom: '1rem',
                                    backgroundColor: '#886CC0', 
                                    color: 'white',
                                    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    fontWeight: 'bold',
                                }}
                            >
                                Course List
                            </Button>
                        </div>
                    </div>
                    <div className='w-4/5'>
                        <Stepper activeStep={currentStep} alternativeLabel style={{ marginTop: "2rem" }}>
                            {steps.map((label, index) => (
                                <Step key={label}>
                                    <StepLabel
                                        style={{
                                            color: index <= currentStep ? '#886CC0' : 'inherit',
                                            fontSize: "2.5rem"
                                        }}
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </div>
                </div>

                <Divider style={{ marginTop: "1rem" }} />

                <div className="flex mt-4 p-4 items-center justify-center">
                    {currentStep === 0 && (
                        <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
                            <h2 className="text-2xl font-bold mb-6">Course Details</h2>
                            <TextField
                                label="Course Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                name="name"
                                value={courseDetails.name}
                                onChange={handleChange}
                                className="mb-4"
                            />
                            <label className="block text-sm font-medium text-gray-700 py-3">
                                Course Description
                            </label>
                            <textarea
                                className="w-full p-4 border rounded-md mb-4 resize-none"
                                rows={6}
                                name="description"
                                value={courseDetails.description}
                                onChange={handleChange}
                            />
                            {/* <h2 className='mb-3'>Add Image:</h2>
                            <input className='mb-5' type='file' name='image' onChange={handleImageChange} />
                            <img src={file} style={{ height: "200px" }} alt='preview' /> */}
                        </div>
                    )}
                    {currentStep === 1 && (
                        <AssignUsers selectedRows={selectedRows} setSelectedRows={setSelectedRows} courseData={courseData} setCoursedata={setCoursedata} />
                    )}
                    {currentStep === 2 && (
                        <TopicandSubtopic topics={topics} setTopics={setTopics} />
                    )}
                </div>

                <div className="mt-4 p-6 flex justify-end">
                    {currentStep < steps.length - 1 && (
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#886CC0" }}
                            onClick={handleNext}
                            className="next-button bg-[#886CC0]"
                        >
                            Next
                        </Button>
                    )}

                    {currentStep === steps.length - 1 && (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleNext}
                            className="submit-button"
                        >
                            Submit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomStepperComponent;
