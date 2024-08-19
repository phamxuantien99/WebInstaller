import "react-datepicker/dist/react-datepicker.css";
import LogoutBtn from "../Logout/LogoutBtn";
import GenInstallation from "./GenInstallation/GenInstallation";
import SelectLayout from "./SelectLayout/SelectLayout";
import { useContext } from "react";
import AuthContext, { AuthContextType } from "../../context/AuthProvider";
import GenAnalysis from "./GenAnalysis/GenAnalysis";

const HomeRightComponent = () => {
  const { selectedAnalysis } = useContext(AuthContext) as AuthContextType;

  return (
    <div className="mx-[auto] w-full">
      <div className="flex mb-5 justify-between items-center">
        <SelectLayout />
        <LogoutBtn />
      </div>

      {selectedAnalysis === "gen-installation" ? (
        <GenInstallation />
      ) : (
        <GenAnalysis />
      )}
    </div>
  );
};

export default HomeRightComponent;
