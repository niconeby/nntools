(function () {
  const PROD_HOSTS = ["tools.mediaagni.com"];

  if (!PROD_HOSTS.includes(window.location.hostname)) {
    return;
  }

  const GA_ID = "G-GFW4LWZJSG";

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    dataLayer.push(arguments);
  };

  gtag("js", new Date());
  gtag("config", GA_ID);
})();