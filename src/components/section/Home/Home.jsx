import React from 'react'
import '../../../assets/styles/hero.css'
import ComputerGraphic from '../../Graphic/ComputerGraphic'
import { useMediaQuery } from 'react-responsive'

const Home = (fullpageState) => {
    const mainTitlePt1 = 'Back-End'
    const mainTitlePt2 = 'Software'
    const mainTitlePt3 = 'Developer'
    const fpDestination = fullpageState.fullpageState.direction
    const animateCount = fpDestination === 'up' ? 'animate__slideInDown animate__delay-1s' : (fpDestination === 'down' ? 'animate__fadeOutUpBig animate__slower' : '')
    const animateCount2 = fpDestination === 'up' ? 'animate__slideInDown animate__delay-1s' : (fpDestination === 'down' ? 'animate__fadeOutUp animate__slower animate__delay-1s' : '')
    const breakpoint = useMediaQuery({ query: '(max-width: 992px)' });

    return (
        <div className='hero'>
            <img className='dots_decor'
                src={require("../../../assets/img/side-dots.png")}
                alt=""
            />
            <div className={`hero_cont ${breakpoint ? '' : 'animate__animated'} animate__fadeIn ${animateCount}`} style={{ '--animate-duration': '1000ms', '--animate-delay': '400ms' }}>
                <h1 className="font-60">
                    <div>
                        {
                            mainTitlePt1.split('').map((l, i) => <span key={i}>{l}</span>)
                        }
                    </div>
                    <div>
                        {
                            mainTitlePt2.split('').map((l, i) => <span key={i}>{l}</span>)
                        }
                    </div>
                    <div>
                        {
                            mainTitlePt3.split('').map((l, i) => <span key={i}>{l}</span>)
                        }
                    </div>
                </h1>
                <p className="hero_blurb">
                    Resolving design problems, building smart user interfaces and useful interactions, developing advanced web applications and seamless web experiences as a backend software developer.
                </p>
                <a className="text_white" href="#about">
                    About me
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M0 0h24v24H0V0z" fill="none" />
                        <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill='var(--accent-color)' />
                    </svg>
                </a>
            </div>
            <div className={`hero_graphic ${breakpoint ? '' : 'animate__animated'}  animate__fadeIn ${animateCount2}`} style={{ '--animate-duration': '1000ms', '--animate-delay': '200ms' }}>
                <ComputerGraphic />
            </div>


        </div >
    )

}

export default Home