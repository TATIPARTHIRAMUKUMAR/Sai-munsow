import React, { useEffect, useState, useRef } from 'react';
import TopicAccordion from './TopicAccordion';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadDetailedCourse } from '../../../redux/action';
import CourseOverview from '../CourseOverview';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

const StudentCourseView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { detailedCourse } = useSelector((state) => state?.data);
    const [selectedSubtopic, setSelectedSubtopic] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [spokenContent, setSpokenContent] = useState('');

    // Maintain a reference to the latest utterance
    const latestUtteranceRef = useRef(null);

    useEffect(() => {
        dispatch(loadDetailedCourse(id));
    }, [dispatch, id]);

    const handleSelectSubtopic = (subtopic) => {
        setSelectedSubtopic(subtopic);
    };

    useEffect(() => {
        const firstUncompletedSubtopic = detailedCourse?.content_data?.flatMap(topic => topic?.subtopics).find(subtopic => !subtopic?.completed);
        setSelectedSubtopic(firstUncompletedSubtopic);
        handleSpeak(firstUncompletedSubtopic?.content);
    }, [detailedCourse]);

    useEffect(() => {
        handleSpeak(selectedSubtopic?.content);
    }, [selectedSubtopic]);

    useEffect(() => {
        return () => {
            handleStop();
        };
    }, []);

    useEffect(() => {
        const unlisten = () => {
            handleStop();
        };

        return unlisten;
    }, [navigate]);

    const handleSpeak = (text) => {
        const description = text || selectedSubtopic?.content;
        if (description) {
            if (latestUtteranceRef.current) {
                window.speechSynthesis.cancel();
            }

            const sanitizedDescription = description.replace(/<[^>]*>/g, '');
            const utterance = new SpeechSynthesisUtterance(sanitizedDescription);
            utterance.rate = 0.75;
            utterance.voice = window.speechSynthesis.getVoices().find(voice => voice.gender === 'female');

            utterance.onboundary = (event) => {
                const highlightedText = `${sanitizedDescription.slice(0, event.charIndex)}<span style="background-color: #886cc0;padding:5px;border-radius:5px;color:white">${sanitizedDescription.slice(event.charIndex, event.charIndex + event.charLength)}</span>${sanitizedDescription.slice(event.charIndex + event.charLength)}`;
                setSpokenContent(highlightedText);
            };

            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);

            latestUtteranceRef.current = utterance;
        }
    };

    const handleStop = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setSpokenContent('');
        latestUtteranceRef.current = null;
    };

    return (
        <div className="p-4">
            <CourseOverview course={detailedCourse} show={true} text={"Back"} />

            <div className="flex w-full">
                <div className="w-4/6 p-4 overflow-y-auto rounded-lg  mr-4">
                    {selectedSubtopic && (
                        <div dangerouslySetInnerHTML={{ __html: spokenContent || selectedSubtopic.content }} />
                    )}
                </div>

                <div className="w-2/6">
                    <div className="flex items-center justify-end mb-4">
                        {!isSpeaking ? (
                            <VolumeOffIcon
                                style={{ cursor: 'pointer', fontSize: '3rem', color: "#886cc0" }}
                                onClick={() => handleSpeak(selectedSubtopic?.content)}
                            />
                        ) : (
                            <VolumeUpIcon
                                style={{ cursor: 'pointer', fontSize: '3rem', color: "#886cc0" }}
                                onClick={handleStop}
                            />
                        )}
                    </div>

                    {detailedCourse?.content_data?.map((topic) => {
                        const isDefaultOpen = topic?.subtopics?.some(sub => sub === selectedSubtopic && !sub?.completed);
                        return (
                            <TopicAccordion
                                course_id={detailedCourse?.id}
                                key={topic.id}
                                topic={topic}
                                onSelectSubtopic={setSelectedSubtopic}
                                selectedSubtopic={selectedSubtopic}
                                defaultOpen={isDefaultOpen}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default StudentCourseView;
