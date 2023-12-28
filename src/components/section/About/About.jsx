import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import '../../../assets/styles/App.css'
import '../../../assets/styles/hero.css'
import '../../../assets/styles/about.css'
import ProjectButton from './Proyects/ProjectButton'
import { useMediaQuery } from 'react-responsive'

const About = ({ fullpageState, onMouseEnter, onMouseLeave }) => {
  const titlePt1 = "I'm"
  const titlePt2 = "David "
  const titlePt3 = "App Developer"
  // const fpIndex = fullpageState.fullpageState.origin && fullpageState.fullpageState.origin.index
  // const fpDestination = fullpageState.fullpageState.direction
  const fpIndex = fullpageState.origin && fullpageState.origin.index
  const fpDestination = fullpageState.direction

  const projectContainer = React.useRef();

  useEffect(() => {
    projectContainer.current = document.querySelector('.proyects__wrapper');
  }, []);

  const handleWheel = (e) => {
    if (projectContainer.current) {
      gsap.to(projectContainer.current, {
        scrollTop: "+=" + e.deltaY,
        duration: 0.5,
        ease: "power1.out" // Puedes experimentar con diferentes funciones de facilidad para obtener el comportamiento que deseas
      });
    }
  }

  const animateCont = fpDestination === 'down' && fpIndex === 0 ? 'animate__slideInUp animate__delay-1s' : (fpDestination === 'down' && fpIndex === 1 ? 'animate__fadeOutUpBig animate__slower' : '')
  const animateContUp = fpDestination === 'up' && fpIndex === 1 ? 'animate__fadeOutDownBig animate__slower' : (fpDestination === 'up' && fpIndex === 2 ? 'animate__slideInDown animate__delay-1s' : '')
  const animateCont2 = fpDestination === 'down' && fpIndex === 0 ? 'animate__slideInUp animate__delay-1s' : (fpDestination === 'down' && fpIndex === 1 ? 'animate__slideOutDown animate__slow' : '')
  const animateContUp2 = fpDestination === 'up' && fpIndex === 1 ? 'animate__slideOutUp animate__slow animate__delay-1s' : (fpDestination === 'up' && fpIndex === 2 ? 'animate__slideInDown animate__delay-1s' : '')
  const breakpoint = useMediaQuery({ query: '(max-width: 992px)' });

  return (
    <div className={`about_section`}>
      <h1 className={`about_me font-60 ${breakpoint ? '' : 'animate__animated'} ${animateCont} ${animateContUp}`} style={{ '--animate-duration': '1200ms', '--animate-delay': '400ms' }}>
        <div className="font-60">
          {
            titlePt1.split('').map((l, i) => <span className={l === 'm' ? 'space' : ''} key={i}>{l}</span>)
          }
        </div>
        <div className="font-60">
          {
            titlePt2.split('').map((l, i) => <span className={l === ' ' ? 'space' : ''} key={i}>{l}</span>)
          }
        </div>
        <div className="font-60">
          {
            titlePt3.split('').map((l, i) => <span className={l === ' ' ? 'space' : ''} key={i}>{l}</span>)
          }
        </div>
        <p>Software & Dev Ops Engineer</p>
      </h1>

      {/* As an experienced backend developer, I specialize in desktop application development. In my spare time, I develop scripts for FiveM on a role server due to my enthusiasm for programming. My passion for DevOps drives me to constantly look for new technologies and methodologies to optimize workflows. I approach every project with determination and dedication, always keeping a focus on excellence. */}
      <div className={`about_info ${breakpoint ? '' : 'animate__animated'} ${animateCont} ${animateContUp}`} style={{ '--animate-duration': '1000ms', '--animate-delay': '600ms' }}>
        <p className='text__desc'>As an experienced backend developer, I specialize in desktop application development.</p>
        <div className='text__desc'>In my spare time, I develop scripts for FiveM on a role-playing server due to my enthusiasm for programming.</div>
        <div className='text__desc'>My passion for DevOps drives me to constantly look for new technologies and methodologies to optimize workflows.</div>
        <p className='text__desc'>I approach each project with determination and dedication, always maintaining a focus on excellence.</p>
        <div className="container__proyects">
          <h2 className={`font-60 text__title ${breakpoint ? '' : 'animate__animated'} ${animateCont2} ${animateContUp2}`} style={{ '--animate-duration': '1000ms', '--animate-delay': '600ms' }}>Proyects</h2>
          <div className="proyects__wrapper" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} onWheel={handleWheel}>
            <ProjectButton
              imgUrl="https://user-images.githubusercontent.com/66271780/175243464-f2c5fdd0-5e1a-4ae3-9d48-75c44a31ba2c.png"
              title="File Explorer"
              state="In production"
              description="File Explorer, previously known as Windows Explorer, is a File manager application that is included with releases of the Microsoft Windows OS Support With Activity Log..It provides a GUI for accessing the file systems."
              tags={['C#', 'WPF']} />

            <ProjectButton
              imgUrl="https://i.imgur.com/KDJ2161.png"
              title="CoderX"
              state="Deployed"
              description="CoderX is a fast and simple application designed to capture special moments on your screen efficiently and with great precision."
              tags={['C#', 'WPF']} />

            <ProjectButton
              imgUrl="https://i.imgur.com/wrPSSY5.png"
              title="BluryX"
              state="In production"
              description="Bluryx is a Node.js library designed to integrate visual effects into desktop applications. It provides functions to enable blur effects behind windows and to extend the client frame area of windows."
              tags={['C++', 'TS', 'Python']} />

            <ProjectButton
              imgUrl="https://i.imgur.com/gavSl83.png"
              title="Automated Slide Analysis Platform"
              state="Deployed"
              description="ASAP is a platform for visualizing, annotating, and automatically analyzing whole-slide histopathology images."
              tags={['C++', 'C', 'Chancer']} />

            <ProjectButton
              imgUrl="https://i.imgur.com/b2yRmY1.png"
              title="Paradox Neon"
              state="Deployed"
              description="Paradox Neon is a versatile and powerful game launcher designed to enhance your gaming experience. With an intuitive and user-friendly interface, this application centralizes all your gaming activities in one place."
              tags={['C#', 'WPF', 'C++', 'Python']} />

          </div>
        </div>
      </div>
    </div>
  )
}





export default About