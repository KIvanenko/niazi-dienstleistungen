(function () {
  var SECTIONS = ["leistungen", "ueber-uns"];

  function sectionId(href) {
    if (!href) return "";
    var hash = href.split("#")[1] || "";
    return SECTIONS.indexOf(hash) >= 0 ? hash : "";
  }

  function onIndex() {
    var path = window.location.pathname;
    return path === "/" || /\/index\.html$/.test(path);
  }

  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var smoother = window.ScrollSmoother && ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(el, true, "top 110px");
    } else {
      el.scrollIntoView();
    }
    document.body.classList.remove("mobile-menu-visible");
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href]");
    var id = link && sectionId(link.getAttribute("href"));
    if (!id || !onIndex()) return;
    event.preventDefault();
    scrollToSection(id);
  }, true);

  window.addEventListener("load", function () {
    var id = sectionId(window.location.hash);
    if (!id || !onIndex()) return;
    window.setTimeout(function () {
      scrollToSection(id);
      if (window.history && history.replaceState) {
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    }, 700);
  });

  var WHATSAPP = "491754218151";

  document.querySelectorAll("form.niazi-quote").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var data = new FormData(form);
      var lines = [
        "Hallo, ich interessiere mich für ein Angebot.",
        "",
        "Name: " + (data.get("name") || ""),
        "Telefon: " + (data.get("phone") || ""),
        "E-Mail: " + (data.get("email") || ""),
        "Leistung: " + (data.get("service") || ""),
        "Nachricht: " + (data.get("message") || "")
      ];
      var url = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  });
})();
