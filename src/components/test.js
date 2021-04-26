import React, {
  Component,
  memo,
  useCallback,
  useState,
  useEffect,
  useMemo,
  props
} from "react";
import { render } from "react-dom";
import "./style.css";

class Test extends Component {
  render() {
    const RangeSlider = memo(
      ({ classes, label, onChange, value, ...sliderProps }) => {
        const [sliderVal, setSliderVal] = useState(0);
        const [mentalVal, setMentalVal] = useState(0);
        const [mouseState, setMouseState] = useState(null);

        useEffect(() => {
          setSliderVal(value);
          setMentalVal(100 - value)
          this.props.challengeRatio(value)
        }, [value]);

        const changeCallback = e => {
          setSliderVal(e.target.value);
        };

        useEffect(() => {
          if (mouseState === "up") {
            onChange(sliderVal);
          }
        }, [mouseState]);
        return (
          <div className="range-slider">
            <p>{label}</p>
            <h3>Physical: {sliderVal}</h3>
            <h3>Mental: {100 - sliderVal}</h3>
            Mental
            <input
              type="range"
              value={sliderVal}
              {...sliderProps}
              className={`slider ${classes}`}
              id="myRange"
              onChange={changeCallback}
              onMouseDown={() => setMouseState("down")}
              onMouseUp={() => setMouseState("up")}
            />
            Physical
          </div>
        );
      }
    );
    const Slider = () => {
      const [parentVal, setParentVal] = useState(50);
      const sliderValueChanged = useCallback(val => {
        console.log("NEW VALUE", val);
        setParentVal(val);
      });

      const sliderProps = useMemo(
        () => ({
          min: 0,
          max: 100,
          value: parentVal,
          step: 5,
          label: "Challenge Slider",
          onChange: e => sliderValueChanged(e)
        }),
        [parentVal]
      );

      return (
        <div>
          <RangeSlider {...sliderProps} classes="additional-css-classes" />
        </div>
      );
    };
    return (
      <div>
        test Hello world
        <Slider/>
      </div>
    );
  }
}

export default Test;
