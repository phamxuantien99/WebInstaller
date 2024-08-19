import { useContext } from "react";
import AuthContext, { AuthContextType } from "../../../../context/AuthProvider";

const ShutterOverall = () => {
  const { dataAnalysis } = useContext(AuthContext) as AuthContextType;
  return (
    <div className="flex justify-center">
      {" "}
      {dataAnalysis?.analysis_project_overall_img ? (
        <img
          src={`data:image/jpeg;base64,${dataAnalysis?.analysis_project_overall_img}`}
          alt="Loaded from API"
          className="w-[850px] h-[600px] text-center"
        />
      ) : (
        <p className="flex-1 text-center">There is no data to display</p>
      )}
    </div>
  );
};

export default ShutterOverall;
