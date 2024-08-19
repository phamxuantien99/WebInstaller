import React, { useEffect, useRef, useState } from "react";
import { FcPrint } from "react-icons/fc";
import { useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";
import logo2 from "../../../assets/images/logo2.png";

interface Detail {
  serial: number;
  components: Component[];
}

interface Component {
  "Shutterhood Date"?: string;
  "Shutterhood Assembly By"?: string;
  "Shutterhood Assembly Img"?: string;
  "Slat Date"?: string;
  "Slat And Bottom Bar By"?: string;
  "Slat And Bottom Bar Img"?: string;
  "Side Date"?: string;
  "Side Guide By"?: string;
  "Side Guide Img"?: string;
  "Cover Date"?: string;
  "Cover By"?: string;
  "Cover Img"?: string;
  "Cabling Date"?: string;
  "Cabling By"?: string;
  "Cabling Img"?: string;
  "Motor Date"?: string;
  "Motor By"?: string;
  "Motor Img"?: string;
  "Operation Date"?: string;
  "Operation By"?: string;
  "Operation Img"?: string;
  "T Date"?: string;
}
const PAGE_HEIGHT = 1000;

function InvoiceCase2() {
  const data = useLocation().state;
  const invoiceContentRef = useRef<any>();
  const getUsername = localStorage.getItem("username");
  const [numPages, setNumPages] = useState<number>(0);

  useEffect(() => {
    const calculatePages = () => {
      if (invoiceContentRef.current) {
        const contentHeight = invoiceContentRef.current.offsetHeight;

        const totalPages = Math.ceil(contentHeight / PAGE_HEIGHT);
        setNumPages(totalPages);
      }
    };

    calculatePages();

    // Thêm event listener để tính toán lại số trang nếu cửa sổ thay đổi kích thước
    window.addEventListener("resize", calculatePages);

    // Cleanup event listener khi component bị unmount
    return () => {
      window.removeEventListener("resize", calculatePages);
    };
  }, []);

  // const _handlePrint = useReactToPrint({
  //   content: () => invoiceContentRef.current,
  //   documentTitle: "Statement",
  // });

  const currentDate = new Date().toISOString().slice(0, 10);
  const [year, month, day] = currentDate.split("-");
  // reverse date
  const newDate = `${day}-${month}-${year}`;

  const {
    filterDateEndForInvoice,
    filterDateStartForInvoice,
    dataDetailGenerateInvoice,
    isShowImage,
  } = data;

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-[1300px] mx-auto p-10">
      <div className="flex justify-between items-center">
        <div className="text-center mb-5">
          <ReactToPrint
            trigger={() => (
              <button className="btn btn-ghost gap-3 capitalize">
                <FcPrint size={24} />
                Print
              </button>
            )}
            content={() => invoiceContentRef.current}
            pageStyle={`
          @page { margin: 20mm; }
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
        </div>
      </div>
      <div>
        <div
          id="capture"
          className="invoice-container page"
          ref={invoiceContentRef}
        >
          {dataDetailGenerateInvoice?.details.map(
            (item: Detail, index: number) => {
              return (
                <div
                  key={index}
                  className={index === 0 ? "no-page-break" : "page-break"}
                >
                  <div className="flex gap-10 justify-between items-center mt-10 border-b border-solid border-gray-400 pb-3 w-5/6 mx-auto">
                    <img src={logo2} alt="logo" className="w-[300px]" />

                    <div className="text-right text-sm">
                      <p className="font-bold text-blue-600">
                        No.34 Loyang Crescent <br /> Singapore 508993
                      </p>
                      <p>
                        <strong>T:</strong>{" "}
                        <a href="tel:+6562857813">+65 6285 7813</a>
                      </p>
                      <p>
                        <strong>E:</strong>{" "}
                        <a href="mailto:enquiry@deltatech.com.sg">
                          enquiry@deltatech.com.sg
                        </a>
                      </p>
                      <p>
                        <strong>W:</strong>{" "}
                        <a target="_black" href="www.deltatech.com.sg">
                          www.deltatech.com.sg
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-solid border-black flex justify-between px-4 items-center">
                    {/* Project Code */}
                    <div className="flex flex-col gap-2 mt-3">
                      <p className="font-bold text-black">
                        Project Code:{" "}
                        <span className="font-normal pl-2">
                          {dataDetailGenerateInvoice?.project_code}
                        </span>
                      </p>
                      <p className="font-bold text-black">
                        Company:{" "}
                        <span className="font-normal pl-2">
                          {dataDetailGenerateInvoice?.company}
                        </span>
                      </p>
                      <p className="font-bold text-black">
                        Location/Project:{" "}
                        <span className="font-normal pl-2">
                          {dataDetailGenerateInvoice?.location}
                        </span>
                      </p>
                      <p className="font-bold text-black">
                        Project Installation Report:
                        <span className="font-normal pl-2">
                          {dataDetailGenerateInvoice?.project_code} PCR0001
                        </span>
                      </p>
                      <p className="font-bold text-black">
                        Date Range:
                        <span className="font-normal pl-2">
                          {filterDateStartForInvoice} ~{" "}
                          {filterDateEndForInvoice}
                        </span>
                      </p>
                    </div>
                    {/* Generated Date */}
                    <div>
                      <p className="font-bold text-black">
                        Date:{" "}
                        <span className="font-normal pl-2">{newDate}</span>
                      </p>

                      <p className="font-bold text-black">
                        Requestor:{" "}
                        <span className="font-normal pl-2">{getUsername}</span>
                      </p>

                      <p className="font-bold text-black">
                        Number of page:{" "}
                        <span className="font-normal pl-2">{numPages}</span>
                      </p>
                    </div>
                  </div>
                  <table className="mt-7 w-full">
                    <table border={1} width={"100%"} className="w-full">
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td>Serial no</td>
                          <td colSpan={2} width={"200px"} align="center">
                            {item?.serial}
                          </td>
                          <td width={"150px"}>Type of Shutter</td>
                          <td colSpan={2} width={"200px"} align="center">
                            {dataDetailGenerateInvoice?.type_of_shutter}
                          </td>
                        </tr>

                        <tr>
                          <td>Shutter no</td>
                          <td colSpan={2} align="center">
                            {dataDetailGenerateInvoice?.shutter_number}
                          </td>
                          <td rowSpan={2} align="center">
                            Size
                          </td>
                          <td align="center">width</td>
                          <td align="center">Height</td>
                        </tr>

                        <tr>
                          <td></td>
                          <td colSpan={2}></td>
                          <td align="center">
                            {dataDetailGenerateInvoice?.opening_width}
                          </td>
                          <td align="center">
                            {dataDetailGenerateInvoice?.opening_height}
                          </td>
                        </tr>
                        <tr>
                          <td>Work done</td>
                          <td>Date installed</td>
                          <td>Technician in Charge</td>
                          <td colSpan={3}>Photo</td>
                        </tr>
                        {item.components.map(
                          (item: Component, index: number) => (
                            <React.Fragment key={index}>
                              {/* Shtterhood Assembly */}
                              {item["Shutterhood Date"] && (
                                <tr>
                                  <td className="min-w-[100px] ">
                                    Shutterhood Assembly
                                  </td>
                                  <td>
                                    {formatDate(item["Shutterhood Date"])}
                                  </td>
                                  <td>{item["Shutterhood Assembly By"]}</td>
                                  <td colSpan={3}>
                                    {isShowImage ? (
                                      <img
                                        src={`${item["Shutterhood Assembly Img"]}`}
                                        alt=""
                                        style={{
                                          minWidth: "150px",
                                          height: "85px",
                                          objectFit: "cover",
                                          display: "inline-block",
                                        }}
                                      />
                                    ) : (
                                      <p>Not display the picture</p>
                                    )}
                                  </td>
                                </tr>
                              )}

                              {/* Slat & Bottom Bar */}
                              {item["Slat Date"] && (
                                <tr>
                                  <td className="min-w-[100px]">
                                    Slat & Bottom Bar
                                  </td>
                                  <td>{formatDate(item["Slat Date"])}</td>
                                  <td>{item["Slat And Bottom Bar By"]}</td>
                                  <td colSpan={3}>
                                    {isShowImage ? (
                                      <img
                                        src={`${item["Slat And Bottom Bar Img"]}`}
                                        alt=""
                                        style={{
                                          minWidth: "150px",
                                          height: "85px",
                                          objectFit: "cover",
                                          display: "inline-block",
                                        }}
                                      />
                                    ) : (
                                      <p>Not display the picture</p>
                                    )}
                                  </td>
                                </tr>
                              )}

                              {/* Side Guide */}
                              {item["Side Date"] && (
                                <tr>
                                  <td className="min-w-[100px]">Side Guide</td>
                                  <td>{formatDate(item["Side Date"])}</td>
                                  <td>{item["Side Guide By"]}</td>
                                  <td colSpan={3}>
                                    {isShowImage ? (
                                      <img
                                        src={`${item["Side Guide Img"]}`}
                                        alt=""
                                        style={{
                                          minWidth: "150px",
                                          height: "85px",
                                          objectFit: "cover",
                                          display: "inline-block",
                                        }}
                                      />
                                    ) : (
                                      <p>Not display the picture</p>
                                    )}
                                  </td>
                                </tr>
                              )}

                              {/* Cover */}
                              {item["Cover Date"] && (
                                <tr>
                                  <td className="min-w-[100px]">Cover</td>
                                  <td>{formatDate(item["Cover Date"])}</td>
                                  <td>{item["Cover By"]}</td>
                                  <td colSpan={3}>
                                    {isShowImage ? (
                                      <img
                                        src={`${item["Cover Img"]}`}
                                        alt=""
                                        style={{
                                          minWidth: "150px",
                                          height: "85px",
                                          objectFit: "cover",
                                          display: "inline-block",
                                        }}
                                      />
                                    ) : (
                                      <p>Not display the picture</p>
                                    )}
                                  </td>
                                </tr>
                              )}

                              {/* Motor */}
                              {item["Motor Date"] &&
                                item["Motor Img"] !== "N" && (
                                  <tr>
                                    <td className="min-w-[100px]">Motor</td>
                                    <td>{formatDate(item["Motor Date"])}</td>
                                    <td>{item["Motor By"]}</td>
                                    <td colSpan={3}>
                                      {isShowImage ? (
                                        <img
                                          src={`${item["Motor Img"]}`}
                                          alt=""
                                          style={{
                                            minWidth: "150px",
                                            height: "85px",
                                            objectFit: "cover",
                                            display: "inline-block",
                                          }}
                                        />
                                      ) : (
                                        <p>Not display the picture</p>
                                      )}
                                    </td>
                                  </tr>
                                )}

                              {/* Cabling works */}
                              {item["Cabling Date"] &&
                                item["Cabling Img"] !== "N" && (
                                  <tr>
                                    <td className="min-w-[100px]">Cabling </td>
                                    <td>{formatDate(item["Cabling Date"])}</td>
                                    <td>{item["Cabling By"]}</td>
                                    <td colSpan={3}>
                                      {isShowImage ? (
                                        <img
                                          src={`${item["Cabling Img"]}`}
                                          alt=""
                                          style={{
                                            minWidth: "150px",
                                            height: "85px",
                                            objectFit: "cover",
                                            display: "inline-block",
                                          }}
                                        />
                                      ) : (
                                        <p>Not display the picture</p>
                                      )}
                                    </td>
                                  </tr>
                                )}

                              {/* OPERATION TEST */}

                              {item["Operation Date"] && (
                                <tr>
                                  <td className="min-w-[100px]">Operation</td>
                                  <td>{formatDate(item["Operation Date"])}</td>
                                  <td>{item["Operation By"]}</td>
                                  <td colSpan={3}>
                                    {isShowImage ? (
                                      <img
                                        src={`${item["Operation Img"]}`}
                                        alt=""
                                        style={{
                                          minWidth: "150px",
                                          height: "85px",
                                          objectFit: "cover",
                                          display: "inline-block",
                                        }}
                                      />
                                    ) : (
                                      <p>Not display the picture</p>
                                    )}
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          )
                        )}
                      </tbody>
                    </table>
                  </table>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceCase2;
