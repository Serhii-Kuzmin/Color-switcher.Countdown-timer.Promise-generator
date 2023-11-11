function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  };

  let colorChangeInterval;

  document.querySelector('[data-start]').addEventListener('click', startColorChange);
  document.querySelector('[data-stop]').addEventListener('click', stopColorChange);

  function startColorChange() {
    const startButton = document.querySelector('[data-start]');
    const stopButton = document.querySelector('[data-stop]');

    startButton.disabled = true;

    
    colorChangeInterval = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }

  function stopColorChange() {
    const startButton = document.querySelector('[data-start]');
    const stopButton = document.querySelector('[data-stop]');

    
    startButton.disabled = false;

    
    clearInterval(colorChangeInterval);


    document.body.style.backgroundColor = '';
  }
