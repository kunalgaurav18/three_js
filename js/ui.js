let idx = 0;
var objs = null;

let url_string = window.location.href;
let url = new URL(url_string);
if (url.searchParams.get("idx")) {
  idx = parseInt(url.searchParams.get("idx"));
}

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
      load_3d_object();
    },
  });
}, 1000);

function next() {
  // localStorage.setItem("flag", false);
  if (idx < objs.length - 1) {
    idx++;
    window.location.href =
      "http://localhost/three_js/index.php?idx=" +
      idx +
      "&path=" +
      objs[idx][0];
  }
  // load_3d_object(idx, true);
}

function prev() {
  // localStorage.setItem("flag", false);
  if (idx > 0) {
    idx--;
    window.location.href =
      "http://localhost/three_js/index.php?idx=" +
      idx +
      "&path=" +
      objs[idx][0];
  }
}

function load_3d_object() {
  retrieve_model_info(objs[idx][0]);
  if (!url.searchParams.get("idx")) {
    main(
      "data/" + objs[idx][0] + "/models/model_normalized.obj",
      "data/" + objs[idx][0] + "/models/model_normalized.mtl"
    );
  }
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
