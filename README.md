# 📖 react-paging-indicators

Library of React paging indicator components that work well for carousels,
rotators, slideshows or whatever else you could use a simple paging component for.

## Install

Via [npm](https://npmjs.com/package/react-paging-indicators):

```sh
npm install --save react-paging-indicators
```

Via [Yarn](https://yarn.fyi/react-paging-indicators):

```sh
yarn add react-paging-indicators
```

## How to use

This library includes a few different components to offer you the flexibility you
need for the task at hand.

* [pagingIndicator (HOC)](#pagingindicator-hoc) - Higher order component that all the other components are wrapped in.
* [CustomIndicator](#customindicator) - Generic paging indicator component that accepts a custom indictor to display paging/progress status.
* [BarsIndicator](#barsindicator) - Simple paging indicator that uses a [BarIndicator]() component to display index/progress.
* [DotsIndicator](#dotsindicator) - Simple paging indicator that uses a [CircleIndicator]() component to display index/progress.

### pagingIndicator (HOC)

Higher order component that handles all of the core functionality for the paging
indicators, maintaining the state of the current `index`, basic `onClick` handling
for the indicators and setup/management of the `Timer` element, if supplied.

#### Properties

* `index:Number` - Index of the active indicator. (Default: `0`)

* `length:Number` - Number of indicators to render. (Default: `1`)

* `renderIndicators:Function` - Function that takes an object and allows you to customize how
the indicators are created.

Default:

```js
const renderIndicators = function ({indicator, index = 0, keyPrefix = 'keyPrefix-', length = 0, onIndicatorClick = () => {}, progress = 1}) {
  const indicators = [];

  if (!indicator) {
    return indicators;
  }

  let i = 0;
  while (i < length) {
    indicators.push(
      React.cloneElement(indicator, {
        key: `${keyPrefix}-item-${i}`,
        progress: (i === index) ? progress : 0,
        onClick: onIndicatorClick.bind(this, i),
      })
    );
  };

  return indicators;
};
```

* `timer:Element` - A `Timer`, ([react-timer-wrapper](https://npmjs.com/packages/react-timer-wrapper)),
instance that is used to progress the indicator index.

* `onChange:Function` - Callback fired whenever the `index` is changed, either via
a click handler or when a `Timer` progresses the `index`. (Default: `(index) => {}`)

#### Example

```js
import React, {PureComponent} from 'react';
import {pagingIndicator} from 'react-paging-indicators';

class CustomPagingIndicator extends PureComponent {

  ...

}

export default pagingIndicator(CustomPagingIndicator);

```

### CustomIndicator

Instead of using the `pagingIndicator` (HOC) to develop a custom pager, you can also use the
`CustomIndicator` if all you want to change is the `indicator` element that is
rendered for your pager.

#### Properties _(Supports all props supported by `pagingIndicator` with the addition of...)_

* `indicator:Element` - An indicator element to represent each index, with the option
of showing `Timer` progress if available. Works well with, [react-indicators](https://npmjs.com/packages/react-indicators).

#### Example

```js
import React, {Component} from 'react';
import Rotator from 'react-rotator';
import {CustomIndicator} from 'react-paging-indicators';
import FeatureCard from './FeatureCard';
import YourCustomIndicator from './YourCustomIndicator';

class SomethingWithPaging extends Component {
  render() {
    return (
      <Rotator
        indicator={(
          <CustomIndicator indicator={<YourCustomIndicator />} />
        )}
      >
        <FeatureCard>
          <h2>Feature #1</h2>
        </Feature>
        <FeatureCard>
          <h2>Feature #2</h2>
        </FeatureCard>
      </Rotator>
    );
  }
}
```

### BarsIndicator

Component that uses a [`BarIndicator`](https://github.com/ryanhefner/react-indicators#barindicator-)
to represent a paging indicator and optional timing progress.

#### Properties

* `indicatorClassName:String` - Class applied to the indicator items when rendered.

* `renderIndicators:Function` - Function that allows you to override the default
`renderIndicators` method.

* Along with all properties available for the [BarIndicator](https://github.com/ryanhefner/react-indicators#barindicator-),
except for `progress`, which is supplied via the optional `Timer`.

#### Example

```js
import React, {Component} from 'react';
import Rotator from 'react-rotator';
import {BarsIndicator} from 'react-paging-indicators';
import FeatureCard from './FeatureCard';

class SomethingWithPaging extends Component {
  render() {
    return (
      <Rotator
        indicator={(
          <BarsIndicator color="red" />
        )}
      >
        <FeatureCard>
          <h2>Feature #1</h2>
        </Feature>
        <FeatureCard>
          <h2>Feature #2</h2>
        </FeatureCard>
      </Rotator>
    );
  }
}
```

#### Exampel w/ `Timer`

```js
import React, {Component} from 'react';
import Rotator from 'react-rotator';
import Timer from 'react-timer-wrapper';
import {BarsIndicator} from 'react-paging-indicators';
import FeatureCard from './FeatureCard';

class SomethingWithPaging extends Component {
  render() {
    return (
      <Rotator
        indicator={(
          <BarsIndicator timer={<Timer duration={5000} />} color="red" />
        )}
      >
        <FeatureCard>
          <h2>Feature #1</h2>
        </Feature>
        <FeatureCard>
          <h2>Feature #2</h2>
        </FeatureCard>
      </Rotator>
    );
  }
}
```

More information about the `Timer` and its available options can be found on GitHub,
[`react-timer-wrapper`](https://github.com/ryanhefner/react-timer-wrapper).

### DotsPager

Component that uses a [`CircleIndicator`](https://github.com/ryanhefner/react-indicators#circleindicator-)
to represent a paging indicator and optional timing progress.

#### Properties

* `indicatorClassName:String` - Class applied to the indicator items when rendered.

* `renderIndicators:Function` - Function that allows you to override the default
`renderIndicators` method.

* Along with all properties available for the [CircleIndicator](https://github.com/ryanhefner/react-indicators#circleindicator-),
except for `progress`, which is supplied via the optional `Timer`.

#### Example

```js
import React, {Component} from 'react';
import Rotator from 'react-rotator';
import {DotsIndicator} from 'react-paging-indicators';
import FeatureCard from './FeatureCard';

class SomethingWithPaging extends Component {
  render() {
    return (
      <Rotator
        indicator={(
          <DotsIndicator fillColor="red" />
        )}
      >
        <FeatureCard>
          <h2>Feature #1</h2>
        </Feature>
        <FeatureCard>
          <h2>Feature #2</h2>
        </FeatureCard>
      </Rotator>
    );
  }
}
```

## Pairs well with...

* [react-indicators](https://github.com/ryanhefner/react-indicators)
* [react-rotator](https://github.com/ryanhefner/react-rotator)
* [react-timer-wrapper](https://github.com/ryanhefner/react-timer-wrapper)

## License

[MIT](LICENSE) © [Ryan Hefner](https://www.ryanhefner.com)
