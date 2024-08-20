import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, CancelTokenSource } from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo1 from "../../../assets/images/logo1.png";
import AuthContext, { AuthContextType } from "../../context/AuthProvider";
import { api } from "../../service/api/endpoint";
import apiAxios from "../../../api/api";

type FormFields = {
  projectCode: string;
  startDate: string;
  endDate: string;
};

const HomeLeftComponent = () => {
  let cancelTokenSource: CancelTokenSource | null = null;

  const { selectedAnalysis, setDataAnalysis } = useContext(
    AuthContext
  ) as AuthContextType;
  const auth = localStorage.getItem("access_token_installation");

  const generateInvoiceFormRef = useRef(null);
  const navigation = useNavigate();

  const [listYear, setListYear] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [listProjectCode, setListProjectCode] = useState<string[]>([]);
  const [selectedProjectCode, setSelectedProjectCode] = useState<string>("");
  const [selectedUserName, setSelectedUselectedUserName] = useState<string>("");
  const [listSerialNumber, setListSerialNumber] = useState<string[]>([]);
  const [selectedSerialNumber, setSelectedSerialNumber] = useState<number[]>(
    []
  );
  const [isShowImage, setIsShowImage] = useState<boolean>(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    new Date()
  );
  const [filteredStartDate, setFilteredStartDate] = useState<string>("");

  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    new Date()
  );
  const [filteredEndDate, setFilteredEndDate] = useState<string>("");
  const [listError, setListError] = useState<FormFields>({
    projectCode: "",
    startDate: "",
    endDate: "",
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [dataDetailGenerateInvoice, setDataDetailGenerateInvoice] =
    useState<any>();
  // const [isFirstLoadToasty, setIsFirstLoadToasty] = useState<boolean>(false);
  const [filterDateStartForInvoice, setFilterDateStartForInvoice] =
    useState<string>("");
  const [filterDateEndForInvoice, setFilterDateEndForInvoice] =
    useState<string>("");
  const updateFieldError = (fieldName: string, error: string) => {
    setListError((prevErrrors) => ({
      ...prevErrrors,
      [fieldName]: error,
    }));
  };

  const validateFields = (): boolean => {
    let isValid = true; // Assume fields are valid initially

    // Validation for projectCode
    if (
      (selectedAnalysis === "gen-installation" ||
        selectedAnalysis === "gen-analysis-project-detail-report") &&
      !selectedProjectCode?.trim()
    ) {
      updateFieldError("projectCode", "Field Project code is required.");
      isValid = false;
    } else {
      updateFieldError("projectCode", "");
    }

    // Validation for startDate
    if (!filteredStartDate.trim()) {
      updateFieldError("startDate", "Field Start date is required.");
      isValid = false;
    } else {
      updateFieldError("startDate", "");
    }

    // Validation for endDate
    if (!filteredEndDate.trim()) {
      updateFieldError("endDate", "Field End date is required.");
      isValid = false;
    } else {
      updateFieldError("endDate", "");
    }

    return isValid; // Return true if no errors, false if any errors
  };

  const fetchDataLogistic = async () => {
    try {
      return await apiAxios
        .get(api.getInstallationsSerialNumber)
        .then((res) => res.data);
    } catch (error) {
      return { error: "Failed to fetch data" };
    }
  };

  const { data: dataTotalProduct } = useQuery({
    queryKey: ["dataTotalProduct"],
    queryFn: () => fetchDataLogistic(),
    enabled: !!auth,
  });

  // fetch data project code without years
  const fetchDataInstallationListOfProjectCode = async () => {
    try {
      return await apiAxios
        .get(api.getInstallationsGetListProjectCode)
        .then((res) => res.data);
    } catch (error) {
      return { error: "Failed to fetch data" };
    }
  };

  const { data: dataInstallationListOfProjectCode } = useQuery({
    queryKey: ["dataInstallationListOfProjectCode"],
    queryFn: () => fetchDataInstallationListOfProjectCode(),
    enabled: !!auth,
  });

  // fetch data user name for report

  const fetchDataInstallerUserForReport = async () => {
    try {
      return await apiAxios
        .post(api.getDataUserForReport)
        .then((res) => res.data);
    } catch (error) {
      return { error: "Failed to fetch data" };
    }
  };

  const { data: dataInstallerUserForReport } = useQuery({
    queryKey: ["dataInstallerUserForReport"],
    queryFn: () => fetchDataInstallerUserForReport(),
    enabled: !!auth,
  });

  // Set Select year
  useEffect(() => {
    if (dataTotalProduct?.founds) {
      const years = dataTotalProduct?.founds
        .map((item: any) => item["year"])
        .filter(
          (item: any, i: any, ar: string | any[]) => ar.indexOf(item) === i
        )
        .sort();

      setListYear(years);
    }
  }, [dataTotalProduct]);

  useEffect(() => {
    setSelectedYear("");
    setSelectedProjectCode("");
    setFilteredEndDate("");
    setFilteredStartDate("");
    setListError({
      projectCode: "",
      startDate: "",
      endDate: "",
    });
    setSelectedSerialNumber([]);
  }, [selectedAnalysis]);

  // Set Select project code
  useEffect(() => {
    if (dataTotalProduct?.founds && selectedYear) {
      const projects = dataTotalProduct?.founds
        .filter((item: any) => item["year"] === selectedYear)
        .map((item: string | any) =>
          item["projects"].map((a: any) => a["project_code"])
        )
        .flat();

      projects.sort((a: string, b: string) => {
        return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
      });

      setListProjectCode(projects);
    } else {
      const newData = dataInstallationListOfProjectCode?.project?.map(
        (item: any) => item["project_code"]
      );

      setListProjectCode(newData);
    }
    setSelectedProjectCode("");
    setSelectedSerialNumber([]);
  }, [selectedYear, dataInstallationListOfProjectCode]);

  // set Serial number
  useEffect(() => {
    if (dataTotalProduct?.founds && selectedYear) {
      const filteredData = dataTotalProduct?.founds
        .filter((found: any) => found.year === selectedYear)[0]
        ?.projects.filter(
          (project: any) => project.project_code === selectedProjectCode
        )
        .map((project: any) => project.serial_number)[0]; // map to serial_number
      setListSerialNumber(filteredData);
    } else {
      const listNewSerialNumber = dataInstallationListOfProjectCode?.project
        ?.filter((item: any) => item["project_code"] === selectedProjectCode)[0]
        ?.details?.map((item: any) => item["serials"])
        .flat()
        .map((item: any) => item["serial"])
        .filter((item: any, i: any, ar: any) => ar.indexOf(item) === i);

      setListSerialNumber(listNewSerialNumber);
    }
  }, [selectedProjectCode, dataInstallationListOfProjectCode]);

  // function handle get serial number
  const handleGetSerialNumber = (event: any) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSerialNumber([...selectedSerialNumber, Number(value)]);
    } else {
      setSelectedSerialNumber(
        selectedSerialNumber.filter((item) => Number(item) !== Number(value))
      );
    }
  };

  const _filterStartDate = (date: Date | null) => {
    setSelectedStartDate(date);
    setFilteredStartDate(
      date?.getFullYear() +
        "-" +
        ((date?.getMonth() as number) + 1) +
        "-" +
        date?.getDate()
    );
    setFilterDateStartForInvoice(
      date?.getDate() +
        "-" +
        ((date?.getMonth() as number) + 1) +
        "-" +
        date?.getFullYear()
    );
  };

  const _filterEndDate = (date: Date | null) => {
    setSelectedEndDate(date);
    setFilteredEndDate(
      date?.getFullYear() +
        "-" +
        ((date?.getMonth() as number) + 1) +
        "-" +
        date?.getDate()
    );
    setFilterDateEndForInvoice(
      date?.getDate() +
        "-" +
        ((date?.getMonth() as number) + 1) +
        "-" +
        date?.getFullYear()
    );
  };

  // React-toast
  const notify = () =>
    toast.error("No products found !, please select again.", {
      position: "top-left",
      className: "min-w-[400px]",
    });

  const notifyErrorSupport = () => {
    toast.error("Please contact support !", {
      position: "top-left",
      className: "min-w-[400px]",
    });
  };

  const handleUpdateInstallation = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    // Validate fields and return early if validation fails
    if (!validateFields()) {
      return;
    }

    // Cancel the previous request if it exists
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Operation canceled due to new request.");
    }

    // Create a new cancel token
    cancelTokenSource = axios.CancelToken.source();

    const payload = selectedSerialNumber;
    let apiCall;

    if (selectedAnalysis === "gen-installation") {
      apiCall = api.postInstallations(
        selectedProjectCode,
        filteredStartDate,
        filteredEndDate,
        isShowImage
      );
    } else if (selectedAnalysis === "gen-analysis-project-detail-report") {
      apiCall = api.postInstallationGenanalasysProjectDetail({
        project_code: selectedProjectCode,
        start_date: filteredStartDate,
        end_date: filteredEndDate,
      });
    } else if (selectedAnalysis === "gen-analysis-project-overall-report") {
      apiCall = api.postInstallationGenanalasysProjectOvalall({
        start_date: filteredStartDate,
        end_date: filteredEndDate,
      });
    } else if (selectedAnalysis === "gen-analysis-shutter-overall-report") {
      apiCall = api.postInstallationGenanalasysShutterOvalall({
        start_date: filteredStartDate,
        end_date: filteredEndDate,
      });
    } else if (selectedAnalysis === "gen-analysis-user-report") {
      apiCall = api.postInstallationGenanalasysUserReport({
        user_name: selectedUserName,
        start_date: filteredStartDate,
        end_date: filteredEndDate,
      });
    } else {
      return; // No valid condition, exit early
    }

    try {
      setIsSubmitted(true);
      const res = await apiAxios.post(apiCall, payload, {
        // headers,
        cancelToken: cancelTokenSource.token,
      });
      setIsSubmitted(false);
      // setIsFirstLoadToasty(true);

      if (
        apiCall ===
        api.postInstallations(
          selectedProjectCode,
          filteredStartDate,
          filteredEndDate,
          isShowImage
        )
      ) {
        setDataDetailGenerateInvoice(res.data);
      } else {
        // Handle other cases as needed
        console.log(`Response from ${apiCall}:`, res.data);
        setDataAnalysis(res.data);
      }
    } catch (error: AxiosError | any) {
      setIsSubmitted(false);
      // setIsFirstLoadToasty(true);

      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else if (error.response) {
        if (error.response.status === 404 || error.response.status === 400) {
          notify();
        } else {
          // notifyErrorSupport();
        }
        console.log({ error: error.response });
      } else {
        notifyErrorSupport();
        console.log({ error });
      }
    }
  };

  useEffect(() => {
    if (dataDetailGenerateInvoice?.details.length > 0) {
      navigation("/Invoice", {
        state: {
          dataDetailGenerateInvoice,
          filterDateStartForInvoice,
          filterDateEndForInvoice,
          isShowImage,
        },
      });
    }
  }, [dataDetailGenerateInvoice]);

  return (
    <form
      ref={generateInvoiceFormRef}
      className="flex flex-col gap-5 mb-7 p-7 border-2 rounded-2xl shadow-2xl w-full md:min-w-[400px] bg-white"
      onSubmit={(event) => handleUpdateInstallation(event)}
    >
      <ToastContainer />
      <div className="flex justify-between items-center">
        <img className="w-[500px]" src={logo1} alt="logo" />
      </div>

      <div className="grid gap-5">
        <div className="space-y-3">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Year
            </label>
            <select
              disabled={
                selectedAnalysis === "gen-analysis-project-overall-report" ||
                selectedAnalysis === "gen-analysis-shutter-overall-report" ||
                selectedAnalysis === "gen-analysis-user-report"
              }
              name="selectedYeaer"
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value)}
              className="select select-bordered w-full"
            >
              <option disabled value="">
                Please select a Year
              </option>
              {listYear.map((item, index) => (
                <option value={`${item}`} key={index}>{`${item}`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Project code
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Select or Search Project code"
              isDisabled={
                selectedAnalysis === "gen-analysis-project-overall-report" ||
                selectedAnalysis === "gen-analysis-shutter-overall-report" ||
                selectedAnalysis === "gen-analysis-user-report"
              }
              isClearable={false}
              isSearchable={true}
              name="projectCode"
              onChange={(event) => {
                setSelectedProjectCode(event!.value);
                updateFieldError("projectCode", "");
              }}
              options={listProjectCode?.map((item: string) => ({
                value: item,
                label: item,
              }))}
              value={
                selectedProjectCode
                  ? { value: selectedProjectCode, label: selectedProjectCode }
                  : null
              }
            />
            {listError.projectCode && (
              <p className="text-red-500">{listError.projectCode}</p>
            )}
          </div>
          {selectedProjectCode && selectedAnalysis === "gen-installation" && (
            <div>
              <fieldset>
                <legend className="block text-gray-700 text-sm font-bold mb-2">
                  Serial Number
                </legend>
                <div>
                  <div className="flex flex-wrap gap-3">
                    {listSerialNumber?.map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="checkbox"
                          name="serial"
                          value={item}
                          onChange={(event) => handleGetSerialNumber(event)}
                        />
                        <span className="label-text">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </fieldset>
            </div>
          )}

          {/* Select User */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select User
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Select or Search Project code"
              isDisabled={
                selectedAnalysis === "gen-analysis-user-report" ? false : true
              }
              isClearable={false}
              isSearchable={true}
              name="projectCode"
              onChange={(event) => {
                setSelectedUselectedUserName(event!.value);
                updateFieldError("projectCode", "");
              }}
              options={dataInstallerUserForReport?.users?.map(
                (item: string) => ({
                  value: item,
                  label: item,
                })
              )}
              value={
                selectedUserName
                  ? { value: selectedUserName, label: selectedUserName }
                  : null
              }
            />
            {listError.projectCode && (
              <p className="text-red-500">{listError.projectCode}</p>
            )}
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Start Date
            </label>
            <DatePicker
              className="input input-bordered w-full"
              selected={selectedStartDate}
              onChange={(date) => {
                _filterStartDate(date);
                updateFieldError("startDate", "");
              }}
              placeholderText="yyyy/mm/dd"
              dateFormat="yyyy/MM/dd"
            />
          </div>
          {listError.startDate && (
            <p className="text-red-500">{listError.startDate}</p>
          )}

          {/* End Date */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              End Date
            </label>
            <DatePicker
              className="input input-bordered w-full"
              selected={selectedEndDate}
              onChange={(date) => {
                _filterEndDate(date);

                updateFieldError("endDate", "");
              }}
              placeholderText="yyyy/mm/dd"
              dateFormat="yyyy/MM/dd"
            />
          </div>
          {listError.endDate && (
            <p className="text-red-500">{listError.endDate}</p>
          )}

          {/* Show Image */}
          <div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="checkbox"
                name="serial"
                onChange={(e) => setIsShowImage(e.target.checked)}
                disabled={
                  selectedAnalysis !== "gen-installation" ? true : false
                }
              />
              <span className="label-text">Show Image</span>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={`btn btn - primary 
      ${isSubmitted && "loading"}
      
      `}
      >
        Generate Installation
      </button>
    </form>
  );
};

export default HomeLeftComponent;
