// content.js

const showModal = () => {
  const modalHTML = `
    <div id="evp-modal">
      <div id="evp-modal-content">
        <h2>Remplir le mot de passe</h2>
        <input type="password" id="evp-password-input" placeholder="Entrez votre mot de passe">
        <button id="evp-fill-password-btn">Remplir</button>
      </div>
    </div>
  `;

  $('body').append(modalHTML);

  $('#evp-fill-password-btn').on('click', () => {
    const password = $('#evp-password-input').val();
    chrome.runtime.sendMessage({ action: 'fillPassword', password });
    $('#evp-modal').remove();
  });

  $('#evp-modal').on('click', (event) => {
    if (event.target.id === 'evp-modal') {
      $('#evp-modal').remove();
    }
  });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showModal') {
    showModal();
  }
});