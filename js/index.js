// Navigate to blog page
document.getElementById("discover-btn").addEventListener("click", function () {
    window.location.href = "blog.html";
});

// Button
const buttons = document.querySelectorAll("#complete-btn");

// Update date in header when page loads

function updateDateAndTaskOnHand() {
    let date = new Date();

    let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = daysOfWeek[date.getDay()];
    let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    let month = months[date.getMonth()];
    let dateNum = date.getDate();
    let year = date.getFullYear();
    let dateStr = `${month} ${dateNum} ${year}`;
    document.getElementById("days-of-week").innerText = day;
    document.getElementById("todays-date").innerText = dateStr;

    document.getElementById("task-on-hand").innerText = buttons.length;
}

// Update background color when click theme change btn

document.getElementById("theme-btn").addEventListener("click", function () {
    let colors = [
        "bg-slate-200",
        "bg-blue-300",
        "bg-red-400",
        "bg-green-500",
        "bg-purple-600",
        "bg-yellow-700",
        "bg-amber-800",
        "bg-orange-900",
    ];
    let body = document.querySelector("body");

    let currentClass = body.className.split(" ")[1];

    let currentColorIndex = colors.indexOf(currentClass);

    let nextColorIndex = currentColorIndex + 1;
    if (nextColorIndex >= colors.length) {
        nextColorIndex = 0;
    }
    let nextColor = colors[nextColorIndex];

    body.classList.remove(currentClass);
    body.classList.add(nextColor);
});

// Update task assigned and completed when click on "complete" btn

function getCurrentTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    const time = `${hours}:${minutes}:${seconds} ${period}`;
    return time;
}

for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.addEventListener("click", function () {
        const taskOnHandConverted = parseInt(
            document.getElementById("task-on-hand").innerText
        );
        const taskCompletedConverted = parseInt(
            document.getElementById("task-completed").innerText
        );

        document.getElementById("task-on-hand").innerText =
            taskOnHandConverted - 1;
        document.getElementById("task-completed").innerText =
            taskCompletedConverted + 1;

        button.disabled = true;
        button.classList.add("cursor-not-allowed");
        button.classList.add("bg-gray-400");
        button.classList.remove("hover:bg-[#1F38D3]");

        // Add activity log
        const parentOfActivity = document.getElementById("activity-log");
        const newActivity = document.createElement("div");
        newActivity.classList.add(
            "bg-[#e7edfc]",
            "p-3",
            "text-xs",
            "rounded-xl",
            "font-semibold"
        );

        // Get the task title
        const title =
            button.parentElement.parentElement.querySelector(
                "#task-title"
            ).innerText;

        newActivity.innerText = `You have Completed The Task ${title} at ${getCurrentTime()} .`;
        parentOfActivity.appendChild(newActivity);

        alert("Board updated successfully!");

        // if all tasks are completed
        if (taskOnHandConverted - 1 === 0) {
            alert("Congrats! You have completed all the current tasks.");
        }
    });
}

// Clear history button

function clearHistory() {
    const parentOfActivity = document.getElementById("activity-log");
    parentOfActivity.innerHTML = "";
}
