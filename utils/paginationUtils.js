/**
 * 
 * @param {Array} data
 * @param {number} page
 * @param {number} pageSize
 * @returns {object}
 */
const paginate = (data, page = 1, pageSize = 10) => {
  console.log(data)
  const total = data.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  return {
    page: Number(page),
    total,
    totalPages,
    data: paginatedData,
  };
};

module.exports = { paginate };