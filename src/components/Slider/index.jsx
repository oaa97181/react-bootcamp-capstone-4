import React, {useCallback, useEffect, useState} from "react";
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import Arrows from "./Arrows";
import "./slider.css";
import PropTypes from "prop-types";

function Slider({data, isLoading}) {

    const [activeIndex, setActiveIndex] = useState(0);
    const [length, setLength] = useState(0);

    const nextSlide = useCallback(
        () => {
            return setActiveIndex(activeIndex === length ? 0 : activeIndex + 1)
        },
        [activeIndex, length]);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 5000);
        return () => clearInterval(interval);
    }, [activeIndex, length, nextSlide]);

    useEffect(() => {
        if (data.results) {
            console.log(data)
            setLength(data.results.length - 1)
        }
    }, [data]);


    return (
        <>
            {
                !isLoading &&
                <div className="slider-container">
                    <SliderContent activeIndex={activeIndex} sliderImages={data.results}/>
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
            }
        </>
    );
}

Slider.propTypes = {
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default Slider;