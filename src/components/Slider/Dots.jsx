import PropTypes from "prop-types";

function Dots({activeIndex, onclick, sliderImage}) {
    return (
        <div className="all-dots">
            {sliderImage.map((slide, index) => (
                <span
                    key={index}
                    className={`${activeIndex === index ? "dot active-dot" : "dot"}`}
                    onClick={() => onclick(index)}
                />
            ))}
        </div>
    );
}

Dots.propTypes = {
    activeIndex: PropTypes.number.isRequired,
    onclick: PropTypes.func.isRequired,
    sliderImage: PropTypes.array.isRequired,
};

export default Dots;
