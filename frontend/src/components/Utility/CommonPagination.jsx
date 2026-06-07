import { Pagination, PaginationItem } from "@mui/material";

export default function CommonPagination({
  currentPage,
  setCurrentPage,
  totalItems,
  itemsPerPage = 12,
  itemLabel = "results",
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between w-full">
      <p className="text-sm text-gray-500 dark:text-gray-400 px-1">
        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
        {itemLabel}
      </p>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, value) => setCurrentPage(value)}
        siblingCount={1}
        boundaryCount={1}
        shape="rounded"
        renderItem={(item) => {
          const isAdjacent =
            item.page === currentPage - 1 || item.page === currentPage + 1;

          return (
            <PaginationItem
              {...item}
              sx={{
                ...(isAdjacent &&
                  !item.selected && {
                    backgroundColor: "#ccfbf1",
                    color: "#0f766e",
                    borderColor: "#99f6e4",
                  }),
              }}
            />
          );
        }}
        sx={{
          "& ul": { gap: 0 },
          "& li": { margin: 0 },

          "& .MuiPaginationItem-root": {
            minWidth: "42px",
            height: "42px",
            margin: 0,
            borderRadius: 0,
            fontWeight: 600,
            border: "1px solid #d1d5db",
            backgroundColor: "#ffffff",
            color: "#475569",
          },

          "& .MuiPaginationItem-root:hover": {
            backgroundColor: "#ccfbf1",
          },

          "& .Mui-selected": {
            backgroundColor: "#98f7e5 !important",
            color: "#14b8a6 !important",
            borderColor: "#14b8a6 !important",
          },

          ".dark & .Mui-selected": {
            backgroundColor: "#14b8a6 !important",
            color: "#ffffff !important",
            borderColor: "#98f7e5 !important",
          },

          "& .MuiPaginationItem-ellipsis": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "42px",
            height: "42px",
            lineHeight: 1,
            paddingBottom: "2px",
            borderRadius: 0,
            border: "1px solid #d1d5db",
            backgroundColor: "#ffffff",
            color: "#64748b",
            fontWeight: 700,
          },

          "& .MuiPaginationItem-previousNext": {
            borderRadius: "12px",
          },

          "& .MuiPaginationItem-previousNext:first-of-type": {
            marginRight: "4px",
          },

          "& .MuiPaginationItem-previousNext:last-of-type": {
            marginLeft: "4px",
          },



          "& li:nth-child(2) .MuiPaginationItem-page": {
            borderTopLeftRadius: "12px",
            borderBottomLeftRadius: "12px",
          },

          "& li:nth-last-child(2) .MuiPaginationItem-page": {
            borderTopRightRadius: "12px",
            borderBottomRightRadius: "12px",
          },

          ".dark & .MuiPaginationItem-root": {
            backgroundColor: "#111827",
            color: "#e5e7eb",
            border: "1px solid #374151",
          },

          ".dark & .MuiPaginationItem-root:hover": {
            backgroundColor: "#1f2937",
          },

          ".dark & .MuiPaginationItem-ellipsis": {
            backgroundColor: "#111827",
            color: "#94a3b8",
            border: "1px solid #374151",
          },
        }}
      />
    </div>
  );
}
