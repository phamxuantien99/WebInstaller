import { useContext } from "react";
import AuthContext, { AuthContextType } from "../../../../context/AuthProvider";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Chỉ lấy phần ngày (YYYY-MM-DD)
};

const convertToDisplayName = (input: string): string => {
  // Thay thế dấu gạch dưới bằng khoảng trắng và viết hoa chữ cái đầu của từng từ
  return input
    .split("_") // Tách chuỗi bằng dấu gạch dưới
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Viết hoa chữ cái đầu
    .join(" "); // Nối các từ bằng khoảng trắng
};

interface Component {
  component: string;
  componentImg: string;
  componentName: string;
}

interface TransformedData {
  project_code: string | number;
  company: string | number;
  location: string | number;
  type_of_shutter: string | number;
  shutter_number: string | number;
  opening_width: string | number;
  opening_height: string | number;
  fab_list_no: string | number;
  finishing: string | number;
  component_date: string | number;
  serial_no: string | number;
  components: Component[];
}

// Sample data type definition
interface RawData {
  [key: string]: {
    [index: string]: string | number;
  };
}

export const componentOrder = [
  "Shutterhood",
  "Slat And Bottom Bar",
  "Side Guide",
  "Cover",
  "Cabling",
  "Motor",
  "Operation",
  "T And C",
];

const CompletedByUser = () => {
  const { dataAnalysis } = useContext(AuthContext) as AuthContextType;

  const { completed_work } = dataAnalysis;

  // const keys = Object.keys(completed_work["Project code"]);

  const transformData = (data: RawData): TransformedData[] => {
    const result: Record<string, TransformedData> = {};

    const keys = Object.keys(data["Serial No."]);

    keys.forEach((key) => {
      const serialNo = data["Serial No."][key];
      const project_code = data["Project code"][key];
      const company = data["Company"][key];
      const location = data["Location"][key];
      const type_of_shutter = data["Type of Shutter"][key];
      const shutter_number = data["Shutter Number"][key];
      const opening_width = data["Opening width"][key];
      const opening_height = data["Opening height"][key];
      const fab_list_no = data["Fab List No."][key];
      const finishing = data["Finishing"][key];
      const component_date = data["Component"][key];

      if (!result[serialNo]) {
        result[serialNo] = {
          project_code,
          company,
          location,
          type_of_shutter,
          shutter_number,
          opening_width: opening_width.toString(),
          opening_height: opening_height.toString(),
          fab_list_no,
          finishing,
          component_date,
          serial_no: serialNo,
          components: [],
        };
      }

      result[serialNo].components.push({
        component: formatDate(data["Component"][key] as string),
        componentName: convertToDisplayName(
          data["component_name"][key] as string
        ),
        componentImg: data["Component Img"][key] as string,
      });
    });

    return Object.values(result);
  };

  function sortByOrder(
    objects: {
      component: string;
      componentName: string;
      componentImg: string;
    }[]
  ): { component: string; componentName: string; componentImg: string }[] {
    return objects.sort((a, b) => {
      const indexA = componentOrder.indexOf(a.componentName);
      const indexB = componentOrder.indexOf(b.componentName);
      return indexA - indexB;
    });
  }

  return (
    <table className="w-full bg-white border-collapse">
      <thead>
        <tr>
          <th>Project Code</th>
          <th>Company</th>
          <th>Location</th>

          <th>
            <ul>
              <li className="w-max">Type of Shutter</li>
            </ul>
          </th>
          <th>Shutter Number</th>
          <th>Opening Width</th>
          <th>Opening Height</th>

          <th>
            <ul>
              <li className="w-max">Serial No.</li>
            </ul>
          </th>
          <th>
            <ul>
              <li className="w-max">Fab List No.</li>
            </ul>
          </th>
          <th>Finishing</th>

          <th>Component</th>
        </tr>
      </thead>
      <tbody>
        {transformData(completed_work)?.map((item) => (
          <tr key={item.serial_no}>
            <td>{item.project_code}</td>
            <td>{item.company}</td>
            <td>{item.location}</td>
            <td>{item.type_of_shutter}</td>
            <td>{item.shutter_number}</td>
            <td>{item.opening_width}</td>
            <td>{item.opening_height}</td>
            <td>{item.serial_no}</td>
            <td>
              <ul>
                <li className="w-max inline-block">{item.fab_list_no}</li>
              </ul>
            </td>
            <td>
              <ul>
                <li className=" inline-block">{item.finishing}</li>
              </ul>
            </td>
            <td>
              <ul>
                {sortByOrder(item.components).map((comp, index) => (
                  <li key={index} className="font-bold w-max">
                    {comp.componentImg !== "N" && (
                      <span>
                        {comp.componentName}: {comp.component}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CompletedByUser;
