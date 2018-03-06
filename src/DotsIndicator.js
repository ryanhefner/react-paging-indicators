import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cleanProps from 'clean-react-props';
import { CircleIndicator } from 'react-indicators';
import pagingIndicator from './pagingIndicator';

class DotsIndicator extends Component {
  render() {
    const {
      children,
      fill,
      fillBackground,
      index,
      indicatorClassName,
      length,
      onIndicatorClick,
      progress,
      randomKey,
      renderIndicators,
      size,
      stroke,
      strokeBackground,
      strokeWidth,
    } = this.props;

    const indicator = (
      <CircleIndicator
        className={indicatorClassName}
        fill={fill}
        fillBackground={fillBackground}
        size={size}
        stroke={stroke}
        strokeBackground={strokeBackground}
        strokeWidth={strokeWidth}
      />
    );

    return (
      <div {...cleanProps(this.props)}>
        {
          renderIndicators({
            indicator,
            index,
            length,
            progress,
            keyPrefix: randomKey,
            onIndicatorClick,
          })
        }
        {children}
      </div>
    );
  }
}

DotsIndicator.propTypes = {
  fill: PropTypes.string,
  fillBackground: PropTypes.string,
  indicatorClassName: PropTypes.string,
  length: PropTypes.number,
  renderIndicators: PropTypes.func,
  size: PropTypes.number,
  stroke: PropTypes.string,
  strokeBackground: PropTypes.string,
  strokeWidth: PropTypes.number,
};

DotsIndicator.defaultProps = {
  fill: '#000',
  fillBackground: '#ccc',
  index: 0,
  length: 1,
  renderIndicators: () => {},
  size: 10,
  stroke: 'transparent',
  strokeBackground: 'transparent',
  strokeWidth: 0,
};

export default pagingIndicator(DotsIndicator);
