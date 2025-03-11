import { useEffect, useState } from "react";
import { MRT_TableState } from "material-react-table";
import ReactTable from "../ReactTable";

import { Person } from "../../types/table.types";
import { columns } from "./columns";

type TableWrapperProps = {
  initialState?: Partial<MRT_TableState<Person>>;
};

const TableWrapper = ({
  initialState = {
    sorting: [
      {
        id: "age",
        desc: true,
      },
    ],
    pagination: { pageSize: 10, pageIndex: 0 },
  },
}: TableWrapperProps) => {
  const [data, setData] = useState<Person[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch(
        "https://jsonblob.com/api/1348710819902447616"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="w-full sm:px-10 px-2">
        <ReactTable
          columns={columns}
          data={data}
          initialState={initialState}
          enableRowSelection
          enableColumnResizing
          muiPaginationProps={{
            shape: "rounded",
            showRowsPerPage: false,
            showFirstButton: false,
            showLastButton: false,
            className: "custom-bottom-toolbar",
          }}
          paginationDisplayMode="pages"
        />
      </div>
    </div>
  );
};

export default TableWrapper;
