$(document).ready(function(){
    getData();
});

function getData() {
    localStorageData = localStorage.getItem("student");
    let studentObj = JSON.parse(localStorageData);
    $("#Name").text(studentObj.Name);
    $("#Branch").text(studentObj.Branch);
}