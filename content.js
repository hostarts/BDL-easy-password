const enterPassword = (password) => {
  const isCAPEnabled = () => {
    const buttons = Array.from(document.querySelectorAll('button.keypad-key'));
    return buttons.some((button) => button.textContent === 'Y');
  };

  const clickOn = (char) => {
    const buttons = Array.from(document.querySelectorAll('button.keypad-key'));
    const button = buttons.find((button) => button.textContent === char);
    button.click();
  };

  password.split('').forEach((char) => {
    const uppercase = /[A-Z]/.test(char);

    if ((uppercase && !isCAPEnabled()) || (!uppercase && isCAPEnabled())) {
      clickOn('Shift');
    }

    clickOn(char);
  });
};

// Ecoute les messages provenant de la popup
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "fill_password") {
    enterPassword(request.password);
  }
  sendResponse();
});
