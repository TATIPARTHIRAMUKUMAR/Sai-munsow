// import React, { useEffect, useState } from "react";
// import { ResponsiveHeatMap } from "@nivo/heatmap";
// import _mockChartData from "./EmotionSensing/_mockChartData.json";
// import FilterCommon from "../../../Components/FilterCommon";
// import { useDispatch, useSelector } from "react-redux";
// import { branchesList } from "./mockbranchesdata";
// import PopUpFilter from "../../../Components/PopUpFilter";
// import GLOBAL_CONSTANTS from "../../../../GlobalConstants.js";
// import format from 'date-fns/format';
// import {
//   loadKSAnalysis,
//   loadBrachList,
//   getCourseList,
//   getDepartmentList,
//   loadCourseList,
//   loadDepartmentList,
//   loadUsersList
// } from "../../../redux/action";
// import DateRangePicker from "../../../Components/DateRange.jsx";

// const KSAnalysis = () => {
//   window.onbeforeunload = () => {
//     localStorage.setItem("branch", "All Branches");
//     localStorage.setItem("course", "All Courses");
//     localStorage.setItem("department", "All Departments");
//     localStorage.setItem("user", "All Users");

//   }
//   const hardSkills = [
//     {
//       id: "Programming Language (Python)",
//       data: [
//         { x: "Finance", y: 50 },
//         { x: "Marketing", y: 48 },
//         { x: "Operations", y: 31 },
//         { x: "HR", y: 20 },
//       ],
//     },
//     {
//       id: "Data Analysis",
//       data: [
//         { x: "Finance", y: 64 },
//         { x: "Marketing", y: 10 },
//         { x: "Operations", y: 2 },
//         { x: "HR", y: 11 },
//       ],
//     },
//     {
//       id: "Data Science ",
//       data: [
//         { x: "Finance", y: 56 },
//         { x: "Marketing", y: 97 },
//         { x: "Operations", y: 36 },
//         { x: "HR", y: 30 },
//       ],
//     },
//     {
//       id: "DevOps (Docker)",
//       data: [
//         { x: "Finance", y: 71 },
//         { x: "Marketing", y: 90 },
//         { x: "Operations", y: 14 },
//         { x: "HR", y: 13 },
//       ],
//     },
//   ];

//   const softSkills = [
//     {
//       id: "Communication",
//       data: [
//         { x: "Finance", y: 50 },
//         { x: "Marketing", y: 48 },
//         { x: "Operations", y: 31 },
//         { x: "HR", y: 20 },
//       ],
//     },
//     {
//       id: "Adaptability",
//       data: [
//         { x: "Finance", y: 49 },
//         { x: "Marketing", y: 84 },
//         { x: "Operations", y: 73 },
//         { x: "HR", y: 93 },
//       ],
//     },
//     {
//       id: "Creativity",
//       data: [
//         { x: "Finance", y: 56 },
//         { x: "Marketing", y: 37 },
//         { x: "Operations", y: 36 },
//         { x: "HR", y: 30 },
//       ],
//     },
//     {
//       id: "Empathy",
//       data: [
//         { x: "Finance", y: 73 },
//         { x: "Marketing", y: 90 },
//         { x: "Operations", y: 12 },
//         { x: "HR", y: 13 },
//       ],
//     },
//   ];
//   const [hardSkillData, setHardSkillsData] = useState([]);
//   const [softSkillData, setSoftSkillsData] = useState([]);
//   const [branchesData, setBranchesData] = useState(branchesList);
//   const [active, setActive] = React.useState("All Branches");
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const dispatch = useDispatch();

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");


//   const { departmentList, ksAnalysis, ksFilters, courseList, branchList, userListByDepartment } = useSelector((state) => state?.data);
//   const open = Boolean(anchorEl);
//   useEffect(() => {
//     dispatch(getDepartmentList());
//     dispatch(getCourseList());
//     //dispatch get branches Api
//     dispatch(loadKSAnalysis());
//     dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
//   }, [dispatch]);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   useEffect(() => {
//     setHardSkillsData(ksAnalysis?.graph_1?.data)
//     setSoftSkillsData(ksAnalysis?.graph_2?.date)
//     console.log("ksAnalysis", hardSkillData, softSkillData)
//     if (ksFilters?.branch != undefined && ksFilters?.branch != null) {
//       localStorage.setItem("branch", ksFilters?.branch);
//       localStorage.setItem("course", ksFilters?.course);
//       localStorage.setItem("department", ksFilters?.department);
//       localStorage.setItem("user", ksFilters?.user_name);


//       setEndDate(ksFilters?.end_date)
//       setStartDate(ksFilters?.start_date)

//       dispatch(loadCourseList(`branch_id=${ksFilters?.branch_id}`));
//       dispatch(loadDepartmentList(`course_id=${ksFilters?.course_id}`));
//       dispatch(loadUsersList(`department_id=${ksFilters?.department_id}`));


