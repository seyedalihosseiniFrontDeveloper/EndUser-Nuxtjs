export default $ => ({
	sendDataForStartTransaction: data => $.post(`api/Transaction`, data),
	getDataStepProcess: id => $.get(`api/TransactionType/${id}`),
	sendNewSide: data => $.post("api/Side/AddSide", data),
	getSideByType: (transactionId, sideType) => $.get(`api/Side/${transactionId}?SideType=${sideType}`),
	deleteSide: id => $.delete(`api/Side/${id}`),
	editSide: data => $.put(`api/Side/EditSide`, data),
	getTransactionParameters: id => $.get(`api/Transaction/TransactionParameters?transactionId=${id}`),
	postSetTransactionText: data => $.put(`api/Transaction/EditTransactionText`, data),
	getCurrentTransaction: id => $.get(`api/Transaction/CurrentTransaction?id=${id}`),
	getDataSide: (transactionId, params) => $.get(`api/Side/${transactionId}`, { params }),
})
