function darkModeToggle(isDarkMode) {
    document.getElementById("theme").href = isDarkMode ? "assets/darkly.bootstrap.min.css" : "assets/original.bootstrap.min.css";
    if (isDarkMode) {
        $(".no-thead-dark")
            .removeClass("no-thead-dark")
            .addClass("thead-dark");
        $(".no-table-dark")
            .removeClass("no-table-dark")
            .addClass("table-dark");
    } else {
        $(".thead-dark")
            .removeClass("thead-dark")
            .addClass("no-thead-dark");
        $(".table-dark")
            .removeClass("table-dark")
            .addClass("no-table-dark");
    }
}

$(".darkmode").click(function () {
    $("body").toggleClass("dark");
    const isDarkMode = $("body").hasClass("dark");
    darkModeToggle(isDarkMode);
    localStorage.setItem("dark-mode", isDarkMode);
});

// on document load, check if dark mode is set and apply it
addEventListener("load", (event) => {
    console.log("page is fully loaded");
    const isDarkMode = localStorage.getItem("dark-mode") === "true";
    if (isDarkMode) $("body").addClass("dark");
    darkModeToggle(isDarkMode);
});