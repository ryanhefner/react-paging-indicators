import React, { PureComponent } from 'react';
import omit from 'lomit';

const renderIndicators = function ({
  indicator,
  index = 0,
  keyPrefix = 'paging-indicator-',
  length = 0,
  onIndicatorClick = () => {},
  progress = 1
}) {
  const indicators = [];

  if (!indicator) {
    return indicators;
  }

  for (let i = 0; i < length; i++) {
    indicators.push(
      React.cloneElement(indicator, {
        key: `${keyPrefix}-item-${i}`,
        progress: (i === index) ? progress : 0,
        onClick: onIndicatorClick.bind(this, i),
      })
    );
  }

  return indicators;
};

const pagingIndicator = (IndicatorComponent) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        index: props.index,
        progress: 1,
        randomKey: `indicator-pager-${Math.round(Date.now() * Math.random())}`,
        timerDisabled: false,
      };

      this.boundRenderIndicators = renderIndicators.bind(this);
      this.onTimerTimeUpdate = this.onTimerTimeUpdate.bind(this);
      this.onTimerFinish = this.onTimerFinish.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      const {
        index,
      } = nextProps;

      if (index !== this.props.index) {
        this.setState({
          index,
        });
      }
    }

    onIndicatorClick(index) {
      this.setState({
        progress: 1,
        timerDisabled: true,
        index,
      });

      if (this.props.onChange) {
        this.props.onChange(index);
      }

      if (this.props.timer) {
        clearTimeout(this.timerTimeout);
        this.timerTimeout = setTimeout(() => {
          this.setState({
            progress: 0,
            timerDisabled: false,
          });
        }, 10000);
      }
    }

    onTimerTimeUpdate({duration, progress, time}) {
      this.setState({
        progress,
      });
    }

    onTimerFinish() {
      const {
        length,
      } = this.props;

      let nextIndex = this.state.index + 1;
      if (typeof length !== 'undefined' && nextIndex === length) {
        nextIndex = 0;
      }

      this.setState({
        index: nextIndex,
      });

      if (this.props.onChange) {
        this.props.onChange(nextIndex);
      }
    }

    render() {
      const {
        children,
        timer,
      } = this.props;

      const {
        timerDisabled,
      } = this.state;

      const clonedTimer = timer && !timerDisabled
        ? React.cloneElement(timer, {
            onFinish: this.onTimerFinish,
            onTimeUpdate: this.onTimerTimeUpdate,
          })
        : null;

      return (
        <IndicatorComponent
          {...omit(this.props, ['index'])}
          {...this.state}
          renderIndicators={
            this.props.hasOwnProperty('renderIndicators')
              ? this.props.renderIndicators
              : this.boundRenderIndicators
          }
          onIndicatorClick={this.onIndicatorClick}
        >
          {children}
          {clonedTimer}
        </IndicatorComponent>
      );
    }
  }
};

export default pagingIndicator;
