var queryParams = {
    product_type: undefined,
    product_category: undefined,
    product_tags: undefined,
    brand: undefined,
    price_greater_than: undefined,
    price_less_than: undefined,
    rating_greater_than: undefined,
    rating_less_than: undefined,
  };
  
  //Fetching API
  async function api() {
    var url = new URL("https://makeup-api.herokuapp.com/api/v1/products.json");
    prodListDiv.innerHTML="";
    try {
      Object.keys(queryParams)
        .filter((key) => queryParams[key] != undefined)
        .forEach((key) => url.searchParams.append(key, queryParams[key]));
        
      var res = await fetch(url);
      var jsonObj = await res.json();
      console.log(jsonObj);
  
      jsonObj.forEach(obj=>{
        var prodCard = objectToCard(obj);
        prodListDiv.append(prodCard);
      });
  
    } catch {
      alert("Error fetching data");
    }
  }
  
  
  function objectToCard(obj) {
    var prodImage = document.createElement("img");
    prodImage.classList.add("prod-img");
    prodImage.src = obj.image_link;
  
    var brandName = document.createElement("h3");
    brandName.innerText = obj.brand;
    var description = document.createElement("h5");
    description.innerText = obj.name;
    var category = document.createElement("div");
    category.innerHTML = "<b>Category:</b>"+obj.category;
    var price = document.createElement("div");
    price.innerHTML = "<b>Price: $</b>"+obj.price;
    var rating = document.createElement("div");
    rating.innerHTML = "<b>Rating: </b>"+obj.rating;
  
    var colorsContainer = document.createElement("div");
    colorsContainer.classList.add("d-flex","flex-wrap");
    obj.product_colors.forEach(color=>{
      var colorButton = document.createElement("span");
      colorButton.classList.add("color-button");
      colorButton.style.backgroundColor=color.hex_value;
      colorsContainer.appendChild(colorButton);
    });
  
    var prodInnerBody = document.createElement("div");
    prodInnerBody.classList.add("prod-inner-body");
    prodInnerBody.append(prodImage, brandName, description, category, price, rating, colorsContainer);
    
    var linkToProd = document.createElement("a");
    linkToProd.href = obj.product_link;
    linkToProd.append(prodInnerBody);
  
    var prodDiv = document.createElement("div");
    prodDiv.classList.add("product");
    prodDiv.appendChild(linkToProd);
  
    return prodDiv;
  }
  
  /**
   * Created DropDown for Brand Filter
   */
  var selBrand = document.createElement("select");
  selBrand.setAttribute("name", "brand");
  selBrand.setAttribute("palceholder","Pick ur fav Brand");
  selBrand.classList.add("form-control","m-2");
  selBrand.addEventListener("change", (event)=>{ queryParams[event.target.name] = event.target.value });
  selBrand.appendChild(document.createElement("option", {value:undefined}));
  
  var defaultBrandOption = document.createElement("option");
defaultBrandOption.setAttribute("value", "");
defaultBrandOption.setAttribute("disabled", "disabled");
defaultBrandOption.setAttribute("selected", "selected");
defaultBrandOption.innerText = "Select Brand"; 
selBrand.appendChild(defaultBrandOption);

  /**
   * Options for Brand
   */
  var brands = ["maybelline", "covergirl","colourpop","l'oreal","sante","nyx"];
  brands.forEach((brandName) => {
    var opt = document.createElement("option");
    opt.setAttribute("value", brandName);
    opt.innerText=brandName;
    selBrand.appendChild(opt);
  });
  
  /**
   * Dropdown for Product Type
   */
  var selType = document.createElement("select");
  selType.setAttribute("name", "product_type");
  selType.setAttribute("placeholder","Choose a Product");
  selType.classList.add("form-control","m-2");
  selType.addEventListener("change", (event)=>{ queryParams[event.target.name] = event.target.value });
  selType.appendChild(document.createElement("option", {value:undefined}));

  var defaultTypeOption = document.createElement("option");
  defaultTypeOption.setAttribute("value", "");
  defaultTypeOption.setAttribute("disabled", "disabled");
  defaultTypeOption.setAttribute("selected", "selected");
  defaultTypeOption.innerText = "Select Product Type"; // Placeholder text
  selType.appendChild(defaultTypeOption);
  

  /**
   * Options for Product types
   */
  var prodTypes = ["foundation","lipstick","lip_liner","Blush", "bronzer"];
  prodTypes.forEach((type) => {
    var opt = document.createElement("option");
    opt.setAttribute("value", type);
    opt.innerText=type;
    selType.appendChild(opt);
  });
  
  var tags = ["Canadian", "CertClean"];
  var prodCat = ["Powder", "Cream"];
  
  /*var priceGT = document.createElement("input");
  priceGT.setAttribute("type","text");
  priceGT.setAttribute("name","price_greater_than");
  priceGT.setAttribute("placeholder","Price Greater than");
  priceGT.classList.add("form-control","m-2");
  priceGT.addEventListener("blur", (event)=>{queryParams[event.target.name] = event.target.value});*/

  var priceUpto = document.createElement("input");
priceUpto.setAttribute("type", "text");
priceUpto.setAttribute("name", "price_less_than"); 
priceUpto.setAttribute("placeholder", "Price in $ Upto ");
priceUpto.classList.add("form-control", "m-2");
priceUpto.addEventListener("blur", (event) => {
  queryParams[event.target.name] = event.target.value;
});

  
  
  var button = document.createElement("button");
  button.classList.add("btn", "btn-dark-lg");
  button.innerHTML = "Search";
  button.style.fontWeight = "bold";
  button.addEventListener("click", (event)=>api());
  
  var filterDiv = document.createElement("div");
  filterDiv.classList.add("form-inline");
  filterDiv.style.backgroundColor = "dark";
  filterDiv.append(selBrand, selType, priceUpto, button);
  
  var prodListDiv = document.createElement("div");
  prodListDiv.classList.add("d-flex","flex-wrap");
  
  var container = document.createElement("container");
  container.classList.add("container-fluid");
  container.append(filterDiv, prodListDiv);
  document.body.style.backgroundColor = "gray";
  document.body.append(container);
  