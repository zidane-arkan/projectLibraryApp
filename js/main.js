window.addEventListener("load", function () {
    let btnBookSubmit = document.getElementById("bookSubmit");
    let button = document.querySelectorAll("button");
    getArray();
    setUserData(bukuUser);
    button.forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();
        });
    });
    btnBookSubmit.addEventListener("click", function () {
        setBuku();
        setUserData(bukuUser);
        scrollToBook();
        resetValue();
    });
    showSaveBook();
});