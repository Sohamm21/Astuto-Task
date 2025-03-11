import { useEffect, useState } from "react";
import { MRT_ColumnDef, MRT_TableState } from "material-react-table";
import ReactTable from "./ReactTable";
import Tooltip from "@mui/material/Tooltip";

import { Person } from "../types/table.types";

enum StatusColor {
  "Working" = "bg-green-300/80",
  "Not working" = "bg-red-300/80",
}

type TableWrapperProps = {
  columns?: MRT_ColumnDef<Person>[];
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
    pagination: { pageSize: 10, pageIndex: 0 }
  },
}: TableWrapperProps) => {
  const [data, setData] = useState<Person[]>([]);

  const columns: MRT_ColumnDef<Person>[] = [
    {
      accessorKey: "name",
      header: "Name",
      size: 400,
      enableResizing: false,
      Cell: ({ row }) => (
        <div className="flex flex-row items-center gap-1">
          <img src={row.original.img_url} className="h-8 w-8 rounded-full" />
          <div className="flex flex-col">
            <div className="text-sm">{row.original.name}</div>
            <div className="text-xs text-gray-500">{row.original.username}</div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "age",
      header: "Age",
      size: 10,
      minSize: 120,
      maxSize: 20,
      enableResizing: false,
    },
    {
      accessorKey: "status",
      header: "Status",
      grow: false,
      enableResizing: false,
      size: 150,
      Cell: ({ row }) => {
        const status = row?.original?.status;
        return (
          <div
            className={`${StatusColor[status]} text-gray-800 px-1.5 py-0.5 rounded-full text-center text-sm`}
          >
            {status}
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      enableResizing: false,
      size: 350,
      filterVariant: "multi-select",
      filterSelectOptions: ["Product Manager", "Developer", "Designer"],
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 350,
      enableResizing: false,
    },
    {
      accessorKey: "teams",
      header: "Teams",
      size: 300,
      enableResizing: false,
      enableSorting: false,
      filterVariant: "multi-select",
      filterSelectOptions: ["Engineering", "Design", "Product", "Marketing"],
      Cell: ({ row }) => {
        const teams = row?.original?.teams || [];
        const visibleTeams = teams.slice(0, 3);
        const hiddenCount = teams.length - visibleTeams.length;
        const hiddenTeams = teams.slice(3);

        return (
          <div className="flex flex-row items-center gap-1">
            {visibleTeams.map((team, index) => {
              const opacity =
                50 + (index / (visibleTeams.length - 1)) * 50 || 100;
              return (
                <div
                  key={team}
                  className="text-xs px-1.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `rgba(102, 179, 255, ${opacity / 100})`,
                  }}
                >
                  {team}
                </div>
              );
            })}
            {hiddenCount > 0 && (
              <Tooltip title={hiddenTeams.join(", ")} arrow>
                <div className="text-xs bg-gray-300 px-1.5 py-0.5 rounded-full">
                  +{hiddenCount}
                </div>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

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
        />
      </div>
    </div>
  );
};

export default TableWrapper;
