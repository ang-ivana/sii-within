const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.page-section');

navItems.forEach(item => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    //Removing the active classes
    navItems.forEach(nav => nav.classList.remove("active"));
    sections.forEach(sec => sec.classList.remove("js-page-section"));
    this.classList.add("active");
    const text = this.textContent.trim();
    switch (text) {
      case "Home":
        document.getElementById("home").classList.add("js-page-section");
        break;

      case "Activities":
        document.getElementById("activities").classList.add("js-page-section");
        break;

      case "Statistics":
        document.getElementById("statistics").classList.add("js-page-section");
        break;
      case "Profile":
        document.getElementById("profile").classList.add("js-page-section");
        break;

      default:
        document.getElementById("home").classList.add("js-page-section");
    }
  })
})
