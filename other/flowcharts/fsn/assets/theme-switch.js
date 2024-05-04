/* https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript */
/* https://ultimatecourses.com/blog/detecting-dark-mode-in-javascript */
/* https://github.com/vinorodrigues/bootstrap-dark-5/blob/main/docs/bootstrap-night.md */
/* https://vinorodrigues.github.io/bootstrap-dark-5/ */

// !!! requires fontawesome 5/6 !!!

const lightIconElementId = 'light-toggled';
const darkIconElementId = 'dark-toggled';
const darkmodeToggleContainerElementId = 'darkmode-toggle-container';
const darkmodeToggleElementId = 'darkmode-toggle';
const lightModeName = 'light';
const darkModeName = 'dark';
const darkModeThemeStorageKey = 'dark-mode';

// Set the dark mode preference
function setDarkMode(isDarkMode) {
	document.body.dataset.bsTheme = isDarkMode ? darkModeName : lightModeName; // Bootstrap 5 ligh dark mode switch
	localStorage.setItem(darkModeThemeStorageKey, isDarkMode); // Store the dark mode preference in local storage
	if (typeof changeDarkMode === 'function') changeDarkMode(isDarkMode); // Call the changeDarkMode function if it exists
}

// Check if the dark mode preference is set to true
function isDarkMode() {
	if (localStorage.getItem(darkModeThemeStorageKey)) return localStorage.getItem(darkModeThemeStorageKey) == 'true'; // Return the dark mode preference from local storage
	return (window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${darkModeName})`).matches); // Check if the user prefers dark mode
}

// Toggle the dark mode preference
function toggleDarkMode() {
	setDarkMode(!isDarkMode());
}

document.addEventListener('DOMContentLoaded', () => {
	{
		// Create a style element
		const styleElement = document.createElement('style');
		// Define the CSS rules
		const cssRules = `
			html {
				color-scheme: light dark;
			}
			#${darkmodeToggleContainerElementId} {
				position: fixed;
				top: 2px;
				right: 10px;
				z-index: 9999;
			}
			#${darkmodeToggleElementId} {
				display: inline-block;
				cursor: pointer;
			}
			body[data-bs-theme='${darkModeName}'] #${lightIconElementId},
			body:not([data-bs-theme='${darkModeName}']) #${darkIconElementId} {
				display: none;
			}
			#${lightIconElementId} {
                color: #ffea3d;
                text-shadow: 0 0 3px #B90000D4, 0 0 3px #ffffffff
            }
            #${darkIconElementId} {
                color: #eeeeee;
                text-shadow: 0 0 3px #FFE8E8, 0 0 3px #000000ff;
            }
		`;
		// Set the CSS rules for the style element
		styleElement.innerHTML = cssRules;
		// Append the style element to the head of the document
		document.head.appendChild(styleElement);
	}

	{
		// Create container element
		const containerElement = document.createElement('div');
		containerElement.id = darkmodeToggleContainerElementId;
		// Create toggle element
		const toggleElement = document.createElement('div');
		toggleElement.id = darkmodeToggleElementId;
		// Create light icon element
		const lightIconElement = document.createElement('div');
		lightIconElement.id = lightIconElementId;
		lightIconElement.className = 'fa-solid fa-sun';
		// Create dark icon element
		const darkIconElement = document.createElement('div');
		darkIconElement.id = darkIconElementId;
		darkIconElement.className = 'fa-regular fa-moon';
		// Append elements to form the structure
		toggleElement.appendChild(lightIconElement);
		toggleElement.appendChild(darkIconElement);
		containerElement.appendChild(toggleElement);
		// Append the container element to the body
		document.body.appendChild(containerElement);
	}

	// Listen for clicks on the toggle
	document.getElementById(darkmodeToggleElementId).addEventListener('click', () => toggleDarkMode());

	// Set the initial dark mode preference
	setDarkMode(isDarkMode());

	// Listen for changes in the user's preference
	if (window.matchMedia) {
		window.matchMedia(`(prefers-color-scheme: ${darkModeName})`).addEventListener('change', event => {
			const isDarkMode = event.matches;
			setDarkMode(isDarkMode);
		});
	}
});