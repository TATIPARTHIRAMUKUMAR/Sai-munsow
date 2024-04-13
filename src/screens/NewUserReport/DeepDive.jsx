
import { AiOutlineLike } from "react-icons/ai";
import { FaRegThumbsDown } from "react-icons/fa";


const DeepDive = (props) => {

  const { head, ques, queScore, candidateAns, sampleAns, gotRight, gotWrong, feedback } = props;

  const feedbackData = feedback;

  // Parse the feedbackData string into an object
  const feedbackObject = JSON.parse(feedbackData);

  const getScoreColor = (x) => {
    if (x >= 0 && x <= 4) {
      return 'text-red'; // Apply red color
    } else if (x >= 5 && x <= 7) {
      return 'text-orange'; // Apply yellow color
    } else if (x >= 8 && x <= 10) {
      return 'text-green'; // Apply green color
    } else {
      return 'text-gray'; // Default color or handle other cases
    }
};

  const getBackgroundColor = (head) => {
    const firstWord = head.split(' ')[0];
  
    if (firstWord === 'Behavioural') {
      return 'bg-purple'; // Apply purple color
    } else if (firstWord === 'Practical') {
      return 'bg-orange'; // Apply orange color
    } else if (head.startsWith('Domain Knowledge')) {
      return 'bg-green'; // Apply green color
    } else {
      return 'bg-gray'; // Default color or handle other cases
    }
  };

  const bgColor = getBackgroundColor(head);

  return (

    <>
    <div className="mx-3 my-3 md:mx-6 md:my-6">
      <div className={`flex justify-around max-[425px]:items-start items-center pb-4 lg:pb-8 mb-8 ${bgColor}`}>
        <h1 className={`mx-2 max-[375px]:text-xl text-2xl lg:text-4xl font-semibold text-purple`}>{head} Deep Dive</h1>
        <div className="mx-4 text-center bg-white p-2 lg:p-6 rounded-b-3xl">
            <h1 className={`max-[375px]:text-2xl text-3xl lg:text-4xl font-bold ${getScoreColor(queScore)}`}>{queScore ? `${queScore}/10`:("N/A")}</h1>
            <p className="max-[375px]:text-lg text-xl font-semibold text-purple">Overall Score</p>
        </div>
      </div>
      <div className={`mb-8 ${bgColor}`}>
        <h1 className="text-lg lg:text-xl font-semibold text-purple p-5">{ques}</h1>
      </div>
      <div className="p-4 grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        
        {candidateAns && (
          <div className="">
            <h3 className="text-lg font-semibold italic text-purple mb-4">Candidate's Answer:</h3>
            <p className="text-purple">{candidateAns}</p>
          </div>
        )}
        
        {sampleAns && (
          <div className="">
            <h3 className="text-lg font-semibold italic text-purple mb-4">Sample Answer for reference</h3>
            <p className="text-purple">{sampleAns}</p>
          </div>
        )}

      </div>

      { gotRight && gotWrong && (
        <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold italic text-purple">Insights</h3>
        </div>
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          { gotRight && (
            <div className="">
              <h3 className="text-sm font-semibold italic text-darkgreen bg-lightgreen p-3 rounded-2xl inline-flex mb-4"><AiOutlineLike color="green" className="m-0.5" />What you got right</h3>
              <p className="bg-lightgreen text-purple rounded-3xl p-4">{gotRight}</p>
            </div>
          )}
          {gotWrong &&(
            <div className="">
              <h3 className="text-sm font-semibold italic text-darkred bg-lightred p-3 rounded-2xl inline-flex mb-4"><FaRegThumbsDown color="brown" className="m-1" />What you got wrong</h3>
              <p className="bg-lightred text-purple rounded-3xl p-4">{gotWrong}</p>
            </div>
          )}
        
        </div>
      </div>
      )}

      {feedback && (
        <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold italic text-purple">Feedback for the Candidate:</h3>
        </div>
        <ol className="pl-4 text-purple">
          {Object.keys(feedbackObject).map((key) => (
            <li className="mb-1" key={key}>
              {key.includes('.') ? key.split('.')[1] : key}.{feedbackObject[key]}
            </li>
          ))}
        </ol>
        </div>
      )}
      


    </div>
    </>
  );
};

export default DeepDive;