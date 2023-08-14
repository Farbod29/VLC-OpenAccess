export function getCurrentTab(callback) {
	global.chrome.tabs.query(
		{
			active: true,
			currentWindow: true,
		},
		(tabs) => {
			callback(tabs[0]);
		}
	);
}
