/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";

import "./index.css";

type ReactTableProps<T extends Record<string, any>> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  initialState?: Partial<any>;
  enableRowSelection?: boolean;
  positionToolbarAlertBanner?: "bottom" | "top" | "none";
  enableColumnActions?: boolean;
};

const ReactTable = <T extends Record<string, any>>({
  columns = [],
  data = [],
  initialState,
  enableRowSelection = false,
  positionToolbarAlertBanner = "none",
  enableColumnActions = false,
}: ReactTableProps<T>) => {
  const table = useMaterialReactTable<T>({
    data,
    columns,
    initialState,
    enableRowSelection,
    positionToolbarAlertBanner,
    enableTopToolbar: false,
    enableFilterMatchHighlighting: false,
    enableColumnResizing: true,
    columnFilterDisplayMode: 'popover',
    muiPaginationProps: {
      shape: 'rounded',
      showRowsPerPage: false,
      showFirstButton: false,
      showLastButton: false,
      className: 'custom-bottom-toolbar',
    },
    muiTableContainerProps:{ sx: { minHeight: '700px' } },
    paginationDisplayMode: 'pages',
    enableColumnActions,
  });

  return <MaterialReactTable table={table} />;
};

export default ReactTable;
