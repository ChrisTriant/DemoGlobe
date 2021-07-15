import React from 'react';
import Globe from 'react-globe.gl';
import bg_galaxy from '../images/night-sky2.png'
import GeoData from '../datasets/geodata.geojson'
import * as topojson from "topojson-client";
import * as THREE from 'three';


const {useState,useEffect, useRef } = React;
const MAP_CENTER = { lat: 25, lng: 20, altitude: 0.9 };

  const ArtstepsGlobe = () => {
    //create random data
    // const N = 300;
    // const gData = [...Array(N).keys()].map(() => ({
    //     lat: (Math.random() - 0.5) * 180,
    //     lng: (Math.random() - 0.5) * 360,
    //     size: Math.random() / 3,
    //     color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    // }));

    const globeEl = useRef();


    useEffect(() => {
      // Auto-rotate
      globeEl.current.pointOfView(MAP_CENTER, 10000);
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = -0.5;
    }, []);

    const [countries, setCountries] = useState({ features: []});
    useEffect(() => {
      // load data
      fetch(GeoData).then(res => res.json()).then(setCountries);
    }, []);


    //makes hollow globe
    const [landPolygons, setLandPolygons] = useState([]);
    useEffect(() => {
      // load data
      fetch('//unpkg.com/world-atlas/land-110m.json').then(res => res.json())
        .then(landTopo => {
          setLandPolygons(topojson.feature(landTopo, landTopo.objects.land).features);
        });
    }, []);
    

    const polygonsMaterial = new THREE.MeshLambertMaterial({ color: '#44bada', side: THREE.DoubleSide });


        return ( 

            <Globe
                ref={globeEl}

                //Container Layout
                width={800}
                height={800}
                backgroundImageUrl={bg_galaxy}
                backgroundColor="rgba(0,0,0,0)"
                //animateIn = {false}

                //Globe Layer
                showGlobe={false} //makes hollow globe
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                showGraticules={false}
                showAtmosphere={false}
                atmosphereAltitude = {0.3}

                //Points Layer
                //pointsData={gData}
                //pointAltitude="size"
                //pointColor="color"

                //Polygons Layer
                polygonsData={landPolygons}
                polygonCapMaterial={polygonsMaterial}
                polygonSideColor={() => 'rgba(26.7, 72.9, 85.5, 0.8)'}
                polygonStrokeColor={() => 'rgba(255,255,255,0.8)'}

                //Hexed Polygons Layer
                hexPolygonsData={countries.features}
                hexPolygonResolution={3}
                hexPolygonAltitude={0.03}
                hexPolygonMargin={0.3}
                hexPolygonColor={()=>'rgba(16.5, 47.6, 55.9, 0.5)'}
                hexPolygonLabel={({ properties: d }) => `
                  <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
                  Population: <i>${d.POP_EST}</i>
                `}

                
            /> 
          );
    }

    export default ArtstepsGlobe;

 
