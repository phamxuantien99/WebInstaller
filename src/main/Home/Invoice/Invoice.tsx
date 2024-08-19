import { useQuery } from "@tanstack/react-query";
import { CSSProperties, useRef } from "react";
import { FcPrint } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { useReactToPrint } from "react-to-print";
import pictureWeb from "../../../assets/images/Screenshot 2024-05-09 170657.png";
import { api } from "../../service/api/endpoint";
import "./InvoiceStyle.css";

import apiAxios from "../../../api/api";
import logo2 from "../../../assets/images/logo2.png";

const override: CSSProperties = {
  display: "flex",
  margin: "500px auto",
  borderColor: "red",
};

function Invoice() {
  const { id } = useParams();
  //   const { auth } = useContext(AuthContext) as AuthContextType;
  //   console.log({ auth });
  const auth = localStorage.getItem("authTokenInstallation");

  const url = auth ? `Bearer ${auth}` : "";
  //   const headers = {
  //     Authorization: url,
  //     accept: "application/json",
  //     "Content-Type": "application/json",
  //   };
  const invoiceContentRef = useRef<any>();

  const fetchDataDetail = async (id: number) => {
    try {
      return await apiAxios
        .get(
          api.getDataInvoicesDetail(id)
          //   {
          //     headers,
          //   }
        )
        .then((res) => res.data);
    } catch (error) {
      return { error: "Failed to fetch data" };
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["dataDetailProduct", id],
    queryFn: () => fetchDataDetail(id as any),
    enabled: !!url,
  });

  console.log({ data });

  const _handlePrint = useReactToPrint({
    content: () => invoiceContentRef.current,
    documentTitle: "Statement",
  });

  if (isLoading)
    return (
      <FadeLoader
        loading={isLoading}
        cssOverride={override}
        color="red"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );

  return (
    <div className="w-[1300px] mx-auto p-10">
      <div className="flex justify-between items-center">
        <div className="text-center mb-5">
          <button
            onClick={_handlePrint}
            className="btn btn-ghost gap-3 capitalize"
          >
            <FcPrint size={24} />
            Print
          </button>
        </div>
      </div>
      <div>
        <div id="capture" className="invoice-container" ref={invoiceContentRef}>
          <div className="flex gap-10 justify-center items-center mt-10 border-b border-solid border-gray-400 pb-3 w-5/6 mx-auto">
            <img src={logo2} alt="logo" className="w-[400px]" />

            <div className="text-right text-sm">
              <p className="font-bold text-blue-600">
                No.34 Loyang Crescent <br /> Singapore 508993
              </p>
              <p>
                <strong>T:</strong> <a href="tel:+6562857813">+65 6285 7813</a>
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

          {/* Project Code */}
          <div className="mt-8 border-t border-solid border-black flex justify-between px-4 items-center">
            {/* Project Code */}
            <div className="flex flex-col gap-2">
              <p className="font-bold text-black">
                Project Code:{" "}
                <span className="font-normal pl-2">Project Code</span>
              </p>
              <p className="font-bold text-black">
                Company: <span className="font-normal pl-2">Project Code</span>
              </p>
              <p className="font-bold text-black">
                Location/Project:{" "}
                <span className="font-normal pl-2">Project Code</span>
              </p>
              <p className="font-bold text-black">
                Project Installation Report:
                <span className="font-normal pl-2">
                  Report No (Project Code + PIR001)
                </span>
              </p>
              <p className="font-bold text-black">
                Date Range:
                <span className="font-normal pl-2">
                  25/04/2024 ~ 24/04/2024
                </span>
              </p>
            </div>
            {/* Generated Date */}
            <div>
              <p className="font-bold text-black">
                Date: <span className="font-normal pl-2">Generate Date</span>
              </p>

              <p className="font-bold text-black">
                Requestor: <span className="font-normal pl-2">Name</span>
              </p>

              <p className="font-bold text-black">
                Number of page: <span className="font-normal pl-2">2</span>
              </p>
            </div>
          </div>

          {/* table */}

          <table className="mt-7 w-full">
            <table border={1} width={"100%"} className="w-full">
              <thead></thead>
              <tbody>
                <tr>
                  <td>Serial no</td>
                  <td colSpan={2} width={"200px"} align="center">
                    240010
                  </td>
                  <td width={"150px"}>Type of Shutter</td>
                  <td colSpan={2} width={"200px"} align="center">
                    FRS240
                  </td>
                </tr>

                <tr>
                  <td>Shutter no</td>
                  <td colSpan={2} align="center">
                    FRS01
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
                  <td align="center">3000</td>
                  <td align="center">3000</td>
                </tr>

                <tr>
                  <td>Work done</td>
                  <td>Date installed</td>
                  <td>Technician in Charge</td>
                  <td colSpan={3}>Photo</td>
                </tr>

                {/* Shtterhood Assembly */}
                <tr>
                  <td>1, Shtterhood Assembly</td>
                  <td>5/9/2024</td>
                  <td>Chris</td>
                  <td colSpan={3}>
                    <img src={logo2} alt="" />
                  </td>
                </tr>

                {/* Slat & Bottom Bar */}

                <tr>
                  <td>2, Slat & Bottom Bar</td>
                  <td>5/9/2024</td>
                  <td>Chris</td>
                  <td colSpan={3}>
                    <img src={logo2} alt="" />
                  </td>
                </tr>

                {/* Side Guide */}

                <tr>
                  <td>3, Side Guide</td>
                  <td>5/9/2024</td>
                  <td>Chris</td>
                  <td colSpan={3}>
                    <img src={logo2} alt="" />
                  </td>
                </tr>

                {/* Cover */}

                <tr>
                  <td>4, Cover</td>
                  <td>5/9/2024</td>
                  <td>Chris</td>
                  <td colSpan={3}>
                    <img src={logo2} alt="" />
                  </td>
                </tr>

                {/* Motor */}

                <tr>
                  <td>5, Motor</td>
                  <td>5/9/2024</td>
                  <td>Chris</td>
                  <td colSpan={3}>
                    <img src={logo2} alt="" />
                  </td>
                </tr>

                {/* Cabling works */}

                <tr>
                  <td>6, Cabling works</td>
                  <td>5/9/2024</td>
                  <td>Chris</td>
                  <td colSpan={3}>
                    <img src={pictureWeb} alt="" />
                  </td>
                </tr>
              </tbody>
            </table>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Invoice;

// <div className="flex justify-between p-1">
// <img
//   className="w-[500px]"
//   src={logo2}
//   alt="logo"
// />

// <div className="text-right text-sm">
//   <p className="font-bold text-blue-600">
//     No.34 Loyang Crescent <br /> Singapore 508993
//   </p>
//   <p>
//     <strong>T:</strong> <a href="tel:+6562857813">+65 6285 7813</a>
//   </p>
//   <p>
//     <strong>E:</strong>{" "}
//     <a href="mailto:enquiry@deltatech.com.sg">
//       enquiry@deltatech.com.sg
//     </a>
//   </p>
//   <p>
//     <strong>W:</strong>{" "}
//     <a target="_black" href="www.deltatech.com.sg">
//       www.deltatech.com.sg
//     </a>
//   </p>
// </div>
// </div>
// <table className="table table-compact w-full">
// <table className="table table-compact w-full">
//   <thead>
//     <tr>
//       <th className="capitalize text-lg text-center" colSpan={4}>
//         Project Delivery Order (PDO)
//       </th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <th>Project Code</th>
//       <td>{data["project_code"]}</td>
//       <th>Company</th>
//       <td>{data["company"]}</td>
//     </tr>
//     <tr>
//       <th>Location</th>
//       <td>{data["location"]}</td>
//       <th>Type Of Shutter</th>
//       <td>{data["type_of_shutter"]}</td>
//     </tr>
//     <tr>
//       <th>Shutter Number</th>
//       <td>{data["shutter_number"]}</td>
//       <th>Opening Width</th>
//       <td>{data["opening_width"]}</td>
//     </tr>
//     <tr>
//       <th>Opening Height</th>
//       <td>{data["opening_height"]}</td>
//       <th>Serial No</th>
//       <td>{data["serial_no"]}</td>
//     </tr>
//     <tr>
//       <th>Fab List No</th>
//       <td>{data["fab_list_no"]}</td>
//       <th>Finishing</th>
//       <td>{data["finishing"]}</td>
//     </tr>
//   </tbody>
// </table>

// Case Example
// <div>
//   <div className="flex bg-gray-300 p-2">
//     <p className="font-bold flex-1 text-center">
//       Shutterhood Assembly
//     </p>
//     <p className="font-bold flex-1 text-center">
//       Shutterhood Assembly By
//     </p>
//     <p className="font-bold flex-1 text-center">
//       Shutterhood Assembly Img
//     </p>
//   </div>
//   <div className="my-2 flex items-center">
//     <p className="flex-1 text-center">
//       {data["shutterhood_assembly"]}
//     </p>
//     <p className="flex-1 text-center">
//       {data["shutterhood_assembly_by"]}
//     </p>
//     <img
//       src={`data:image/png;base64,${data["shutterhood_assembly_img"]}`}
//       style={{
//         width: "200px",
//         height: "200px",
//         objectFit: "cover",
//         flex: 1,
//       }}
//     />
//   </div>
// </div>

// Example 2

// <div>
//   <div className="flex  bg-gray-300 p-2">
//     <p className="font-bold flex-1 text-center">
//       Slat and Bottom Bar
//     </p>
//     <p className="font-bold flex-1 text-center">
//       Slat and Bottom Bar By
//     </p>
//     <p className="font-bold flex-1 text-center">
//       Slat and Bottom Bar Img
//     </p>
//   </div>
//   <div className="my-2 flex  items-center">
//     <p className="flex-1 text-center">
//       {data["slat_and_bottom_bar"]}
//     </p>
//     <p className="flex-1 text-center">
//       {data["slat_and_bottom_bar_by"]}
//     </p>
//     <img
//       src={`data:image/png;base64,${data["slat_and_bottom_bar_img"]}`}
//       style={{
//         width: "200px",
//         height: "200px",
//         objectFit: "cover",
//         flex: 1,
//       }}
//     />
//   </div>
// </div>

// Example 3

// <div>
//   <div className="flex bg-gray-300 p-2">
//     <p className="font-bold flex-1 text-center">Side Guide</p>
//     <p className="font-bold flex-1 text-center">Side Guide By</p>
//     <p className="font-bold flex-1 text-center">Side Guide Img</p>
//   </div>
//   <div className="my-2 flex d items-center">
//     <p className="flex-1 text-center">{data["side_guide"]}</p>
//     <p className="flex-1 text-center">{data["side_guide_by"]}</p>
//     <img
//       src={`data:image/png;base64,${data["side_guide_img"]}`}
//       style={{
//         width: "200px",
//         height: "200px",
//         objectFit: "cover",
//         flex: 1,
//       }}
//     />
//   </div>
// </div>

// Example 4

// <div>
//   <div className="flex bg-gray-300 p-2">
//     <p className="font-bold flex-1 text-center">Cover</p>
//     <p className="font-bold flex-1 text-center">Cover By</p>
//     <p className="font-bold flex-1 text-center">Cover Img</p>
//   </div>
//   <div className="my-2 flex justify-around items-center">
//     <p className="flex-1 text-center">{data["cover"]}</p>
//     <p className="flex-1 text-center">{data["cover_by"]}</p>
//     <img
//       src={`data:image/png;base64,${data["cover_img"]}`}
//       style={{
//         width: "200px",
//         height: "200px",
//         objectFit: "cover",
//         flex: 1,
//       }}
//     />
//   </div>
// </div>

// Example 5

// <div>
//   <div className="flex  bg-gray-300 p-2">
//     <p className="font-bold flex-1 text-center">Cabling</p>
//     <p className="font-bold flex-1 text-center">Cabling By</p>
//     <p className="font-bold flex-1 text-center">Cabling Img</p>
//   </div>
//   <div className="my-2 flex  items-center">
//     {data["cabling"] ? (
//       <p className="flex-1 text-center">{data["cabling"]}</p>
//     ) : (
//       <p className="flex-1 text-center">N/A</p>
//     )}
//     {data["cabling_by"] ? (
//       <p className="flex-1 text-center">{data["cabling_by"]}</p>
//     ) : (
//       <p className="flex-1 text-center">N/A</p>
//     )}

//     {data["cabling_img"] ? (
//       <img
//         alt="cabling"
//         src={`data:image/png;base64,${data["cabling_img"]}`}
//         style={{
//           width: "200px",
//           height: "200px",
//           objectFit: "cover",
//           flex: 1,
//         }}
//       />
//     ) : (
//       <p className="flex-1 text-center">N/A</p>
//     )}
//   </div>
// </div>

// Example 6

// <div>
//   <div className="flex  bg-gray-300 p-2">
//     <p className="font-bold flex-1 text-center">Motor</p>
//     <p className="font-bold flex-1 text-center">Motor By</p>
//     <p className="font-bold flex-1 text-center">Motor Img</p>
//   </div>
//   <div className="my-2 flex items-center">
//     {data["motor"] ? (
//       <p className="flex-1 text-center">{data["motor"]}</p>
//     ) : (
//       <p>N/A</p>
//     )}
//     {data["motor_by"] ? (
//       <p className="flex-1 text-center">{data["motor_by"]}</p>
//     ) : (
//       <p>N/A</p>
//     )}

//     {data["motor_img"] ? (
//       <img
//         alt="cabling"
//         src={`data:image/png;base64,${data["motor_img"]}`}
//         style={{
//           width: "200px",
//           height: "200px",
//           objectFit: "cover",
//           flex: 1,
//         }}
//       />
//     ) : (
//       <p>N/A</p>
//     )}
//   </div>
// </div>

// Example 7
// <div>
//   <div className="flex bg-gray-300 p-2">
//     <p className="font-bold flex-1 text-center">T_and_c</p>
//     <p className="font-bold flex-1 text-center">T_and_c_by </p>
//     <p className="font-bold flex-1 text-center">T_and_c_img</p>
//   </div>
//   <div className="my-2 flex  items-center">
//     <p className="flex-1 text-center">{data["t_and_c"]}</p>
//     <p className="flex-1 text-center">{data["t_and_c_by"]}</p>
//     <img
//       src={`data:image/png;base64,${data["t_and_c_img"]}`}
//       style={{
//         width: "200px",
//         height: "200px",
//         objectFit: "cover",
//         flex: 1,
//       }}
//     />
//   </div>
// </div>
// <tfoot>
//   <tr>
//     <td>

//       <div id="page-number">
//         {" "}
//         Delivery Order Ref: {data["project_code"]}
//       </div>
//     </td>
//   </tr>
// </tfoot>
// </table>
