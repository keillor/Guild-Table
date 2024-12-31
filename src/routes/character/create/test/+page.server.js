export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		console.log(formData);

		// Perform validation or other operations
		if (!name || !email) {
			return { error: 'Name and email are required!' };
		}

		// Pass data to the page load
		return { name, email };
	}
};
