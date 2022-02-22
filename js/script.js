let USERBOOKSTORAGE = "userBookStorage";
let bukuUser = {
    id: null,
    title: null,
    author: null,
    year: null,
    isComplete: false,
};
let inputBookTitle = document.getElementById("inputBookTitle");
let inputBookAuthor = document.getElementById("inputBookAuthor");
let inputBookYear = document.getElementById("inputBookYear");
let inputBookIsComplete = document.getElementById("inputBookIsComplete");

function getArray() {
    arrayBukuUser = JSON.parse(localStorage.getItem(USERBOOKSTORAGE));
    if (arrayBukuUser == null) {
        arrayBukuUser = [];
    } else {
        arrayBukuUser = JSON.parse(localStorage.getItem(USERBOOKSTORAGE));
    }
    return arrayBukuUser;
}
function setUserData(bukuUser) {
    let arrayBukuUser = [];
    let jsonBukuUser = JSON.stringify(bukuUser);
    if (localStorage.getItem(USERBOOKSTORAGE) == undefined) {
        arrayBukuUser = [];
    } else {
        arrayBukuUser = JSON.parse(localStorage.getItem(USERBOOKSTORAGE));
    }
    if (bukuUser.title != null) {
        arrayBukuUser.unshift(jsonBukuUser);
    }
    localStorage.setItem(USERBOOKSTORAGE, JSON.stringify(arrayBukuUser));
    return arrayBukuUser;
}
function updateUserData(id) {
    let getBukuUser = localStorage.getItem(USERBOOKSTORAGE);
    let updateBukuUser = JSON.parse(getBukuUser);
    updateBukuUser.forEach(function (e, index) {
        let userObj = JSON.parse(e);
        if (userObj.id == id) {
            updateBukuUser[index] = JSON.stringify(bukuUser);
        }
    });
    localStorage.setItem(USERBOOKSTORAGE, JSON.stringify(updateBukuUser));
}

function setBuku() {
    let id = bukuUser["id"] = Math.floor(Date.now() / 1000);
    let title = bukuUser["title"] = inputBookTitle.value;
    let author = bukuUser["author"] = inputBookAuthor.value;
    let year = bukuUser["year"] = inputBookYear.value;
    let status = bukuUser["isComplete"] = inputBookIsComplete.checked;
    setBookPlace(id, title, author, year, status);
    return bukuUser;
}

