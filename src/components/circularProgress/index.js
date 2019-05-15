import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'
import CircularProgress from './CircularProgress.component'
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress)

export default class AnimatedCircularProgress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      chartFillAnimation: new Animated.Value(props.prefill || 0)
    }
  }

  componentDidMount () {
    this.animateFill()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animateFill()
    }
  }

  animateFill () {
    Animated.spring(this.state.chartFillAnimation, {
      toValue: this.props.fill,
      tension: 7,
      friction: 10
    }).start()
  }

  render () {
    const { fill, prefill, ...other } = this.props

    return <AnimatedProgress {...other} fill={this.state.chartFillAnimation} />
  }
}

AnimatedCircularProgress.propTypes = {
  style: PropTypes.object,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  prefill: PropTypes.number,
  missingDegree: PropTypes.number,
  width: PropTypes.number.isRequired,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  strokeCap: PropTypes.string
}
