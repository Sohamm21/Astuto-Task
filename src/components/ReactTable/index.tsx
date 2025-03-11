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
  enableColumnResizing?: boolean;
  columnFilterDisplayMode?: 'popover' | 'custom' | 'subheader';
  muiPaginationProps?: any;
  paginationDisplayMode?: 'custom' | 'pages' | 'default';
};

const ReactTable = <T extends Record<string, any>>({
  columns = [],
  data = [],
  initialState,
  enableRowSelection = false,
  positionToolbarAlertBanner = "none",
  enableColumnActions = false,
  enableColumnResizing = false,
  columnFilterDisplayMode = 'popover',
  muiPaginationProps,
  paginationDisplayMode = 'pages',
}: ReactTableProps<T>) => {
  const table = useMaterialReactTable<T>({
    data,
    columns,
    initialState,
    enableRowSelection,
    positionToolbarAlertBanner,
    enableTopToolbar: false,
    enableFilterMatchHighlighting: false,
    enableColumnResizing,
    columnFilterDisplayMode,
    muiPaginationProps,
    muiTableContainerProps:{ sx: { minHeight: '700px' } },
    paginationDisplayMode,
    enableColumnActions,
  });

  return <MaterialReactTable table={table} />;
};

export default ReactTable;
