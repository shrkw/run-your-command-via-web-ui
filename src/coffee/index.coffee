$ ->
  s = io.connect('/')
  s.on "connect", -> console.log("connected")
  s.on "disconnect", (client) -> console.log("disconnected")
  s.on "receive_stdout", (data) -> $("pre#stdout").append(data.value)
  s.on "receive_stderr", (data) -> $("pre#stderr").append(data.value)
  s.on "receive_exit", (data) ->
    $("#running-now").hide()
    $("div.alert-success").fadeIn("slow")

  $("#start").click ->
    name = $("input#name").val()
    if name == ""
      $("div.input-warning").fadeIn()
      return
    $("div.input-warning").hide()
    $("div.alert-success").hide()
    $("pre#stdout").text("")
    $("pre#stderr").text("")
    $("#running-now").fadeIn("slow")
    s.emit("run", { value: name })
