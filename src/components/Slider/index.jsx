import React, {useCallback, useEffect, useState} from "react";
import SliderContent from "./SliderContent";
import Dots from "./Dots";
import Arrows from "./Arrows";
import "./slider.css";
import {useWizelineData} from "../../utils/hooks/useWizelineData";
import LoadingComponent from "../ReusableComponents/LoadingComponent";

function Slider() {
    const {data, isLoading} = useWizelineData('banner', 5);

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
        if (data?.results) {
            setLength(data.results.length - 1)
        }
    }, [data]);


    return (
        <>
            {
                isLoading ?
                    <LoadingComponent data={data}/>
                    :
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

export default Slider;