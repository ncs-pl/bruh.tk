const apiURL = "https://api.github.com/repos/n1c00o/bruh.tk/issues"; // Issues endpoint of your repo
const labelID = 2531752619; // ID of the label for links

function redirectToHome() {
	window.location.replace(
		`${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}`
	);
}

async function main() {
	// Get the shortened tag (which correspond to an issue number)
	const tag = window.location.pathname.replace("/", "").split("/")[0];
	const res = await fetch(
		`${apiURL}/${tag}`,
		{
			method: "GET",
			headers: {
				accept: "application/json"
			}
		});

		if (res.status !== 200) return redirectToHome();

		const body = await res.json();

		// Return to home if the issue is not labelled with the wanted label or if the title is not an URL
		if (
			body.labels.filter(
				(label) => label.id === labelID
			).length < 0 ||
			!new RegExp(/(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/).test(body.title)
		) return redirectToHome();

		window.location.replace(body.title);
}

main();
