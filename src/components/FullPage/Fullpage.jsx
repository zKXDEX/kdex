import React, { useState, useEffect } from "react";

import "../../assets/styles/fullpage.css";
import Home from "../section/Home/Home";
import About from "../section/About/About";
import Skills from "../section/Skills/Skills";
import Challenge from "../section/Challenge/Challenge";
import Contact from "../section/Contact/Contact";
import ReactFullpage from "@fullpage/react-fullpage";
import 'fullpage.js/dist/fullpage.css'
import { CheckIsActive, topBottomArrow } from "../Overlay/OverlaySideRight";
import { useMediaQuery } from "react-responsive";

const pluginWrapper = () => {
    require("./fullpage.scrollHorizontally.min");
};

const Fullpage = ({ hitBottom, setHitBottom }) => {
    const [slideIndex, setSlideIndex] = useState("");
    const breakpoint = useMediaQuery({ query: "(max-width: 992px)" });

    const onMouseEnter = () => {
        window.fullpage_api.setAllowScrolling(false);
    };

    const onMouseLeave = () => {
        window.fullpage_api.setAllowScrolling(true);
    };

    const onFullPageLeave = (origin, destination, direction) => {
        // window.history.pushState({}, '', '/' + destination.anchor);
        CheckIsActive(destination);
        topBottomArrow(destination, { hitBottom, setHitBottom });
    };

    const onSlideLeave = (section, origin, destination, direction) => {
        setSlideIndex(origin);
    };

    useEffect(() => {
        if (breakpoint) {
            window.fullpage_api.setResponsive(true);
        } else {
            window.fullpage_api.setResponsive(false);
        }
    }, [breakpoint]);
    return (
        <>
            <ReactFullpage
                css3={true}
                menu={"#side_nav"}
                anchors={["home", "about", "skills", "challenge", "contact"]}
                navigationTooltips={["firstSlide", "secondSlide"]}
                scrollingSpeed={1200}
                fitToSection={true}
                fitToSectionDelay={2000}
                controlArrows={false}
                licenseKey={'23178836-0E20405D-AFA4D383-B2B41649'}
                easing={"easeInOutCubic"}
                easingcss3={"cubic-bezier(0.88,0,0.265,1)"}
                onLeave={onFullPageLeave}
                onSlideLeave={onSlideLeave}
                dragAndMove={true}
                slidesNavigation={true}
                render={({ state, fullpageApi }) => {
                    return (
                        <ReactFullpage.Wrapper>
                            <div className="fullpage">
                                <div>
                                    <div className="section">
                                        <div className="innerin">
                                            <Home fullpageState={state} slideIndex={slideIndex}/>
                                        </div>
                                    </div>

                                    <div className="section">
                                        <div className="innerin">
                                            <About
                                                fullpageState={state}
                                                onMouseEnter={onMouseEnter}
                                                onMouseLeave={onMouseLeave}
                                                slideIndex={slideIndex}
                                            />
                                        </div>
                                    </div>

                                    <div className={`section`}>
                                        <div className="innerin">
                                            <Skills fullpageState={state} slideIndex={slideIndex}/>
                                        </div>
                                    </div>

                                    <div className={`section`}>
                                        <div className="innerin">
                                            <Challenge fullpageState={state} slideIndex={slideIndex}/>

                                        </div>
                                    </div>

                                    <div className={`section`}>
                                        <div className="innerin contact_in">
                                            <Contact fullpageState={state} slideIndex={slideIndex}/>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
        </>
    );
};

export default Fullpage;
