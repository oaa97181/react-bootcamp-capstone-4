import React, {useEffect, useState} from "react";
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import Arrows from "./Arrows";
import "./slider.css";

function Slider({data}) {

    const length = data.results.length - 1;

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, length]);

    function nextSlide() {
        return setActiveIndex(activeIndex === length ? 0 : activeIndex + 1)
    }

    return (
        <div className="slider-container">
            <SliderContent activeIndex={activeIndex} sliderImage={data.results}/>
            <Arrows
                prevSlide={() =>
                    setActiveIndex(activeIndex < 1 ? length : activeIndex - 1)
                }
                nextSlide={() =>
                    nextSlide()
                }
            />
            <Dots
                activeIndex={activeIndex}
                sliderImage={data.results}
                onclick={(activeIndex) => setActiveIndex(activeIndex)}
            />
        </div>
    );
}

export default Slider;