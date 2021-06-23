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
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';

class ChallengeSlider extends Component {
  render() {
    const gameData = this.props.gameData.map((data, i) => {
      return(
        <tr key={data.id}>
          <td>{data.tribe1score}</td>
          <td>{data.tribe2score}</td>
          <td>{data.tribe3score}</td>
        </tr>
      )
    })

    const RangeSlider = memo(
      ({ classes, label, onChange, value, ...sliderProps }) => {
        const [sliderVal, setSliderVal] = useState(0);
        const [mentalVal, setMentalVal] = useState(0);
        const [mouseState, setMouseState] = useState(null);

        useEffect(() => {
          setSliderVal(value);
          setMentalVal(100 - value)
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
            {100 - sliderVal} Mental
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
            Physical {sliderVal}
            <div>
            <Button variant="info"onClick={(event) => this.props.challengeRatio(sliderVal, event)}>
            Challenge Roll
            </Button>
            </div>
          </div>
        );
      }
    );
    const Slider = () => {
      const [parentVal, setParentVal] = useState(this.props.challengeRatioNum);
      const sliderValueChanged = useCallback(val => {
        console.log("NEW VALUE", val);
        this.props.sendRatioVal(val)
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
          {this.props.message === 'battle' &&
            <div>
            Battling...
            <Spinner animation="border" />
            </div>
          }
          {this.props.message === 'challenge' &&
            <div>
            Jeff - "This challenge is on"
            <Spinner animation="border" />
            </div>
          }
          {this.props.message === 'dig' &&
            <div>
            Jeff - "You gotta DIG John Locke"
            <Spinner animation="border" />
            </div>
          }
          {this.props.message === 'true' &&
            <div>
            <Table striped bordered hover size="sm">
              <thead>
              <tr>
                <th>
                Oceanic
                </th>
                <th>
                Ajira
                </th>
                <th>
                Smoke Monsters
                </th>
              </tr>
              </thead>
              <tbody>
              {gameData}
              </tbody>
            </Table>
            </div>
          }
        </div>
      );
    };
    return (
      <div>
        <Slider/>
      </div>
    );
  }
}

export default ChallengeSlider;