//     }

//   }, [ksAnalysis])

//   const handleMenuItemClick = (value) => {
//     if (value == "All Branches") {
//       dispatch(loadKSAnalysis());
//       setHardSkillsData(hardSkills);
//       setSoftSkillsData(softSkills);
//     } else {
//       // use api to filter the data using id
//       const filteredHardSkillData = hardSkills.map((data) => {
//         return {
//           ...data,
//           data: data.data.map((item) => {
//             return {
//               ...item,
//               y: Math.floor(Math.random() * 100),
//             };
//           }),
//         };
//       });
//       const filteredSoftSkillData = softSkills.map((data) => {
//         return {
//           ...data,
//           data: data.data.map((item) => {
//             return {
//               ...item,
//               y: Math.floor(Math.random() * 100),
//             };
//           }),
//         };
//       });

//       setHardSkillsData(filteredHardSkillData);
//       setSoftSkillsData(filteredSoftSkillData);
//     }
//     setActive(value);
//     handleClose();
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const onDateSelect = (value) => {
//     console.log("api calls",value)
//     const formattedStartDate = format(value.startDate, 'yyyy-MM-dd');
//     const formattedEndDate = format(value.endDate, 'yyyy-MM-dd');
//     let params = {
//       branch: localStorage.getItem("branch"),
//       course: localStorage.getItem("course"),
//       department: localStorage.getItem("department"),
//       student_id: localStorage.getItem("user_id"),
//       start_date: formattedStartDate,
//       end_date: formattedEndDate
//     };
//     if (startDate && endDate) {


//       // route == "AdminDashboard" ? dispatch(loadInstitutionStats(params)) : (route == "BehaviourAnanlysis" ? dispatch(loadBehaviourAnalysis(params)) :
//       dispatch(loadKSAnalysis(params))
//       // (route == "PracticalThinking" ? "" : (route == "EmotionSensing" ? dispatch(loadEmotionStats(params)) : ""))));
//     }
//   }

//   return (
//     <div className="flex-grow p-5">
//       <div className="container mx-auto">
//         <div className="flex flex-wrap">
//           <div className="w-full">
//             <div className="bg-white mb-3 p-5 rounded-xl">
//               <div
//                 className="bg-white mb-10"
//                 style={{ display: "flex", justifyContent: "space-between" }}
//               >
//                 {/* <span className="text-2xl font-normal text-gray-900">
//                   Knowledge and Skill Analysis
//                 </span> */}
//                 <div>
//                   <div className="flex justify-end mr-10 mb-3">
//                     <div className="">
//                       <PopUpFilter route="KSAnalysis" list="Branches" dependencyList={branchList} startDate={startDate} endDate={endDate}/>
//                     </div>
//                     <div className="">
//                       <PopUpFilter route="KSAnalysis" list="Courses" dependencyList={courseList} startDate={startDate} endDate={endDate}/>
//                     </div>
//                     {/* <div className="">
//                       <PopUpFilter route="KSAnalysis" list="Departments" dependencyList={departmentList} startDate={startDate} endDate={endDate} />
//                     </div>
//                     <div className="">
//                       <PopUpFilter route="KSAnalysis" list="user" dependencyList={userListByDepartment} startDate={startDate} endDate={endDate} />
//                     </div> */}
//                     {/* {startDate != "" && (
//                       <div className="">
//                         <DateRangePicker startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} onDateSelect={onDateSelect} />
//                       </div>)} */}
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-5 pt-3" style={{ height: 500 }}>
//                 <span className="text-2xl font-normal text-gray-900">
//                   Hard skills
//                 </span>
//                 {hardSkillData?.length > 0 && (
//                   <ResponsiveHeatMap
//                     data={hardSkillData}
//                     margin={{ top: 70, right: 90, bottom: 60, left: 90 }}
//                     valueFormat=">-.2s"
//                     axisTop={{
//                       tickSize: 5,
//                       tickPadding: 5,
//                       tickRotation: -90,
//                       legend: "",
//                       legendOffset: 46,
//                     }}
//                     axisLeft={{
//                       tickSize: 5,
//                       tickPadding: 5,
//                       tickRotation: 0,
//                       // legend: "Hard Skills",
//                       legendPosition: "middle",
//                       legendOffset: -80,
//                     }}
//                     colors={{
//                       type: "sequential",
//                       scheme: "purples",
//                       minValue: 0,
//                       maxValue: 100,
//                     }}
//                     emptyColor="#555555"
//                     legends={[
//                       {
//                         anchor: "bottom",
//                         translateX: 0,
//                         translateY: 30,
//                         length: 400,
//                         thickness: 8,
//                         direction: "row",
//                         tickPosition: "after",
//                         tickSize: 3,
//                         tickSpacing: 4,
//                         tickOverlap: false,
//                         tickFormat: ">-.2s",
//                         title: "Value →",
//                         titleAlign: "start",
//                         titleOffset: 4,
//                       },
//                     ]}
//                   />
//                 )}
//               </div>
//               <div className="mt-5 pt-3" style={{ height: 500 }}>
//                 <span className="text-2xl font-normal text-gray-900">
//                   Soft skills
//                 </span>
//                 {softSkillData?.length > 0 && (
//                   <ResponsiveHeatMap
//                     data={softSkillData}
//                     margin={{ top: 90, right: 90, bottom: 60, left: 90 }}
//                     valueFormat=">-.2s"
//                     axisTop={{
//                       tickSize: 5,
//                       tickPadding: 5,
//                       tickRotation: -90,
//                       legend: "",
//                       legendOffset: 50,
//                     }}
//                     axisLeft={{
//                       tickSize: 5,
//                       tickPadding: 5,
//                       tickRotation: 0,
//                       // legend: "Soft Skills",
//                       legendPosition: "middle",
//                       legendOffset: -85,
//                     }}
//                     colors={{
//                       type: "sequential",
//                       scheme: "greens",
//                       minValue: 0,
//                       maxValue: 100,
//                     }}
//                     emptyColor="#555555"
//                     legends={[
//                       {
//                         anchor: "bottom",
//                         translateX: 0,
//                         translateY: 30,
//                         length: 400,
//                         thickness: 8,
//                         direction: "row",
//                         tickPosition: "after",
//                         tickSize: 3,
//                         tickSpacing: 4,
//                         tickOverlap: false,
//                         tickFormat: ">-.2s",
//                         title: "Value →",
//                         titleAlign: "start",
//                         titleOffset: 4,
//                       },
//                     ]}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KSAnalysis;


import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCourseList, getDepartmentList, loadKSAnalysis, loadBrachList } from "../../../redux/action";
import PopUpFilter from "../../../Components/PopUpFilter";
import GLOBAL_CONSTANTS from "../../../../GlobalConstants.js";

