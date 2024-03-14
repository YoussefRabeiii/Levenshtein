const levenshtein = (a, b) => {
	if (a.length === 0) return b.length;
	if (b.length === 0) return a.length;

	const matrix = [];

	for (let i = 0; i <= b.length; i++) {
		matrix[i] = [i];
	}

	for (let j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}

	for (let i = 1; i <= b.length; i++) {
		for (let j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) === a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1,
					matrix[i][j - 1] + 1,
					matrix[i - 1][j] + 1
				);
			}
		}
	}

	return matrix[b.length][a.length];
};

const handleSubmit = () => {
	const string1 = document.getElementById("input1").value;
	const string2 = document.getElementById("input2").value;

	const distance = levenshtein(string1, string2);

	const results = document.getElementById("results");

	const result = document.createElement("p");
	result.innerHTML = `The distance between <strong>${string1}</strong> and  <strong>${string2}</strong> is  <strong>${distance}</strong>`;

	string1 && string2 && results.appendChild(result);

	document.getElementById("input1").value = "";
	document.getElementById("input2").value = "";
};

const clearForm = () => {
	const results = document.getElementById("results");

	results.innerHTML = "";
};
