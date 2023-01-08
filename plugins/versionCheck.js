import { compareVersions } from "compare-versions"
import { version } from "/package.json"

export default async ({ $cookies }) => {
	if (process.client && version) {
		let currentVersion = version
		setTimeout(async () => {
			let oldVersion = localStorage.getItem("version")
			if (oldVersion) {
				let update = compareVersions(currentVersion, oldVersion)
				if (update !== 0) {
					await clearData(currentVersion, $cookies)
				}
			} else {
				await localStorage.setItem("version", currentVersion)
				//await clearData(currentVersion, $cookies)
			}
			console.log("Checked version. The latest version is " + currentVersion)
		}, 5000)
	}
}

const clearData = async (currentVersion, $cookies) => {
	//  remove storage ...
	localStorage.clear()
	$cookies.removeAll()
	await localStorage.setItem("version", currentVersion)
	await window.location.reload()
}
