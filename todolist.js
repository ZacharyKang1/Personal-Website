let section = document.querySelector("section.list");
let add = document.querySelector("form button");
// sorted is used to determine the way how todolist shows
let sorted = document.querySelector("div.sort input").checked;
//show the current list
showList(sorted);
//add event trigger
add.addEventListener("click", (e) => {
  //prevent form from being submitted
  e.preventDefault();
  //get the form by fetching the parent element
  let form = e.target.parentElement;
  let todoText = form.children[0].value;
  let todoMonth = form.children[1].value;
  let todoDay = form.children[2].value;
  console.log("Add to list:", todoText, todoMonth, todoDay);
  if (todoText === "") {
    alert("Please Enter Some Content.");
    return;
  }
  // create a list
  let lst = document.createElement("div");
  lst.classList.add("todo");
  let text = document.createElement("p");
  text.classList.add("todo-text");
  text.innerText = todoText;
  let time = document.createElement("p");
  time.classList.add("todo-time");
  time.innerText = todoMonth + "/" + todoDay;
  lst.appendChild(text);
  lst.appendChild(time);

  //completeButton
  let completeButton = createCompleteButton();

  //trashButton
  let trashButton = creatTrashButton();
  lst.appendChild(completeButton);
  lst.appendChild(trashButton);
  //add animation
  lst.style.animation = "listScaleUp 0.3s forwards";
  section.appendChild(lst);

  //create an object to store
  let storeObject = {
    todoText: todoText,
    todoMonth: todoMonth,
    todoDay: todoDay,
  };

  //store data into an array of objects
  let myList = localStorage.getItem("list");
  // in case there are null in storage
  if (myList == null) {
    localStorage.setItem("list", JSON.stringify([]));
  }
  let myArray = JSON.parse(localStorage.getItem("list"));
  myArray.push(storeObject);
  localStorage.setItem("list", JSON.stringify(myArray));
  //   console.log(JSON.parse(localStorage.getItem("list")));
  form.children[0].value = ""; //clear input
  clearList();
  showList(checkbox.checked);
});

//sorting algorithm
function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  } else {
    let mid = Math.floor(arr.length - 1);
    let l = arr.slice(0, mid);
    let r = arr.slice(mid, arr.length);
    return mergeTime(mergeSort(l), mergeSort(r));
  }
}
function mergeTime(arr1, arr2) {
  let result = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (Number(arr1[i].todoMonth) > Number(arr2[j].todoMonth)) {
      result.push(arr2[j]);
      j++;
    } else if (Number(arr1[i].todoMonth) < Number(arr2[j].todoMonth)) {
      result.push(arr1[i]);
      i++;
    } else {
      if (Number(arr1[i].todoDay > Number(arr2[j].todoDay))) {
        result.push(arr2[j]);
        j++;
      } else {
        result.push(arr1[i]);
        i++;
      }
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  return result;
}

//show the todo list from the storage
function showList(sorted = false) {
  let myList = localStorage.getItem("list");
  //if there is at least 1 element in todo list, then show the list
  if (myList != null && myList != "[]") {
    let myArray = JSON.parse(localStorage.getItem("list"));
    // console.log(myArray);
    if (sorted) {
      myArray = mergeSort(JSON.parse(localStorage.getItem("list")));
    }
    //after sorint, resort the storage too
    // localStorage.setItem("list", JSON.stringify(myArray));
    myArray.forEach((element) => {
      //recover from the storage
      let lst = document.createElement("div");
      lst.classList.add("todo");
      let text = document.createElement("p");
      text.classList.add("todo-text");
      text.innerText = element.todoText;
      let time = document.createElement("p");
      time.classList.add("todo-time");
      time.innerText = element.todoMonth + "/" + element.todoDay;
      lst.appendChild(text);
      lst.appendChild(time);

      //completeButton
      let completeButton = createCompleteButton();
      //trashButton
      let trashButton = creatTrashButton();
      lst.appendChild(completeButton);
      lst.appendChild(trashButton);
      //add animation
      lst.style.animation = "listScaleUp 0.3s forwards";
      section.appendChild(lst);
    });
  }
}

//clear the todolist
function clearList() {
  let section = document.querySelector("section.list");
  let len = section.children.length;
  for (let i = 0; i < len; i++) {
    //should use 0 instead of i, because remove change the length
    section.children[0].remove();
  }
}

//create a createCompleteButton with class="complete" and add a click event listener
//which toggle a class="done" that controls the appearance of the list
function createCompleteButton() {
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  completeButton.addEventListener("click", (e) => {
    let item = e.target.parentElement;
    item.classList.toggle("done");
    // console.log(item);
  });
  return completeButton;
}
//create a TrashButton with class="trash" and add a click event listener
function creatTrashButton() {
  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashButton.addEventListener("click", (e) => {
    let item = e.target.parentElement;
    item.addEventListener("animationend", () => {
      //   remove from storage
      let text = item.children[0].innerText;
      let time = item.children[1].innerText;
      let myArray = JSON.parse(localStorage.getItem("list"));
      //   console.log(text, time);
      myArray.forEach((element, index) => {
        let curTime = element.todoMonth + "/" + element.todoDay;
        // console.log(element.todoText == text, curTime == time);
        if (element.todoText == text && curTime == time) {
          myArray.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(myArray));
        }
      });
      item.remove();
    });
    item.style.animation = "listScaleDown 0.3s forwards";
    // console.log(item);
  });
  return trashButton;
}
//sortButton Evnet
let sortButton = document.querySelector("div.sort button");
sortButton.addEventListener("click", (e) => {
  clearList();
  showList(true);
});

//checkbox event
let checkbox = document.querySelector("div.sort input");
checkbox.addEventListener("click", (e) => {
  //in case there are no list
  clearList();
  showList(checkbox.checked);
});
