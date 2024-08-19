import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import apiAxios from "../../../../api/api";
import { api } from "../../../service/api/endpoint";
import { useDebounce } from "../../../service/hooks/useDebounce";

const headerNew = [
  "Project Code",
  "Company",
  "Location",
  "Type Of Shutter",
  "Shutter Number",
  "Opening Width",
  "Opening Height",
  "Serial No",
  "Fab_List No",
  "Finishing",
];

const headerKeyNew = [
  "project_code",
  "company",
  "location",
  "type_of_shutter",
  "shutter_number",
  "opening_width",
  "opening_height",
  "serial_no",
  "fab_list_no",
  "finishing",
];
const GenInstallation = () => {
  const auth = localStorage.getItem("access_token_installation");

  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchQuery, 1000);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const fetchDataLogistic = async (
    currentPage?: number,
    searchValue?: string
  ) => {
    try {
      return await apiAxios
        .get(api.getDataInvoices(currentPage, searchValue))
        .then((res) => res.data);
    } catch (error) {
      alert("Something went wrong, please login again!!");
      return { error: "Failed to fetch data" };
    }
  };

  const { data: dataTotalProduct, isLoading: isLoadingProduct } = useQuery({
    queryKey: ["dataTotalProduct", currentPage, debouncedSearchValue],
    queryFn: () => fetchDataLogistic(currentPage, debouncedSearchValue),
    enabled: !!auth,
  });

  const totalPages = Math.ceil(
    dataTotalProduct?.search_options?.total_count / 20
  );

  // const [updating, setUpdating] = useState<boolean>(false);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // const [edit, setEdit] = useState<any>({
  //   date: new Date(),
  //   invoice_id: "",
  //   issue_date: "",
  //   contact_person: "",
  //   contact_number: "",
  //   your_ref: "",
  // });
  // const defaultEdit = {
  //   date: new Date(),
  //   invoice_id: "",
  //   issue_date: "",
  //   contact_person: "",
  //   contact_number: "",
  //   your_ref: "",
  // };

  // const editItem = (item: any) => {
  //   const dateSplit = item["created_at"].split("/");
  //   const date = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`;
  //   const payload = {
  //     date: new Date(date),
  //     invoice_id: item["invoice_id"],
  //     issue_date: item["created_at"],
  //     contact_person: item["contact_person"],
  //     contact_number: item["contact_number"],
  //     your_ref: item["client_ref"],
  //   };

  //   setEdit(Object.assign({}, payload));
  // };

  // const _handleUpdateInvoiceForm = () => {
  //   document.getElementById("close")?.click();
  //   setEdit(defaultEdit);
  // };

  // const updateInvoiceFormRef = useRef(null);

  // const renderUpdateModal = (item: any) => {
  //   return (
  //     <div>
  //       <label
  //         onClick={() => editItem(item)}
  //         htmlFor="modal-edit"
  //         className="btn modal-button btn-square btn-sm"
  //       >
  //         <BsPenFill size={16} />
  //       </label>
  //       <input type="checkbox" id="modal-edit" className="modal-toggle" />
  //       <div className="modal">
  //         <div className="modal-box relative">
  //           <label
  //             id="close"
  //             htmlFor="modal-edit"
  //             className="btn btn-sm btn-circle absolute right-2 top-2"
  //           >
  //             ✕
  //           </label>
  //           <h3 className="text-lg font-bold mb-10">Update PDO</h3>
  //           <div>
  //             <form
  //               ref={updateInvoiceFormRef}
  //               // onSubmit={(e) => _handleUpdateInvoice(e)}
  //             >
  //               <div className="grid gap-3">
  //                 <div>
  //                   <label className="block text-gray-700 text-sm font-bold mb-2">
  //                     Generate Date
  //                   </label>
  //                   <DatePicker
  //                     className="input input-bordered w-full"
  //                     selected={edit.date}
  //                     onChange={(date: any) =>
  //                       setEdit((prev: any) => ({
  //                         ...prev,
  //                         date: date,
  //                       }))
  //                     }
  //                     placeholderText="dd/mm/yyyy"
  //                     dateFormat="dd/MM/yyyy"
  //                   />
  //                 </div>
  //                 <div>
  //                   <label className="block text-gray-700 text-sm font-bold mb-2">
  //                     Contact Person
  //                   </label>
  //                   <input
  //                     required
  //                     value={edit.contact_person}
  //                     onChange={(event) =>
  //                       setEdit((prev: any) => ({
  //                         ...prev,
  //                         contact_person: event.target.value,
  //                       }))
  //                     }
  //                     type="text"
  //                     placeholder="Contact person"
  //                     className="input input-bordered w-full"
  //                   />
  //                 </div>
  //                 <div>
  //                   <label className="block text-gray-700 text-sm font-bold mb-2">
  //                     Contact Number
  //                   </label>
  //                   <input
  //                     required
  //                     value={edit.contact_number}
  //                     onChange={(event) =>
  //                       setEdit((prev: any) => ({
  //                         ...prev,
  //                         contact_number: event.target.value,
  //                       }))
  //                     }
  //                     type="text"
  //                     placeholder="Contact number"
  //                     className="input input-bordered w-full"
  //                   />
  //                 </div>
  //                 <div>
  //                   <label className="block text-gray-700 text-sm font-bold mb-2">
  //                     Client Ref
  //                   </label>
  //                   <input
  //                     required
  //                     value={edit.your_ref}
  //                     onChange={(event) =>
  //                       setEdit((prev: any) => ({
  //                         ...prev,
  //                         your_ref: event.target.value,
  //                       }))
  //                     }
  //                     type="text"
  //                     placeholder="Client Ref"
  //                     className="input input-bordered w-full"
  //                   />
  //                 </div>

  //                 <button
  //                   type="submit"
  //                   className={`btn btn-primary ${updating && "loading"}`}
  //                 >
  //                   Save
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div>
      <div className="overflow-y-auto " style={{ maxHeight: "84vh" }}>
        <table className="table w-full">
          <thead>
            <tr>
              <th>No.</th>
              {/* <th>Action</th> */}
              {headerNew.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
              <th></th>
            </tr>
            <tr>
              <td colSpan={11}>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(event) => handleSearch(event.target.value)}
                  className="input input-bordered w-full"
                ></input>
              </td>
            </tr>
          </thead>
          <tbody className="w-full">
            {dataTotalProduct?.founds?.map((item: any, index: any) => {
              return (
                <tr key={index} className="hover">
                  <th>{index + 1}</th>
                  {/* <td key={"action"}>
                    <div className="flex gap-3">
                      <Link
                        to={`/home/${item["serial_no"]}`}
                        className="btn btn-square btn-outline btn-sm"
                      >
                        <BsEyeFill size={16} />
                      </Link>

                      <>{renderUpdateModal(item)}</>

                      {user.role === "admin" && (
                          <>{renderUpdateModal(item)}</>
                        )}
                    </div>
                  </td> */}
                  {headerKeyNew.map((header, headerIndex) => (
                    <td key={headerIndex}>{item[header]}</td>
                  ))}
                </tr>
              );
            })}
            <tr>
              {!isLoadingProduct && dataTotalProduct?.founds?.length === 0 && (
                <td colSpan={headerNew.length + 2} className={"text-center"}>
                  No results
                </td>
              )}
              {isLoadingProduct && (
                <td colSpan={headerNew.length + 2} className={"text-center"}>
                  Loading...
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex bg-white rounded-lg font-[Poppins] align-center items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange((currentPage as number) - 1)}
          className="h-12 border-2 border-r-0 border-indigo-600
               px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
        <p className="font-bold mx-2">{`Page ${currentPage} of ${totalPages}`}</p>
        <button
          onClick={() => handlePageChange((currentPage as number) + 1)}
          disabled={currentPage === totalPages}
          className="h-12 border-2  border-indigo-600
               px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
              fill-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GenInstallation;
