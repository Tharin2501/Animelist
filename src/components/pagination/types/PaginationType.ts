type PaginationType = {
    postsPerPage: number;
    totalPosts: number;
    currentPage: number;
    // function with named prop as type number
    paginate: (pageNumber: number) => void;
};

export default PaginationType;