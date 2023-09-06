import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_IaUyPDc2cPm2YUBgWdzuGo18tqSgJPnHAhCxA6C52fhTmUZubFvylcQnIJp2u0J4";
const selectors = {
    select: document.querySelector(".js-breed-select"),
    cat_info: document.querySelector(".js-cat-info"),
    loader: document.querySelector(".js-loader"),
    error: document.querySelector(".js-error")
}
const defaults = {
    img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fpremium-vector%2Fdefault-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_33011701.htm&psig=AOvVaw2Ca8PIAV9GJMIORt3ZIb0V&ust=1694042426079000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLCGqvrNlIEDFQAAAAAdAAAAABAE",
    cat_name: "name not found",
    cat_desc: "description not found",
    cat_temp: "temperament not found"
}
selectors.select.addEventListener("change", optionValue)

function optionValue(evt) {
    fetchCatByBreed(evt.target.value)
    selectors.loader.classList.replace("loader-hiden", "loader")
    selectors.cat_info.classList.replace("cat-info", "cat-info-load")
}

function fetchBreeds() {
axios.get('https://api.thecatapi.com/v1/breeds')
    .then(function ({ data }) {
        selectors.select.insertAdjacentHTML("beforeend", createOptionMarkup(data))
        selectors.select.classList.replace("breed-select-load", "breed-select")
        selectors.loader.classList.replace("loader", "loader-hiden")
  })
  .catch(function (error) {
      selectors.error.classList.replace("error-false", "error")
      selectors.loader.classList.replace("loader", "loader-hiden")
  })
}

function createOptionMarkup(arr) {
    return arr
        .map(
            ({ id, name }) => `<option value="${id}">${name}</option>`
        ).join("")
}

function fetchCatByBreed(breedId) {
    axios.get('https://api.thecatapi.com/v1/images/search', {
    params: {
        breed_ids: breedId
    }
  })
        .then(function ({ data }) {
            selectors.cat_info.innerHTML = createMainMarkup(data)
            selectors.loader.classList.replace("loader", "loader-hiden")
            selectors.cat_info.classList.replace("cat-info-load", "cat-info")
  })
  .catch(function (error) {
    selectors.error.classList.replace("error-false", "error")
      selectors.loader.classList.replace("loader", "loader-hiden")
      selectors.select.classList.replace("breed-select", "breed-select-load")
  })
}
function createMainMarkup(arr) {
    return arr.map(({ url, breeds: [{ name, description, temperament }] }) => 
      `<img src="${url || defaults.img}" alt="${name || defaults.cat_name}" class="cat-img" width = 200px>
      <div class = container>
      <h2 class = "cat-name">${name || defaults.cat_name}</h2>
      <p class="cat-desc">${description || defaults.cat_desc}</p>
      <p class="cat-temp"><b>Temperament:</b> ${temperament}</p>
      </div>`  
    ).join("")
}
export {fetchBreeds,fetchCatByBreed};