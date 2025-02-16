"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
} from "@tanstack/react-table";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Loader2, MoreVertical } from "lucide-react";
import { ShareButton } from "@/components/share-button";
import { Button } from "@/components/ui/button";
import { useGetPolls } from "@/actions/polls";
import { DataTable } from "@/components/molecules/data-table";
import Link from "next/link";

export const PollsListing = () => {
  const { data, isLoading } = useGetPolls();

  const columns: ColumnDef<any>[] = [
    {
      id: "question",
      accessorKey: "question",
      header: "Question",
      cell: ({ row }) => (
        <div className="text-primary">{row.getValue("question")}</div>
      ),
      size: 100,
    },
    {
      id: "status",
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          variant={row.original.status === "active" ? "default" : "secondary"}
        >
          active
        </Badge>
      ),
      size: 100,
    },
    {
      id: "votes",
      accessorKey: "votes",
      header: "Votes",
      cell: ({ row }) => {
        const options: any = row.original.options || [];

        const count = options.reduce((acc: any, option: any) => {
          return acc + option.votes;
        }, 0);

        return <span>{count}</span>;
      },
      size: 100,
    },
    {
      id: "action",
      header: "Share",
      cell: ({ row }) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ShareButton pollId={row.original._id} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy share link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ),
      size: 100,
    },
    {
      id: "delete",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/vote/${row.original._id}`}>Vote</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/results/${row.original._id}`}>View Results</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      size: 100,
    },
  ];

  const table = useReactTable({
    data: data?.polls || [],
    columns: columns,

    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <Loader2 className="animate-spin text-3xl" />
      </div>
    );
  }

  return <DataTable table={table} />;
};
