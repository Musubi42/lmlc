// plugins/axeptio.js

export default ({ app }) => {
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
