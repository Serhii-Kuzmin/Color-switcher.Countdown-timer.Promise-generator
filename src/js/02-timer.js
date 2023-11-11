// Імпорти
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

// Змінні
let selectedDateTime;
let countdownInterval;

// Функція додавання нуля перед числами < 10
function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}

// Функція форматування об'єкта часу
function updateTimerFields({ days, hours, minutes, seconds }) {
  document.querySelector("[data-days]").textContent = addLeadingZero(days);
  document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
  document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
  document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
}

// Функція підрахунку різниці між датами
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Функція запуску відліку
function startCountdown() {
  clearInterval(countdownInterval);

  if (!selectedDateTime) {
    Notiflix.Notify.warning('Please choose a valid date');
    return;
  }

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeDifference = selectedDateTime.getTime() - now.getTime();

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerFields({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      Notiflix.Notify.info('Countdown completed');
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
      updateTimerFields({ days, hours, minutes, seconds });
    }
  }, 1000);
}

// Ініціалізація flatpickr
flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate > new Date()) {
      selectedDateTime = selectedDate;
      document.querySelector("[data-start]").disabled = false;
      Notiflix.Notify.success('Valid date selected');
    } else {
      document.querySelector("[data-start]").disabled = true;
      Notiflix.Notify.warning('Please choose a date in the future');
    }
  },
});

// Додавання обробників подій
const startButton = document.querySelector("[data-start]");
startButton.addEventListener("click", startCountdown);


