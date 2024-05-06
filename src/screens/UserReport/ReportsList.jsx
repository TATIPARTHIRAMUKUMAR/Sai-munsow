import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Divider } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { loadReportsList, loadUserReport } from "../../redux/action";
import NoDataPage from "./NoData";
import { prototype } from "postcss/lib/previous-map";
import moment from "moment";
import { useDarkMode } from "../../Dark";
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { stringify } from "postcss";


const styles = {
    tooltip: {
        backgroundColor: 'white',
        color: 'white',
        fontSize: '20rem',
        // padding: '10px',
        borderRadius: '4px'
    },
    heading: {
        fontWeight: 'bold',
        marginTop: '10px',
        fontSize:"20px",
        marginBottom: '5px'
    }
};

export default function ReportIndex() {
    const dispatch = useDispatch();
    const { userReportList } = useSelector((state) => state.data);
    const [lessonsList, setLessonsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isDarkMode, colorTheme } = useDarkMode();

    const { colorTheme: reduxColorTheme } = useSelector((state) => state?.data);
    const textColor = isDarkMode
        ? reduxColorTheme.dark.background
        : reduxColorTheme.light.background;
    const backgroundColor = isDarkMode
        ? reduxColorTheme.dark.selectBackground
        : reduxColorTheme.light.selectBackground;


    useEffect(() => {
        dispatch(loadReportsList())
    }, [])

    useEffect(() => {
        setLessonsList(userReportList);
        setIsLoading(false); 
    }, [userReportList]);

    const navigate = useNavigate();


    const ReportCards = ({ id, role, level, report_ready, report_data, result_data, skill_type, skills_list, generated, company }) => {

        const viewReport = (data) => {
            // console.log("d", data)
            localStorage.setItem("reportData",JSON.stringify(data))
            //    useEffect(()=>{
            dispatch(loadUserReport(data));
            navigate("/reportView")
            //   },[])
        };

        const renderSkillsSection = (skills, title) => {
            if (!skills || skills.length === 0) {
                return null;
            }
    
            return (
                <>
                    <div style={styles.heading}>{title}</div>
                    {skills.map(skill => <div key={skill} style={{fontSize:"13px"}}>{skill}</div>)}
                </>
            );
        };
    
        const renderSkills = (skillsList) => {
            const hardSkills = Object.keys(skillsList?.hard_skill || {});
            const softSkills = Object.keys(skillsList?.soft_skill || {});
            const allSkills = hardSkills.concat(softSkills);
            const skillsString = allSkills.join(' | ');
    
            if (skillsString.length > 20) {
                return (
                    <Tooltip title={
                        <>
                            {renderSkillsSection(hardSkills, "Hard Skills")}
                            {renderSkillsSection(softSkills, "Soft Skills")}
                        </>
                    } 
                    arrow 
                    // style={{background:"black"}}
                    placement="top" 
                    PopperProps={{ style: styles.tooltip }}>
                        <span>
                            {skillsString.substring(0, 17)}...
                            <InfoIcon style={{ fontSize: "1rem", marginLeft: "4px" }} />
                        </span>
                    </Tooltip>
                );
            }
            return skillsString;
        };
    

        return (
            <div className="max-h-[320px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg">
                <div className="flex flex-col h-full p-4 bg-white">
                    <div className="flex-grow p-2 flex flex-col gap-y-2">
                        {skill_type == "role based report" ? <div className="text-xl font-semibold">Role: {role}
                        </div> : <div className="text-xl font-semibold">Skill based report
                            <div className="text-base text-[#886cc0]">
                        Skills : {renderSkills(skills_list)}
                    </div>
                        </div>}
                        {skill_type == "role based report" ? <div className="font-medium"><span className="font-bold">Company:</span> {company}</div> : <></>}
                        <div className="font-medium"><span className="font-bold">Level:</span> {level}</div>
                        <div className="font-medium"><span className="font-bold">Generated On:</span> {moment(generated)?.format('MMMM DD, YYYY HH:mm:ss')}</div>

                    </div>
                    <Divider className="my-5" />
                    <div className="py-2 w-full">
                        {report_ready === "true" ? (
                            <>
                                <Button className="font-bold w-full py-2 cursor-pointer transition-colors duration-300 hover:bg-[#886cc0] "  
                                style={{ color: textColor, background: backgroundColor, fontWeight: "600",}} 
                                endIcon={<ArrowForwardIcon />} 
                                onClick={() => { viewReport({...report_data, ...result_data}) }} > View Report</Button>
                            </>
                        ) : (
                            <div className="flex items-center justify-center text-orange-300">
                                <HttpsOutlinedIcon className="mr-2 animate-spin" />
                                Your report is being generated
                            </div>

                        )}
                    </div>
                </div>
            </div>
        );
    };


    ReportCards.propTypes = {
        id: PropTypes.number.isRequired,
        role: PropTypes.string.isRequired,
        level: PropTypes.bool.isRequired,
        report_ready: PropTypes.bool.isRequired,
        report_data: PropTypes.bool.isRequired,
        skill_type: PropTypes.string.isRequired,
        skills_list: PropTypes.string.isRequired,
        generated: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,

    }
    return (
        <>
            {lessonsList?.length == 0 ? (<>
                <NoDataPage />
            </>) : (
                <div className="w-full h-full overflow-y-auto px-4 ">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-screen">
                            <CircularProgress style={{ color: "#886cc0" }} />
                        </div>
                    ) : (
                        <div
                            className=" p-5 gap-8 pt-5"
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(min(240px, 100%), 1fr))",
                            }}
                        >
                            {lessonsList?.map((o, index) => (
                                <ReportCards id={o?.id} role={o?.specifications?.role} skill_type={o?.report_json?.report_type} report_data={o?.report_json == null ? {} : o?.report_json} result_data={o?.result_json == null ? {} : o?.result_json} report_ready={o?.report_json == null ? "false" : "true"} skills_list={o?.report_json?.hard_and_soft_skill_dic} level={o?.level} generated={o?.updated_date} key={index} company={o?.report_json?.interview_company} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );

}
