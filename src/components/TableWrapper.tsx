import { MRT_ColumnDef, MRT_TableState } from "material-react-table";
import React, { useEffect, useState } from "react";
import ReactTable from "./ReactTable";

type Person = {
  name: string;
  username: string;
  age: number;
  status: "working" | "not working";
  role: string;
  email: string;
  teams: string[];
};

const defaultColumns: MRT_ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "role",
    header: "Role",
    filterVariant: "multi-select",
    filterSelectOptions: ["Product Manager", "Developer", "Designer"],
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "teams",
    header: "Teams",
  },
];

type TableWrapperProps = {
  columns?: MRT_ColumnDef<Person>[];
  initialState?: Partial<MRT_TableState<Person>>;
};

const TableWrapper = ({ 
  columns = defaultColumns, 
  initialState = {
    sorting: [
      {
        id: "age",
        desc: true,
      },
    ],
  }
}: TableWrapperProps) => {  
  const [data, setData] = useState<Person[]>([]);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch("https://jsonblob.com/api/1348710819902447616");
      const result = await response.json();
      
      setData(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return <ReactTable columns={columns} data={data} initialState={initialState} />;
};

export default TableWrapper;
