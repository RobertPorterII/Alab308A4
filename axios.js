// set default headers
axios.defaults.headers.common['x-api-key'] = API_KEY;

async function axiosHandleBreedSelect() {
    console.log(breedSelect.value);

    const res = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedSelect.value}`)
  
    // parsed json data
    const breedsData = res.data;
    console.log(breedsData);
  
    // clear the carousel if it has any images
    if (document.getElementById("carouselInner").firstChild) {
      Carousel.clear();
    }
  
    // create and append images to carousel
    breedsData.forEach((item) => {
      const element = Carousel.createCarouselItem(
        item.url,
        item.breeds[0].name,
        item.id,
      );
      Carousel.appendCarousel(element);
    });
  
    // check if there is a child element on the infoDump div
    if (infoDump.firstChild) {
      infoDump.firstChild.remove();
    }
  
    //TODO: be more creative
    // create a new element for the info
    const p = document.createElement("p");
    p.textContent = breedsData[0].breeds[0].description;
    infoDump.appendChild(p);
  
    // TODO
    Carousel.start()
  }