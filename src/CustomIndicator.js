import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cleanProps from 'clean-react-props';
import pagingIndicator from './pagingIndicator';

class CustomIndicator extends Component {
  render() {
    const {
      children,
      indicator,
      index,
      length,
      onIndicatorClick,
      progress,
      randomKey,
      renderIndicators,
    } = this.props;

    return (
      <div {...cleanProps(this.props)}>
        {
          renderIndicators({
            indicator,
            index,
            length,
            onIndicatorClick,
            progress,
            keyPrefix: randomKey,
          })
        }
        {children}
      </div>
    );
  }
}

CustomIndicator.propTypes = {
  index: PropTypes.number,
  indicator: PropTypes.element,
  length: PropTypes.number,
  progress: PropTypes.number,
  renderIndicators: PropTypes.func,
};

CustomIndicator.defaultProps = {
  index: 0,
  length: 1,
  progress: 1,
  renderIndicators: () => {},
};

export default pagingIndicator(CustomIndicator);
