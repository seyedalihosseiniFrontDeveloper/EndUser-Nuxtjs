export default $ => ({
	loginWithActivationCode: data => $.post(`api/Identity/ResendActivationCode`, data),
	login: data => $.post(`api/Identity/Login`, data),
})
