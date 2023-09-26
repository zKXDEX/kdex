import React, { createRef } from 'react'
import '../../assets/styles/Overlay.css'

const sections = ['home', 'about', 'skills', 'challenge', 'contact']
const sideNav = createRef()

export const CheckIsActive = (destination) => {
  const list = sideNav.current.childNodes

  for (let i = 0; i < list.length; i++) {
    if (i < destination.index && !list[destination.index].classList.contains('active')) {
      list[i].classList.add('passedSection')
    } else {
      list[i].classList.remove('passedSection')
    }
  }
}

export const topBottomArrow = (destination, { setHitBottom }) => {
  if (destination.isLast) {
    setHitBottom(false)
  } else {
    setHitBottom(true)
  }
}

const OverlaySideRight = ({ hitBottom, handleMouseOver, handleMouseOut }) => {
  return (
    <div className="overlay_sides overlay_sides_right">
      <a className="btn_light" href="#contact" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
        Contact
      </a>

      <nav className="nav__wrapper">
        <ul ref={sideNav} id="side_nav">
          {sections.map((section, i) => (
            <li onClick={CheckIsActive} data-menuanchor={section} key={i} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver}>
              <a href={'#' + section} title={section}>0{i + 1}</a>
            </li>
          ))}
          <div className="line"></div>
        </ul>
      </nav>

      <div>
        {
          hitBottom ?
            <div className="btn_down" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} onClick={() => window.fullpage_api.moveSectionDown()}>
              <span>Scroll Down</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" fill="aliceblue" />
              </svg>
            </div>
            :
            <div className="btn_up" onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} onClick={() => window.fullpage_api.moveTo(1)}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z" fill="aliceblue" />
              </svg>
              <span>Back To Top</span>
            </div>
        }
      </div>
    </div>
  )
}

export default OverlaySideRight;