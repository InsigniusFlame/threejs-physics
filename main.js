import * as THREE from 'three';
import { CubeCamera, Raycaster, Vector3 } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { GUI } from 'dat.gui'

//BASIC INSTANTIATION
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
const raycaster = new THREE.Raycaster()
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)
const size = 10; const divisions = 10; const gridHelper = new THREE.GridHelper( size, divisions ); scene.add( gridHelper );

var add_pos;
let cross_pos

const controls = new OrbitControls( camera, renderer.domElement );

let box;
function textbox(pointx,pointy,pointz) {
const box_geometry = new THREE.BoxGeometry(0.1,0.1,0.1)
const material =  new THREE.MeshStandardMaterial({color : 0xff0000})
const box = new THREE.Mesh(box_geometry,material)
box.position.set(pointx,pointy,pointz)

scene.add(box)
return box

}



const pointer = new THREE.Vector2()
function movepoint(event) {
  pointer.  x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = (event.clienty / window.innerHeight) * 2 + 1
  
  
  

}



function vectorops(vector1,vector2) {
  const ADDmaterial = new THREE.LineBasicMaterial({color : 0xff0000})
  let ADDvector = new THREE.Vector3()
  ADDvector = ADDvector.addVectors(vector1,vector2)
  const addpoints = []
  addpoints.push(new THREE.Vector3(ADDvector.x,ADDvector.y,ADDvector.z))
  addpoints.push(new Vector3())
  const linegeo = new THREE.BufferGeometry().setFromPoints(addpoints)
  const ADDline = new THREE.Line(linegeo,ADDmaterial)
  scene.add(ADDline)
  textbox(ADDvector.x,ADDvector.y,ADDvector.z)
  add_pos = new THREE.Vector3(ADDvector.x,ADDvector.y,ADDvector.z) 

  const crossmaterial = new THREE.LineBasicMaterial({color : 0xFFA500})
  let crossvector = new THREE.Vector3()
  crossvector = vector1.cross(vector2)
  const crosspoints = []
  crosspoints.push(new THREE.Vector3(crossvector.x,crossvector.y,crossvector.z))
  crosspoints.push(new Vector3())
  const crosslinegeo = new THREE.BufferGeometry().setFromPoints(crosspoints)
  const crossline = new THREE.Line(crosslinegeo,crossmaterial)
  scene.add(crossline)
  textbox(crossvector.x,crossvector.y,crossvector.z)
  cross_pos = new THREE.Vector3(crossvector.x,crossvector.y,crossvector.z)
  
}





camera.position.set(0,10,10)
controls.update()


function makeline() {
const Linematerial = new THREE.LineBasicMaterial( { color: 0x0000ff } );
let points = [];
let given_points1
let given_points2
given_points1 = new THREE.Vector3(params.Vector1x,params.Vector1y,params.Vector1z)
given_points2 = new THREE.Vector3(params2.Vector2x,params2.Vector2y,params2.Vector2z)


points.push(given_points1)

const newpoints = [];
newpoints.push(given_points1)
newpoints.push(new THREE.Vector3())
const v1linegeo = new THREE.BufferGeometry().setFromPoints(newpoints)  
const v1line = new THREE.Line(v1linegeo,Linematerial)
if (params.Vector1x != 0 && params.Vector1y !=0 && params.Vector1z != 0) {
scene.add(v1line)}

points.push(given_points2)

const newpoints2 = []
newpoints2.push(given_points2)
newpoints2.push(new THREE.Vector3())
const v2linegeo = new THREE.BufferGeometry().setFromPoints(newpoints2)  
const v2line = new THREE.Line(v2linegeo,Linematerial)
if (params2.Vector2x != 0 && params2.Vector2y !=0 && params2.Vector2z != 0) {
scene.add(v2line)}


if (params.Vector1x != 0 && params.Vector1y !=0 && params.Vector1z != 0 && params2.Vector2x != 0 && params2.Vector2y != 0 && params2.Vector2z !=0){
const linegeo = new THREE.BufferGeometry().setFromPoints(points)
const Linematerialyellow = new THREE.LineBasicMaterial( { color: 0xFFFF00 } );
const camline = new THREE.Line(linegeo,Linematerialyellow)
scene.add(camline)
textbox(params.Vector1x,params.Vector1y,params.Vector1z)
textbox(params2.Vector2x,params2.Vector2y,params2.Vector2z)
vectorops(given_points1,given_points2)
}

}
// THE YOINKINATOR
function clearlines(){
  if (scene.children.length > 1){
    
    for (var i=0;i < scene.children.length;i++)
      {
        console.log("clearing")
        scene.remove(scene.children.splice(5))}
  }

}



//LIGHT
const light = new THREE.PointLight( 0xffff, 10000);
light.position.set( 50, 50, 50 );
scene.add( light ); 

// GUI
const params = {Vector1x:'',Vector1y:'',Vector1z:''}
const params2 = {Vector2x:'',Vector2y:'',Vector2z:''}
const gui = new GUI();
gui.add(params,'Vector1x').onFinishChange((value)=>{return value})
gui.add(params,'Vector1y').onFinishChange((value)=>{return value})
gui.add(params,'Vector1z').onFinishChange((value)=>{return value})
gui.add(params2,'Vector2x').onFinishChange((value)=>{return value})
gui.add(params2,'Vector2y').onFinishChange((value)=>{return value})
gui.add(params2,'Vector2z').onFinishChange((value)=>{return value})





//ANIMATE

function animate() {
  raycaster.setFromCamera(pointer,camera)
  window.addEventListener('pointermove',movepoint)
  makeline();
  console.log(add_pos)
  //clearlines();
  requestAnimationFrame(animate)
  controls.update()



  renderer.render(scene,camera)


}
animate();
var obj = { add:function(){ camera.position.set(add_pos.x,add_pos.y,add_pos.z) }};
gui.add(obj,'add');

var cross = {cross:function(){ camera.position.set(cross_pos.x,cross_pos.y,cross_pos.z)}};
gui.add(cross,'cross');
