const generatePagination = (limit, offset, items) => {
    const paginate = {
      page: Math.ceil(items.count / limit),
      itemCount: items.count,
      currentPage: Math.ceil(offset / limit) + 1,
      limit,
      offset
    };
    return paginate;
  };
  
export default generatePagination;