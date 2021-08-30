import React from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';


const {useEffect, useRef } = React;


  const ArtstepsGlobe = () => {

    const globeEl = useRef();

    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    useEffect(() => {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 1;
      globeEl.current.controls().maxPolarAngle = THREE.MathUtils.degToRad(90);
      globeEl.current.controls().minPolarAngle = THREE.MathUtils.degToRad(90);

      window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight
    
        // Update camera
        globeEl.current.camera().aspect = sizes.width / sizes.height
        globeEl.current.camera().updateProjectionMatrix()
    
        // Update renderer
        globeEl.current.renderer().setSize(sizes.width, sizes.height)
        globeEl.current.renderer().setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })
    }, []);




    
    
    
    const TILE_MARGIN =  0.35; // degrees

    // Gen random data
    const GRID_SIZE = [20, 10];
    

    const textureLoader=new THREE.TextureLoader();
    const tileWidth = 360 / GRID_SIZE[0];
    const tileHeight = 180 / GRID_SIZE[1];
    // const tileWidth = 20 ;
    // const tileHeight = 20 ;
    let i=0;
    const tilesData = [];
    i++;

    for(let lngIdx=0; lngIdx<GRID_SIZE[0];lngIdx++){
      for(let latIdx=0;latIdx<GRID_SIZE[1];latIdx++){
        tilesData.push({
          lng: -180 + lngIdx * tileWidth,
          lat: -90 + (latIdx + 0.5) * tileHeight   ,
          material: new THREE.MeshLambertMaterial({
            map: textureLoader.load(`/gallery/image${i}.jpg`),
            color:"white", 
            opacity:0.9, 
            transparent:true,
          })
        })
        i++;
        if(i>7){
          i=0;
        }
      }
    }
  
        return ( 

            <Globe
                ref={globeEl}

                //Container Layout
                // width={800}
                // height={800}
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                backgroundColor="rgba(0,0,0,1)"
                //animateIn = {true}

                //Globe Layer
                showGlobe={true} //makes hollow globe
                //globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                //bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                showGraticules={false}
                showAtmosphere={false}
                atmosphereAltitude = {0.3}

                //Tiles Layer
                tilesData={tilesData}
                tileWidth={tileWidth - TILE_MARGIN}
                tileHeight={tileHeight - TILE_MARGIN}
                tileMaterial="material"

                
            /> 
          );
    }

    export default ArtstepsGlobe;

 
