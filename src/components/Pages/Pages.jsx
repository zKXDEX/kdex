import { useEffect, useRef, useState, createRef } from 'react';
import '../../assets/styles/App.css';
import Fullpage from '../FullPage/Fullpage'
import OverlaySideLeft from '../Overlay/OverlaySideLeft'
import OverlaySideRight from '../Overlay/OverlaySideRight'
import '../../assets/styles/contact.css'

const globe = createRef()
const Pages = () => {
    const delay = 18;

    const dot = useRef(null);

    const cursorVisible = useRef(true);
    const cursorEnlarged = useRef(false);

    const endX = useRef(window.innerWidth / 2);
    const endY = useRef(window.innerHeight / 2);
    const _x = useRef(0);
    const _y = useRef(0);

    const requestRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', mouseOverEvent);
        document.addEventListener('mouseup', mouseOutEvent);
        document.addEventListener('mousemove', mouseMoveEvent);
        document.addEventListener('mouseenter', mouseEnterEvent);
        document.addEventListener('mouseleave', mouseLeaveEvent);

        // animateDotOutline();

        return () => {
            document.removeEventListener('mousedown', mouseOverEvent);
            document.removeEventListener('mouseup', mouseOutEvent);
            document.removeEventListener('mousemove', mouseMoveEvent);
            document.removeEventListener('mouseenter', mouseEnterEvent);
            document.removeEventListener('mouseleave', mouseLeaveEvent);

            cancelAnimationFrame(requestRef.current);
        };
    }, []);

    const toggleCursorVisibility = () => {
        if (cursorVisible.current) {
            dot.current.style.opacity = 1;
        } else {
            dot.current.style.opacity = 0;
        }
    };

    const toggleCursorSize = () => {
        if (cursorEnlarged.current) {
            dot.current.style.transform = 'translate(-50%, -50%) scale(0.75)';
        } else {
            dot.current.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    };

    const mouseOverEvent = () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
    };

    const mouseOutEvent = () => {
        cursorEnlarged.current = false;
        toggleCursorSize();
    };

    const mouseEnterEvent = () => {
        cursorVisible.current = true;
        toggleCursorVisibility();
        // all buttons added
    };

    const mouseLeaveEvent = () => {
        cursorVisible.current = false;
        toggleCursorVisibility();
        // all buttons removed
    };

    const mouseMoveEvent = e => {
        cursorVisible.current = true;
        toggleCursorVisibility();

        endX.current = e.pageX;
        endY.current = e.pageY;

        dot.current.style.top = endY.current + 'px';
        dot.current.style.left = endX.current + 'px';
    };

    const [hitBottom, setHitBottom] = useState(true);
    
    return (
        <>
            <div ref={dot} className="cursor-dot"></div>
            <OverlaySideLeft handleMouseOver={mouseOverEvent} handleMouseOut={mouseOutEvent} />
            <Fullpage hitBottom={hitBottom} setHitBottom={setHitBottom} />
            <OverlaySideRight hitBottom={hitBottom} handleMouseOver={mouseOverEvent} handleMouseOut={mouseOutEvent} />
        </>
    );
};

export default Pages;