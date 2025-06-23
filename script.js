const main = document.querySelector("main");

async function display() {
  // const id = Math.floor(Math.random() * 2000) + 1;
  // const id = 21; // null Episodes
  // const id = 15; // 1 Genre
  // const id = 25; // Desert Punk
  // const id = 54916; // null Type
  // console.log(id);
  try {
    // const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    const response = await fetch("https://api.jikan.moe/v4/random/anime?sfw");
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const genresList = data["data"]["genres"].map((genre) => genre.name);
      const studiosList = data["data"]["studios"].map((studio) => studio.name);
      const producersList = data["data"]["producers"].map(
        (producer) => producer.name
      );

      main.innerHTML = `
            <section class="head">
                <img class="poster" src="${
                  data["data"]["images"]["jpg"]["large_image_url"]
                }" />
                <section class="details">
                    <h1 class="title">${data["data"]["title"]}</h1>
                    ${
                      data["data"]["score"] === null
                        ? ""
                        : `<span class="rating"> <i class="bi bi-star-fill" style="color: #FFD700"></i> ${data["data"]["score"]} </span>`
                    }
                    ${
                      data["data"]["rating"] === null
                        ? ""
                        : `<span class="rating"> ${data["data"]["rating"]}</span>`
                    }
                    <br>
                    ${
                      data["data"]["type"] === null
                        ? ""
                        : `<div class="type">${data["data"]["type"]}</div>`
                    }
                </section>
            </section>
            <section class="body">
            ${
              data["data"]["trailer"]["embed_url"] === null
                ? `<h2 class="heading">Trailer</h2>
                   <div class="empty">
                   <img src="./illustrations/no-video.png">
                   <p>Video Unavailable</p>
                   </div>`
                : `
              <h2 class="heading">Trailer</h2>
              <iframe 
              width="100%" 
              height="350" 
              src="${data["data"]["trailer"]["embed_url"]}" 
              title="YouTube video player" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerpolicy="strict-origin-when-cross-origin" 
              allowfullscreen></iframe>`
            }
              <h2 class="heading">More Details</h2>
              <dl>
                  ${
                    data["data"]["synopsis"] === null
                      ? ""
                      : `<div class="description synopsis-section">
                          <dt class="label">Synopsis</dt>
                          <dd class="synopsis">${data["data"]["synopsis"]}</dd>
                         </div>`
                  }
                  ${
                    genresList.length === 0
                    ? ""
                    : genresList.length > 1
                    ? `<div class="description">
                        <dt class="label">Genres</dt>
                        <dd>${genresList.join(", ")}</dd>
                       </div>`
                    : `<div class="description">
                        <dt class="label">Genre</dt>
                        <dd>${genresList[0]}</dd>
                       </div>`
                  }
                  ${
                    studiosList.length === 0
                      ? ""
                      : studiosList.length > 1
                      ? `<div class="description"><dt class="label">Studios</dt>
                         <dd>${studiosList.join(", ")}</dd></div>`
                      : `<div class="description">
                          <dt class="label">Studio</dt>
                          <dd>${studiosList[0]}</dd>
                         </div>`
                  }
                  ${
                    producersList.length === 0
                      ? ""
                      : producersList.length > 1
                      ? `<div class="description">
                          <dt class="label">Producers</dt>
                          <dd>${producersList.join(", ")}</dd>
                         </div>`
                      : `<div class="description">
                          <dt class="label">Producer</dt>
                          <dd>${producersList[0]}</dd>
                         </div>`
                  }
                  ${
                    data["data"]["year"] === null
                    ? ""
                    : `<div class="description">
                        <dt class="label">Year</dt>
                        <dd>${data["data"]["year"]}</dd>
                      </div>`
                  }
                  ${
                    data["data"]["aired"] === null
                      ? ""
                      : `<div class="description">
                          <dt class="label">Aired</dt>
                          <dd>${data["data"]["aired"]["string"]}</dd>
                         </div>`
                  }
                  ${
                    data["data"]["episodes"] === null
                    ? ""
                    : data["data"]["episodes"] > 1
                    ? `<div class="description">
                        <dt class="label">Episodes</dt>
                        <dd>${data["data"]["episodes"]}</dd>
                      </div>`
                    : `<div class="description">
                        <dt class="label">Episode</dt>
                        <dd>${data["data"]["episodes"]}</dd>
                       </div>`
                  }
                  ${
                    data["data"]["duration"] === null
                      ? ""
                      : `<div class="description">
                          <dt class="label">Duration</dt>
                          <dd>${data["data"]["duration"]}</dd>
                         </div>`
                  }
              </dl>
            </section>
            `;
    } else {
      main.textContent = "Something went wrong";
      main.style.color = "red";
    }
  } catch (error) {
    console.error(error);
  }
}

display();