function parseUserData(arrayUser) {
    let userBelumSelesai = [];
    arrayUser.forEach(function (e) {
        userBelumSelesai.unshift(JSON.parse(e));
    });
    return userBelumSelesai;
}
function setBookPlace(id, title, author, year, status) {
    let belumBacaBox = document.getElementById("belumSelesaiDibaca");
    let selesaiBacaBox = document.getElementById("selesaiDibaca");
    let actionBox = document.createElement('div');
    actionBox.setAttribute("id", "action");

    let selesaiBox = document.createElement('div');
    selesaiBox.className = "selesai-box";

    let hBook = document.createElement('h3');
    hBook.setAttribute("id", "title");
    hBook.innerText = `${title}`;

    let pAuthor = document.createElement('p');
    pAuthor.setAttribute("id", "author");
    pAuthor.innerText = `Penulis : `;

    let spanAuthor = document.createElement('span');
    spanAuthor.setAttribute("id", "authorText");
    spanAuthor.innerText = `${author}`;
    pAuthor.appendChild(spanAuthor);

    let pYear = document.createElement('p');
    pYear.setAttribute("id", "year");
    pYear.innerText = `Tahun : `;

    let spanYear = document.createElement('span');
    spanYear.setAttribute("id", "authorYear");
    spanYear.innerText = `${year}`;
    pYear.appendChild(spanYear);

    let hapusButton = setDeleteButton(id, "hapus-button", removeBook);

    selesaiBox.append(hBook, pAuthor, pYear);

    if (status !== true) {
        let selesaiButton = setTypeButton(id, "selesai-button", finishBook, status);
        actionBox.append(selesaiButton, hapusButton);
        selesaiBox.append(actionBox);
        belumBacaBox.appendChild(selesaiBox);
    } else {
        let belumSelesaiButton = setTypeButton(id, "selesai-button", unfinishBook, status);
        actionBox.append(belumSelesaiButton, hapusButton);
        selesaiBox.append(actionBox);
        selesaiBacaBox.appendChild(selesaiBox);
    }
}
function setDeleteButton(id, btnClass, eventFunction) {
    let buttonBook = document.createElement('button');
    buttonBook.classList.add(btnClass);
    buttonBook.setAttribute("id", id);
    buttonBook.innerText = "Hapus Buku";
    buttonBook.addEventListener("click", function (e) {
        eventFunction(id, e.target.parentElement.parentElement);
    });
    return buttonBook;
}
function setTypeButton(id, btnClass, eventFunction, status) {
    let buttonBook = document.createElement('button');
    buttonBook.classList.add(btnClass);
    buttonBook.setAttribute("id", id);
    if (status !== true) {
        buttonBook.innerText = "Selesai Dibaca";
    } else {
        buttonBook.innerText = "Belum Selesai Dibaca";
    }
    buttonBook.addEventListener("click", function (e) {
        eventFunction(id, e.target.parentElement.parentElement);
    });
    return buttonBook;
}
function finishBook(id, parentElement) {
    let finishUser = JSON.parse(localStorage.getItem(USERBOOKSTORAGE));
    let idUser;
    let title;
    let author;
    let year;
    finishUser.forEach(function (e) {
        let userObj = JSON.parse(e);
        if (userObj.id == id) {
            idUser = userObj["id"];
            title = userObj["title"];
            author = userObj["author"];
            year = userObj["year"];
        }
    });
    bukuUser["id"] = id;
    bukuUser["title"] = title;
    bukuUser["author"] = author;
    bukuUser["year"] = year;
    bukuUser["isComplete"] = true;

    updateUserData(bukuUser["id"]);
    setBookPlace(idUser, title, author, year, true);
    parentElement.remove();
}
function unfinishBook(id, parentElement) {
    let finishUser = JSON.parse(localStorage.getItem(USERBOOKSTORAGE));
    let idUser;
    let title;
    let author;
    let year;
    finishUser.forEach(function (e) {
        let userObj = JSON.parse(e);
        if (userObj.id == id) {
            idUser = userObj["id"];
            title = userObj["title"];
            author = userObj["author"];
            year = userObj["year"];
        }
    });
    bukuUser["id"] = id;
    bukuUser["title"] = title;
    bukuUser["author"] = author;
    bukuUser["year"] = year;
    bukuUser["isComplete"] = false;
    updateUserData(bukuUser["id"]);
    setBookPlace(idUser, title, author, year, false);
    parentElement.remove();
}
function showSaveBook() {
    let finishUser = JSON.parse(localStorage.getItem(USERBOOKSTORAGE));
    let idUser;
    let title;
    let author;
    let year;
    let status;
    finishUser.forEach(function (e) {
        let userObj = JSON.parse(e);
        idUser = userObj["id"];
        title = userObj["title"];
        author = userObj["author"];
        year = userObj["year"];
        status = userObj["isComplete"];
        setBookPlace(idUser, title, author, year, status);
    });
}
function removeBook(id, parentElement) {
    parentElement.remove();
    let getBukuUser = localStorage.getItem(USERBOOKSTORAGE);
    let updateBukuUser = JSON.parse(getBukuUser);
    updateBukuUser.forEach(function (e, index) {
        let userObj = JSON.parse(e);
        if (userObj.id == id) {
            updateBukuUser.splice(index, 1);
        }
    });
    localStorage.setItem(USERBOOKSTORAGE, JSON.stringify(updateBukuUser));
}
function resetValue() {
    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookYear.value = "";
    inputBookIsComplete.checked = false;
}
function scrollToBook() {
    let belumSelesaiDibaca = document.getElementById("belumSelesaiDibaca");
    belumSelesaiDibaca.scrollIntoView();
}





