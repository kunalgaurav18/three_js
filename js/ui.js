var idx = 0;
var objs = null;

// function enableTextArea() {
//   var el = document.getElementById("local");
//   document.getElementById("btngroupLocal").disabled = !el.checked;
// }

setTimeout(function () {
  $.ajax({
    url: "controller.php",
    type: "get",
    dataType: "json",
    success: function (r) {
      objs = Object.entries(r);
      handle_objects(idx);
    },
  });
}, 1000);

function next() {
  if (idx < objs.length) idx++;
  handle_objects(idx);
}

function prev() {
  if (idx > 0) idx--;
  handle_objects(idx);
}

function handle_objects(index) {
  main(
    "data/" + objs[index][0] + "/models/model_normalized.obj",
    "data/" + objs[index][0] + "/models/model_normalized.mtl"
  );
}
