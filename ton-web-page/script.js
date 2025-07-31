 const trainings = [
    {
      title: "Pro Level Training",
      image: "./media/Image 1.jpg",
    },
    {
      title: "Trade on Numbers",
      image: "./media/Image 2.jpg",
    },
    {
      title: "Beginner Trading",
      image: "./media/Image 3.jpg",
    }
  ]

  const container = document.getElementById("training-cards")

  trainings.forEach((training) => {
    const card = document.createElement("div")
    card.className = "col-md-3 mb-4"
    card.innerHTML = `
      <div class="custom-card position-relative text-white overflow-hidden rounded">
        <img src="${training.image}" class="w-100 h-100 object-fit-cover" alt="${training.title}">
        <div class="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3">
          <div>
            <h5 class="fw-bold">${training.title}</h5>
            <p class="mb-1">Training sessions on indices</p>
            <p class="small mb-3">Duration <strong>2 hrs</strong></p>
            <a href="#" class="btn btn-light fw-semibold">Start Session</a>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card)
  })

  const card = document.createElement("div")
    card.className = "col-md-3 mb-4"
    card.innerHTML = `
      <div class="custom-card position-relative text-white overflow-hidden rounded">
        <img src="./media/Image 4.jpg" class="w-100 h-100 object-fit-cover" alt="session">
        <div class="card-overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-3">
          <div class="d-flex justify-content-center">
            <a href="#" class="btn btn-light fw">Start Session</a>
          </div>
        </div>
      </div>
    `;

    container.appendChild(card)