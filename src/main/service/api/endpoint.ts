export const api = {
  getLogin: `/auth/sign-in`,

  // Logistic
  getDataProduct: (
    currentPage?: number,
    searchValue?: string,
    signed?: string
  ) =>
    `/logistic?page=${currentPage}&delivery_order_ref_or_company_search=${searchValue?.toUpperCase()}&signed=${signed}`,
  getDataProductDetail: (productId: number) => `/logistic/${productId}`,

  // Installations
  getDataInvoices: (currentPage?: number, searchValue?: string) =>
    `/installations?page=${currentPage}&project_code_or_serial_no=${searchValue}`,
  getDataInvoicesDetail: (serialNo: number) => `/installations${serialNo}`,

  getInstallationsSerialNumber: `/installations/get-serial-number`,

  getInstallationsGetListProjectCode: `/installations/get-list-of-project-by-date`,

  postInstallations: (
    project_request: string,
    start_date: string,
    end_date: string,
    show_image: boolean
  ) =>
    `/installations/gen-installation-report?project_request=${project_request}&start_date=${start_date}&end_date=${end_date}&show_image=${show_image}`,

  postInstallationGenanalasysProjectDetail: ({
    project_code,
    start_date,
    end_date,
  }: {
    project_code: string;
    start_date: string;
    end_date: string;
  }) =>
    `/installations/gen-analysis-project-detail-report?project_code=${project_code}&start_date=${start_date}&end_date=${end_date}`,

  postInstallationGenanalasysProjectOvalall: ({
    start_date,
    end_date,
  }: {
    start_date: string;
    end_date: string;
  }) =>
    `/installations/gen-analysis-project-overall-report?start_date=${start_date}&end_date=${end_date}`,

  postInstallationGenanalasysShutterOvalall: ({
    start_date,
    end_date,
  }: {
    start_date: string;
    end_date: string;
  }) =>
    `/installations/gen-analysis-shutter-overall-report?start_date=${start_date}&end_date=${end_date}`,

  postInstallationGenanalasysUserReport: ({
    user_name,
    start_date,
    end_date,
  }: {
    user_name: string;

    start_date: string;
    end_date: string;
  }) =>
    `/installations/gen-analysis-user-report?start_date=${start_date}&end_date=${end_date}&user=${user_name}`,

  getDataUserForReport: `/installations/get-list-user-for-report`,
};
