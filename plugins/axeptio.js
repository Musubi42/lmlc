// plugins/axeptio.js

export default ({ app }) => {
  // Faire un timeout pour attendre que l'animation du début soit terminée
  // Check si c'est la première visite, si oui attendre l'animation
  // Si non, c'est qu'il n'y a plus d'animation d'intro et on peut lancer Axeptio direct
  
  // Check if we're running on client-side
  if (process.client) {
    window.axeptioSettings = {
      clientId: "65bd5e34454ae068c48164f9", // Replace with your client ID
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = "//static.axept.io/sdk.js";
    document.head.appendChild(script);
  }
};
