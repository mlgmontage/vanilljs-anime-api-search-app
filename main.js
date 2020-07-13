let pageNumber = 1;
const API_URL = "https://api.jikan.moe/v3/search/";

const form = document.querySelector("form");
const section = document.querySelector("#section");
const load_more = document.querySelector("#load_more");

const showEntries = (entries, reset = true) => {
  if (reset) {
    section.innerHTML = "";
  }

  entries.map((entry) => {
    let card = document.createElement("div");
    card.classList.add("col-md-4");
    console.log(entry.title);

    card.innerHTML = `
      <div class="card mb-4 shadow-sm">
        <div class="mb-2">
          <img
            src="${entry.image_url}"
            style="width: 100%;"
            alt=""
            class="card-img"
          />
          </div>
            <div class="card-body">
              <h5 class="card-title"><a href="${entry.url}">${entry.title}</a></h5>
                <p class="card-text">
                  ${entry.synopsis}
                </p>
              <div
                class="d-flex justify-content-between align-items-center"
              ></div>
            </div>
        </div>
      </div> 
    `;

    section.appendChild(card);
  });
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const term = formData.get("term");
  const type = formData.get("type");
  console.log(term, type);

  const response = await fetch(
    `${API_URL}${type}?q=${term}&page=${pageNumber}`
  );
  const data = await response.json();

  showEntries(data.results);
});

load_more.addEventListener("click", async (event) => {
  pageNumber += 1;

  const formData = new FormData(form);
  const term = formData.get("term");
  const type = formData.get("type");

  const response = await fetch(
    `${API_URL}${type}?q=${term}&page=${pageNumber}`
  );
  const data = await response.json();

  showEntries(data.results, false);
});
