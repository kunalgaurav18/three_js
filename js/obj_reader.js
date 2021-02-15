import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r122/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r122/examples/jsm/loaders/MTLLoader.js";

window.main = function main(obj, mtl) {
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
    const skyColor = 0xb1e1ff;
    const groundColor = 0xb97a20;
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

  {
    var axis = new THREE.AxesHelper(20);
    scene.add(axis);
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
    let canv = renderer.domElement;

    var vector = camera.position.clone();
    console.log(vector);

    renderer.render(scene, camera);
    var box = new THREE.Box3().setFromObject(scene);
    console.log(box.min, box.max, box.getSize());
    requestAnimationFrame(render);
  }

  // function disposeObj() {
  //   renderer && renderer.renderLists.dispose();
  // }

  requestAnimationFrame(render);
};

main(null, null);
