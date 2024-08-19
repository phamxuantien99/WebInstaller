import { useContext } from "react";
import AuthContext, { AuthContextType } from "../../../context/AuthProvider";

const dataSelectOption = [
  // "gen-installation",
  "gen-analysis-project-detail-report",
  "gen-analysis-project-overall-report",
  "gen-analysis-shutter-overall-report",
  "gen-analysis-user-report",
];

const SelectLayout = () => {
  const { setSelectedAnalysis, selectedAnalysis, setDataAnalysis } = useContext(
    AuthContext
  ) as AuthContextType;

  const handleSelectChange = (event: any) => {
    setSelectedAnalysis(event.target.value);
    setDataAnalysis({});
  };

  return (
    <select
      name="selectedGenerate"
      value={selectedAnalysis}
      required
      onChange={(event) => handleSelectChange(event)}
      className="select select-bordered w-full max-w-xs"
    >
      <option value="gen-installation">gen-installation</option>
      {dataSelectOption?.map((item, index) => (
        <option value={`${item}`} key={index}>{`${item}`}</option>
      ))}
    </select>
  );
};

export default SelectLayout;
