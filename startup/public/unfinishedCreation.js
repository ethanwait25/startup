function unfinishedCreation() {

    const username = localStorage.getItem("userName");
    const prompt = localStorage.getItem("prompt");

    if (username != null && prompt == null || prompt == '') {
        window.location.href = "create.html"
    }

}

window.onload = unfinishedCreation;