import { flexRender, Table as TableType } from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EraserIcon } from "lucide-react";

interface DataTableProps<TData> {
  table: TableType<TData>;
  dynamicTable?: boolean;
  onRowClick?: (rowId: string) => void;
}

export function DataTable<TData>({ table, onRowClick }: DataTableProps<TData>) {
  if (!table.getRowModel().rows?.length) {
    return (
      <div className={"w-full bg-card gap-5 px-6 py-5 rounded-md border-2"}>
        <div className="h-[70vh] flex flex-col items-center justify-center">
          <EraserIcon />
          <h1 className="text-sm text-muted-foreground pb-4">
            No Records to display
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 h-10 py-2 bg-muted text-sm"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer"
                  onClick={() => {
                    if (onRowClick) {
                      onRowClick((row.original as any).rowId);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      width={cell.column.columnDef.size}
                      className="px-4 py-2 text-sm"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={0} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
