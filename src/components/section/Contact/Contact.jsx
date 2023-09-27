import React, { Component, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive'
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, MeshReflectorMaterial, BakeShadows } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import { useSpring } from 'react-spring';
import { easing } from 'maath'
import createGlobe from "cobe";
import '../../../assets/styles/contact.css'

const Contact = ({ fullpageState }) => {
  const fpIndex = fullpageState.origin && fullpageState.origin.index;
  const fpDestination = fullpageState.direction;
  const animateCount =
    fpDestination === "down" && fpIndex === 3
      ? "animate__fadeInUp animate__delay-3s"
      : fpDestination === "down" && fpIndex === 4
        ? "animate__fadeOutUpBig animate__slower  "
        : "";
  const animateCountUp =
    fpDestination === "up" && fpIndex === 4
      ? "animate__fadeOutDown"
      : fpDestination === "up" && fpIndex === 4
        ? "animate__fadeInDown "
        : "";

  
  const breakpoint = useMediaQuery({ query: '(max-width: 992px)' });

  const canvasRef = useRef();
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);

  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let width = 0;
    let phi = 0;
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 3.2,
      baseColor: [0.5, 0.5, 0.5],
      markerColor: [255 / 255, 0 / 255, 60 / 255],
      glowColor: [0.08, 0.08, 0.08],
      markers: [
        { location: [40.7595, -1.4367], size: 0.05 },
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phi += 0.005
        } 
        state.phi = phi + r.get()
        state.width = width * 2
        state.height = width * 2
      }
    })
    setTimeout(() => canvasRef.current.style.opacity = '1')
    return () => globe.destroy()
  }, [])

  

  return (
    <div className='contact_section'>
      <div className="overlay_globe">
       <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            pointerInteracting.current =
              e.clientX - pointerInteractionMovement.current;
            canvasRef.current.style.cursor = 'grabbing';
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            canvasRef.current.style.cursor = 'grab';
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            canvasRef.current.style.cursor = 'grab';
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({
                r: delta / 200,
              });
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({
                r: delta / 100,
              });
            }
          }}
          style={{
            width: '1000px',
            height: '1000px',
            cursor: 'grab',
            contain: 'layout paint size',
            opacity: 0,
            transition: 'opacity 1s ease',
          }}
        />
      </div>
      <div className={`contact_cont ${breakpoint ? '' : 'animate__animated'} ${animateCount} ${animateCountUp}`} style={{ '--animate-delay': '0.1s' }}>
        <div className="cont_cont_wrap">
          <p>What would you do if you had a software expert available at your fingertips?</p>
          <div>Want to start new project? Or just say hey.</div>
          <div>
            You can send me a message on <a target="_blank" rel="noopener noreferrer" className="insta" href="https://discord.gg/9M7Qjwc6CM">Discord</a>.
            <h1>
              <a className='link' target="_blank" rel="noopener noreferrer" href="mailto:deiividdlk@gmail.com">
                deiividdlk@gmail.com
              </a>
            </h1>
          </div>
        </div>
      </div>    
      
    </div >
  )

}

export default Contact