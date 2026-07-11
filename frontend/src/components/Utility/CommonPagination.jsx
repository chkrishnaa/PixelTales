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
    <div className="mt-8 flex w-full flex-col items-center gap-4 xs:gap-5 md:flex-row md:items-center md:justify-between">
      {" "}
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 md:text-left">
        {" "}
        Showing{" "}
        <span className="font-semibold text-turquoise-600 dark:text-turquoise-400">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold text-turquoise-600 dark:text-turquoise-400">
          {Math.min(currentPage * itemsPerPage, totalItems)}
        </span>{" "}
        of <span className="font-semibold">{totalItems}</span> {itemLabel}
      </p>
      <div className="flex w-full justify-center overflow-x-auto md:w-auto md:justify-end">
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
              minWidth: { xs: 34, sm: 38, md: 42 },
              height: { xs: 34, sm: 38, md: 42 },
              fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
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
              minWidth: { xs: 34, sm: 38, md: 42 },
              height: { xs: 34, sm: 38, md: 42 },
              // fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
              lineHeight: 1,
              paddingBottom: "2px",
              borderRadius: 0,
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              color: "#64748b",
              fontWeight: 700,
            },

            "& .MuiPaginationItem-previousNext": {
              borderRadius: { xs: "10px", md: "12px" },
            },

            "& .MuiPaginationItem-previousNext:first-of-type": {
              marginRight: "4px",
            },

            "& .MuiPaginationItem-previousNext:last-of-type": {
              marginLeft: "4px",
            },

            "& li:nth-child(2) .MuiPaginationItem-page": {
              borderTopLeftRadius: { xs: "10px", md: "12px" },
              borderBottomLeftRadius: { xs: "10px", md: "12px" },
            },

            "& li:nth-last-child(2) .MuiPaginationItem-page": {
              borderTopRightRadius: { xs: "10px", md: "12px" },
              borderBottomRightRadius: { xs: "10px", md: "12px" },
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
    </div>
  );
}
