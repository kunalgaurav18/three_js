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
      load_3d_object(idx);
    },
  });
}, 1000);

function next() {
  localStorage.setItem("flag", false);
  if (idx < objs.length) idx++;
  load_3d_object(idx);
}

function prev() {
  localStorage.setItem("flag", false);
  if (idx > 0) idx--;
  load_3d_object(idx);
}

function load_3d_object(index) {
  retrieve_model_info(objs[index][0]);
  main(
    "data/" + objs[index][0] + "/models/model_normalized.obj",
    "data/" + objs[index][0] + "/models/model_normalized.mtl"
  );
}

function retrieve_model_info(obj_path) {
  document.getElementById("objId").innerHTML = "Object Id: " + obj_path;

  var response = $.ajax({
    url: "retrieve_info.php",
    type: "POST",
    data: { objId: obj_path },
  });

  response.done(function (msg) {
    console.log("Ajax retrieve Success: " + msg);
    if (msg) {
      document.getElementById("existing_labels").innerHTML = "Labels: " + msg;
      document.getElementById("textarea").innerHTML = msg;
    } else {
      document.getElementById("existing_labels").innerHTML = "";
      document.getElementById("textarea").innerHTML = "";
    }
  });

  response.fail(function (jqXHR, textStatus) {
    console.log("Ajax retrive Request failed: " + textStatus);
  });
}
