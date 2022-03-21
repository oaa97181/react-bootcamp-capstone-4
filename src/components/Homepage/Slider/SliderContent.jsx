import PropTypes from "prop-types";

function SliderContent({activeIndex, sliderImages}) {
    return (
        <section>
            {sliderImages.map((slide, index) => (
                <div
                    key={index}
                    className={index === activeIndex ? "slides active" : "inactive"}
                >
                    <img className="slide-image" src={slide.data.main_image.url} alt=""/>
                    <h2 className="slide-title">{slide.data.title}</h2>
                    <h3 className="slide-text">{slide.data.description[0].text}</h3>
                </div>
            ))}
        </section>
    );
}


SliderContent.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    sliderImages: PropTypes.array.isRequired,
};


export default SliderContent;
