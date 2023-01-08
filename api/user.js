export default ($) => ({
  get: (id) => $.get(`api/Employee/${id}`),
  getAll: (params) => $.get("api/Employee", { params }),
  store: (data) => $.post("api/Employee", data),
  destroy: (id) => $.delete(`api/Employee?employeeId=${id}`),
  update: (data) => $.put("api/Employee", data),
});
