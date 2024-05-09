$(document).ready(function(){
    $("#btnAddStudent").click(function(){
        function getStudentData(){

            let student = {
                name : $("#Name").val(),
                branch : $("#Branch").val()
            }
            return student;

        }
        function toLocalStorage(){
            if(!localStorage.getItem("student")){
                localStorage.setItem("student",JSON.stringify(getStudentData()));
            }
            else{
                localStorage.removeItem("student");
                localStorage.setItem("student",JSON.stringify(getStudentData()));
            }
            
        }
        
        toLocalStorage();
        window.location.href = "display.html";
        

    })
})