import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/MTLLoader.js";

window.main = function main(obj, mtl) {
  // const mtlFile = "data/model_0/models/model_normalized.mtl";
  // const objFile = "data/model_0/models/model_normalized.obj";

  // const mtlFile = "obj/model_1/model_1.mtl";
  // const objFile = "obj/model_1/model_1.obj";
  let path;
  let objFile = obj;
  let mtlFile = mtl;
  let url_string = window.location.href;
  let url = new URL(url_string);
  if (url.searchParams.get("path")) {
    path = url.searchParams.get("path");
    // let mtl = url.searchParams.get("mtl");
    objFile = "data/" + path + "/models/model_normalized.obj";
    mtlFile = "data/" + path + "/models/model_normalized.mtl";
  }

  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 1;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-50, 10, 20);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0); //sets initial location of the object
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color("white");

  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load(mtlFile, (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load(objFile, (root) => {
        scene.add(root);
      });
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  function disposeObj() {
    // scene = null;
    // camera = null;
    // renderer = null;
    renderer && renderer.renderLists.dispose();
  }

  requestAnimationFrame(render);
};

main(null, null);