const transformData = (data) => {
  const departments = [...new Set(data?.flatMap(skill => skill.data.map(entry => entry.x)))];
  const skills = data?.map(skill => skill.id);

  const departmentDataMap = departments.reduce((acc, department) => {
    acc[department] = data.reduce((deptAcc, skill) => {
      const value = skill.data.find(item => item.x === department)?.y;
      deptAcc[skill.id] = value;
      return deptAcc;
    }, {});
    return acc;
  }, {});

  return { departments, skills, departmentDataMap };
};

const getColorCode = (value) => {
  if (value > 75) return "bg-green-500";
  if (value > 50) return "bg-yellow-300";
  if (value > 25) return "bg-orange-300";
  return "bg-red-300";
};

const renderTable = (data, title) => {
  const { departments, skills, departmentDataMap } = transformData(data);

  return (
    <div className="mt-5 pt-3">
      <span className="text-2xl font-normal text-gray-900">{title}</span>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }} className="mt-5 max-w-full overflow-x-auto">
        <Table className="min-w-full" stickyHeader aria-label="sticky table">
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell className="sticky left-0 bg-gray-200">Department</TableCell>
              {skills?.map(skill => (
                <TableCell key={skill} className="border-r">{skill}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map(department => (
              <TableRow key={department}>
                <TableCell className="sticky left-0 bg-white">{department}</TableCell>
                {skills.map(skill => {
                  const value = departmentDataMap[department][skill];
                  const colorClass = typeof value === "number" ? getColorCode(value) : "bg-gray-100";
                  return (
                    <TableCell key={skill} className={`border-r ${colorClass}`}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const KSAnalysis = () => {
  const [hardSkillData, setHardSkillsData] = useState([]);
  const [softSkillData, setSoftSkillsData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();

  const { ksAnalysis, ksFilters, courseList, branchList } = useSelector((state) => state?.data);

  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getCourseList());
    dispatch(loadKSAnalysis());
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
  }, [dispatch]);

  useEffect(() => {
    setHardSkillsData(ksAnalysis?.graph_1?.data);
    setSoftSkillsData(ksAnalysis?.graph_2?.date);
    if (ksFilters) {
      setEndDate(ksFilters?.end_date || "");
      setStartDate(ksFilters?.start_date || "");
    }
  }, [ksAnalysis, ksFilters]);

  return (
    <div className="flex-grow p-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="bg-white mb-3 p-5 rounded-xl">
              <div className="bg-white mb-10 flex justify-between">
                <div>
                  <div className="flex justify-end mr-10 mb-3">
                    <PopUpFilter route="KSAnalysis" list="Branches" dependencyList={branchList} startDate={startDate} endDate={endDate} />
                    <PopUpFilter route="KSAnalysis" list="Courses" dependencyList={courseList} startDate={startDate} endDate={endDate} />
                  </div>
                </div>
              </div>
              {renderTable(hardSkillData, "Hard Skills")}
              {renderTable(softSkillData, "Soft Skills")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KSAnalysis;

