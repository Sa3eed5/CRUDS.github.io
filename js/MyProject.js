// catch all elements
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp; //create global var to all funcs :

/*************************************  [  Get Total Price Function  ]  *********************************************/
function getTotal() {
  // chack if price not empty if true it will contuinue
  if (price.value != "") {
    // add (+) before to convert strings to integer

    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result; // print the result in small html
    total.style.background = "#040"; // change color t green
  } else {
    // clear data in total and covert color to red if the price was empty
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}
/***************************************** [ Create Function  with LocalStorge ] ***********************************/
 
let dataContainer;
// cack if the localStorage is empyy or not :
if (localStorage.product != null) {
  // localStorage contain data
  dataContainer = JSON.parse(localStorage.product); // convert strings to arry
} // localStorage is empty from frist :
else {
  dataContainer = []; // create array to save data in objects:
}
submit.onclick = function () {
  //create new object to hold data in and send it to array
  let newDataContainer = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value,
  };
  // check if input contine data :
  if (title.value != ""
    && price.value != ""
    && category.value != ""
    && newDataContainer.count < 100) {
    // create more than one object from same data in one click:
    if (mood === "create") {
      if (newDataContainer.count > 1) {
        for (let i = 0; i < newDataContainer.count; i++) {
          dataContainer.push(newDataContainer); // create n times from object
        }
      } else {
        dataContainer.push(newDataContainer); // create 1 object in arry
      }
    } else {
      dataContainer[tmp] = newDataContainer;
      submit.innerHTML = "Create ";
      count.style.display = "block";
      mood = "create";
    }
    clearData(); // data won`t delete if we create anew product :
  }

  // store data in localStorage in object || take only string so we usen JSON.stringify to convert object to strings
  localStorage.setItem("product", JSON.stringify(dataContainer));
  displayData();
};

/***************************************** [ Clear Input Function ] ****************************************************/
function clearData() {
  (title.value = ""),
    (price.value = ""),
    (taxes.value = ""),
    (ads.value = ""),
    (discount.value = ""),
    (total.innerHTML = ""),
    (count.value = ""),
    (category.value = "");
  getTotal();
}

/***************************************** [ Display Data Function ] ****************************************************/
function displayData() {
  let tableContainer = ""; // container will hold the data
  for (let i = 0; i < dataContainer.length; i++) {
    // loop on all data to dispaly it
    tableContainer += `
      <tr>
      <th>${i+1}</th>
      <th>${dataContainer[i].title} </th>
      <th>${dataContainer[i].price} </th>
      <th>${dataContainer[i].taxes} </th>
      <th>${dataContainer[i].ads} </th>
      <th>${dataContainer[i].discount} </th>
      <th>${dataContainer[i].total} $ </th>
      <th>${dataContainer[i].category} </th>
      <td><button onclick="updataData( ${i} )" id="update">update</button></td>
      <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
      `;
  }
  document.getElementById("tbody").innerHTML = tableContainer; //put data in table :

  // create button to delete all data :
  let btnDelete = document.getElementById("deleteALL");
  if (dataContainer.length > 0) {
    btnDelete.innerHTML = `<button onclick="deleteDataAll (  )"> Delaete All (${dataContainer.length}) </button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
// call function always not only in create :
window.onload = () => {
  displayData();
};
/***************************************** [ Delete Data Function ] ****************************************************/
function deleteData(i) {
  dataContainer.splice(i, 1); //  2nd parameter means remove one item only
  localStorage.product = JSON.stringify(dataContainer); //delete in localSrotge
  displayData(); // display  data after delete :
}

/***************************************** [ DeleteALL Data Function ] ****************************************************/

function deleteDataAll() {
  dataContainer.splice(0); // delete all from index 0 to end:
  localStorage.clear();
  displayData();
}
/***************************************** [ Updata Data Function ] ****************************************************/

function updataData(i) {
  (title.value = dataContainer[i].title),
    (price.value = dataContainer[i].price),
    (taxes.value = dataContainer[i].taxes),
    (ads.value = dataContainer[i].ads),
    (discount.value = dataContainer[i].discount),
    getTotal();
  (category.value = dataContainer[i].category), (count.style.display = "none");
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

/***************************************** [ Search Data Function ] ****************************************************/

let searchMood = "title";
function getSearchMood(id) {
  let searchBox = document.getElementById("search");
  if (id == "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  searchBox.placeholder = "Search By " + searchMood;

  searchBox.focus();
  searchBox.value = "";
  displayData();
  // console.log(searchMood);
}
function searchData(value) {
  let tableContainer = "";
  if (searchMood == "title") {
    for (let i = 0; i < dataContainer.length; i++) {
      if (dataContainer[i].title.includes(value.toLowerCase())) {
        tableContainer += `
            <tr>
            <th>${i}</th>
            <th>${dataContainer[i].title} </th>
            <th>${dataContainer[i].price} </th>
            <th>${dataContainer[i].taxes} </th>
            <th>${dataContainer[i].ads} </th>
            <th>${dataContainer[i].discount} </th>
            <th>${dataContainer[i].total} $ </th>
            <th>${dataContainer[i].category} </th>
            <td><button onclick="updataData( ${i} )" id="update">update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
            `;
      }
    }
  } else {
    for (let i = 0; i < dataContainer.length; i++) {
      if (dataContainer[i].category.includes(value.toLowerCase())) {
        tableContainer += `
            <tr>
            <th>${i}</th>
            <th>${dataContainer[i].title} </th>
            <th>${dataContainer[i].price} </th>
            <th>${dataContainer[i].taxes} </th>
            <th>${dataContainer[i].ads} </th>
            <th>${dataContainer[i].discount} </th>
            <th>${dataContainer[i].total} $ </th>
            <th>${dataContainer[i].category} </th>
            <td><button onclick="updataData( ${i} )" id="update">update</button></td>
            <td><button onclick="deleteData( ${i} )" id="delete">delete</button></td>
            `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = tableContainer; //put data in table :

  // console.log(value)
}
/***************************************************************************************************/

var typed = new Typed('.element', {
	strings: [" product mangement system ","product mangement system :"],
	typeSpeed: 50,
  backSpeed: 50,
  loop:false,
	showCursor :false
});

