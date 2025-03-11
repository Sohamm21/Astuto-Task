import { MRT_ColumnDef } from "material-react-table";
import Tooltip from "@mui/material/Tooltip";

import { Person } from "../../types/table.types";

enum StatusColor {
  "Working" = "bg-green-300/80",
  "Not working" = "bg-red-300/80",
}

export const columns: MRT_ColumnDef<Person>[] = [
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