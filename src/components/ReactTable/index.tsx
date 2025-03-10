/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

type ReactTableProps = {
  columns: any;
  data: any;
  initialState?: any;
};

const ReactTable = ({ columns, data, initialState }: ReactTableProps) => {    
  const table = useMaterialReactTable({
    data,
    columns,
    initialState
  });

  return <MaterialReactTable table={table} />;
};

ReactTable.defaultProps = {
  columns: [],
  data: [],
};

export default ReactTable;
