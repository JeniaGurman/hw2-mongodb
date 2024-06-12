export const calculatePaginationData = (count, perPage, page) => {
    const totalPages = Math.cell(count / perPage);
    const hasNextPage = Boolean(totalPages - page);
    const hasPreviousPage = page !== 1;
    return {
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasNextPage,
        hasPreviousPage,
    };
};
