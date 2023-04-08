// Fonction qui envoie un message à l'onglet actif pour remplir le mot de passe
const fillPassword = () => {
  // Récupère la valeur du champ de mot de passe
  const password = document.getElementById("password_input").value;

  // Envoie un message à l'onglet actif pour remplir le mot de passe
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "fill_password", password: password });
  });

  // Ferme la fenêtre modale
  window.close();
};

// Ajoute un écouteur d'événements au bouton "Remplir"
document.getElementById("fill_button").addEventListener("click", fillPassword);
