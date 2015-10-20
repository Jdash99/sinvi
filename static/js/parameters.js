$(document).ready(function () {

    $("#product").change(function () {
            $("#periods").val("");
            $("#p1").val("");
            $("#p2").val("");
    })

    $("#policy").change(function () {
        if ($(this).val() === "RS") {
            $("#p1").attr("placeholder", "R");
            $("#p2").attr("placeholder", "S");
            $("#p1").val("");
            $("#p2").val("");
        }
        if ($(this).val() === "Qs") {
            $("#p1").attr("placeholder", "Q");
            $("#p2").attr("placeholder", "s");
            $("#p1").val("");
            $("#p2").val("");
        }
    });
});
