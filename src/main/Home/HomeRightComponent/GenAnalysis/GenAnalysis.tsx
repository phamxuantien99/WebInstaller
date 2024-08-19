import { useContext, useRef } from "react";
import { FcPrint } from "react-icons/fc";
import ReactToPrint from "react-to-print";
import LogoCompany from "../../../../assets/images/OnlyLogo.jpg";
import { formatDate } from "../../../../util/helper/helper";
import AuthContext, { AuthContextType } from "../../../context/AuthProvider";
import CompletedByUser from "./CompletedByUser/CompletedByUser";
import ProjectDetail from "./ProjectDetail/ProjectDetail";
import ProjectOverall from "./ProjectOverall/ProjectOverall";
import ShutterOverall from "./ShutterOverall/ShutterOverall";

const GenAnalysis = () => {
  const { dataAnalysis, selectedAnalysis } = useContext(
    AuthContext
  ) as AuthContextType;
  const invoiceContentRef = useRef<any>();

  const today = new Date();

  const day = today.getDate();
  const month = today.getMonth() + 1; // Tháng bắt đầu từ 0, nên phải cộng thêm 1
  const year = today.getFullYear();

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-ghost gap-3 capitalize">
            <FcPrint size={24} />
            Print
          </button>
        )}
        content={() => invoiceContentRef.current}
        pageStyle={`
          @page { margin: 20mm; size: A4 landscape !important; }
          @media print {
            body { -webkit-print-color-adjust: exact; }
            .print-content {
              position: relative;
            }
            .page-break {
              margin-top: 30px,
              page-break-before: always;
              page-break-inside: avoid;
            }
            .no-page-break {
              margin-top: 30px,
              page-break-before: auto;
            }
            .page-number {
              position: fixed;
              bottom: 10mm;
              right: 10mm;
              color: black;
            }
          }
        `}
      />

      <div className="bg-white p-2 page" ref={invoiceContentRef} id="printable">
        {dataAnalysis?.start_date || dataAnalysis?.user ? (
          <div>
            {/* Header total */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={LogoCompany}
                  alt="Logo Company"
                  className="w-[35px] h-[60px]"
                />
                <div className="flex flex-col gap-2">
                  <h1
                    className={`${
                      selectedAnalysis === "gen-analysis-user-report"
                        ? "text-3xl"
                        : "text-[22px]"
                    }`}
                  >
                    {selectedAnalysis ===
                      "gen-analysis-project-detail-report" &&
                      "Project Details Components Selection Report"}
                    {selectedAnalysis ===
                      "gen-analysis-project-overall-report" &&
                      "Project Overall Components Selection Report"}
                    {selectedAnalysis ===
                      "gen-analysis-shutter-overall-report" &&
                      "Completed Shutter By User Overivew Report"}
                    {selectedAnalysis === "gen-analysis-user-report" &&
                      "Products that the user has completed"}
                  </h1>
                  <div>
                    {selectedAnalysis ===
                      "gen-analysis-project-detail-report" && (
                      <p className="flex gap-2 text-base">
                        Project Range:{" "}
                        <span className="font-semibold">
                          {dataAnalysis?.project_code}
                        </span>
                      </p>
                    )}

                    {selectedAnalysis === "gen-analysis-user-report" ? (
                      <p className={`flex gap-2 text-xl`}>
                        User Completed:
                        <span className="font-semibold">
                          {dataAnalysis?.user}
                        </span>
                      </p>
                    ) : (
                      <p className="flex gap-2 text-base">
                        Date Range:{" "}
                        <span className="font-semibold">
                          {dataAnalysis?.start_date &&
                            formatDate(dataAnalysis?.start_date)}{" "}
                          -{" "}
                          {dataAnalysis?.end_date &&
                            formatDate(dataAnalysis?.end_date)}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <p
                  className={`${
                    selectedAnalysis === "gen-analysis-user-report"
                      ? "text-xl"
                      : "text-base"
                  }`}
                >
                  Date Generated:{" "}
                  <span className="font-semibold">
                    {day}-{month}-{year}
                  </span>
                </p>
              </div>
            </div>
            {/* dâta show */}
            <div className="my-5">
              {selectedAnalysis === "gen-analysis-project-detail-report" && (
                <ProjectDetail />
              )}
              {selectedAnalysis === "gen-analysis-project-overall-report" && (
                <ProjectOverall />
              )}
              {selectedAnalysis === "gen-analysis-shutter-overall-report" && (
                <ShutterOverall />
              )}
              {selectedAnalysis === "gen-analysis-user-report" && (
                <CompletedByUser />
              )}
            </div>
          </div>
        ) : (
          <p className="text-center">There is no data to display</p>
        )}
      </div>
    </div>
  );
};

export default GenAnalysis;
