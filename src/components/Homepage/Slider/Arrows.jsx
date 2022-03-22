import PropTypes from "prop-types";

function Arrows({prevSlide, nextSlide}) {
    return (
        <div className="arrows">
      <span className="prev" onClick={prevSlide}>
        &#10094;
      </span>
            <span className="next" onClick={nextSlide}>
        &#10095;
      </span>
        </div>
    );
}

Arrows.propTypes = {
  prevSlide: PropTypes.func.isRequired,
  nextSlide: PropTypes.func.isRequired,
};

export default Arrows;
