function SliderContent({activeIndex, sliderImage}) {
    return (
        <section>
            {sliderImage.map((slide, index) => (
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

export default SliderContent;
