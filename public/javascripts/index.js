$(function() {
  var s = io.connect('/');
  s.on("connect", function () {
    console.log("connected");
  });
  s.on("disconnect", function (client) {
    console.log("disconnected");
  });
  s.on("receive_stdout", function (data) {
    $("pre#stdout").append(data.value);
//    var msg = value.replace( /[!@$%<>'"&|]/g, '' ); //タグ記号とかいくつか削除
  });
  s.on("receive_stderr", function (data) {
    $("pre#stderr").append(data.value);
  });
  s.on("receive_exit", function (data) {
    $("#running-now").hide();
    $("div.alert-success").fadeIn("slow");
  });


  $("#start").click(function() {
    var name = $("input#name").val();
    if (name == "") {
      $("div.input-warning").fadeIn();
      return;
    }
    $("div.input-warning").hide();
    $("div.alert-success").hide();
    $("pre#stdout").text("");
    $("pre#stderr").text("");
    $("#running-now").fadeIn("slow");
    s.emit("run", { value: name });
  });
});
