import React from 'react';
import Globe from 'react-globe.gl';

const {useEffect, useRef } = React;

  const ArtstepsGlobe = () => {
    //create random data
    const N = 300;
    const gData = [...Array(N).keys()].map(() => ({
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        size: Math.random() / 3,
        color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));

    const globeEl = useRef();
    useEffect(() => {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
    }, []);


        return ( 
            <Globe
                ref={globeEl}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                //backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                pointsData={gData}
                pointAltitude="size"
                pointColor="color"
                width={800}
                height={800}
                backgroundColor="rgba(0,0,0,0.7)"
                showGraticules={false}
                atmosphereAltitude = {0.3}
            /> 
          );
    }

    export default ArtstepsGlobe;

 
