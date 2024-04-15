function unfinishedCreation() {

    const username = localStorage.getItem("user");
    const avatar = localStorage.getItem("avatar");

    if (username != null && avatar == null || avatar == 'null') {
        window.location.href = "create.html"
    }

}

unfinishedCreation();