import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cleanProps from 'clean-react-props';
import {BarIndicator} from 'react-indicators';
import pagingIndicator from './pagingIndicator';

class BarsIndicator extends Component {
  render() {
    const {
      backgroundColor,
      children,
      color,
      height,
      index,
      length,
      onIndicatorClick,
      progress,
      randomKey,
      renderIndicators,
      width,
    } = this.props;

    const indicator = (
      <BarIndicator
        backgroundColor={backgroundColor}
        color={color}
        height={height}
        width={width}
      />
    );

    return (
      <div {...cleanProps(this.props)}>
        {
          renderIndicators({
            indicator,
            index,
            keyPrefix: randomKey,
            length,
            onIndicatorClick,
            progress,
          })
        }
        {children}
      </div>
    );
  }
}

BarsIndicator.propTypes = {
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  renderIndicators: PropTypes.func,
};

BarsIndicator.defaultProps = {
  backgroundColor: '#ccc',
  color: 'black',
  height: 5,
  width: 45,
  renderIndicators: () => {},
};

export default pagingIndicator(BarsIndicator);
