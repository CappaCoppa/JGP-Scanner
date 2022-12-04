const fulldate = new Date();

const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const currentHoursInSeconds = fulldate.getHours() * 3600;
const currentMinutesInSeconds = fulldate.getMinutes() * 60;

export const currentTimeInSeconds = () =>
    currentHoursInSeconds + currentMinutesInSeconds + fulldate.getSeconds();

export const currentDate = () =>
    `${fulldate.getDate().toString().padStart(2, "0")}-${(
        fulldate.getMonth() + 1
    )
        .toString()
        .padStart(2, "0")}-${fulldate.getFullYear()}`;

export const currentTime = () =>
    `${fulldate.getHours().toString().padStart(2, 0)}:${fulldate
        .getMinutes()
        .toString()
        .padStart(2, 0)}:${fulldate.getSeconds().toString().padStart(2, 0)}`;

export const currentDay = weekday[fulldate.getDay()];

export const currentShift = () => {
    if (currentTimeInSeconds() > 20700 && currentTimeInSeconds() < 63900)
        return "Day";
    else if (currentTimeInSeconds() > 63900 || currentTimeInSeconds() < 20700)
        return "Night";
};

export const currentShiftDate = () => {
    if (currentTimeInSeconds() < 20700)
        return `${(fulldate.getDate() - 1).toString().padStart(2, "0")}-${(
            fulldate.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${fulldate.getFullYear()}`;
    else
        return `${fulldate.getDate().toString().padStart(2, "0")}-${(
            fulldate.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${fulldate.getFullYear()}`;
};
