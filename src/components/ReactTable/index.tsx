/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_ColumnDef,
} from "material-react-table";

type ReactTableProps<T extends Record<string, any>> = {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  initialState?: Partial<any>;
  enableRowSelection?: boolean;
  positionToolbarAlertBanner?: "bottom" | "top" | "none";
};

const ReactTable = <T extends Record<string, any>>({
  columns = [],
  data = [],
  initialState,
  enableRowSelection = false,
  positionToolbarAlertBanner = "none",
}: ReactTableProps<T>) => {
  const table = useMaterialReactTable<T>({
    data,
    columns,
    initialState,
    enableRowSelection,
    positionToolbarAlertBanner,
    enableTopToolbar: false,
    enableFilterMatchHighlighting: false,
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: false,
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
  });

  return <MaterialReactTable table={table} />;
};

export default ReactTable;
