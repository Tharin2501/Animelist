type PaginationType = {
    postsPerPage: number;
    totalPosts: number;
    // function with named prop as type number
    paginate: (pageNumber: number) => void;
};

export default PaginationType;