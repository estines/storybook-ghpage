import React from 'react'
import { StyleSheet, Text, View, LayoutAnimation, Image } from 'react-native'
import { LinearGradient } from 'expo'

export default class ProgressBarClassic extends React.Component {
  constructor () {
    super()
    this.state = {
      progress: 0,
      init_animation: false
    }
  }

  componentDidMount () {
    LayoutAnimation.spring()
    setTimeout(() => {
      this.setState({ progress: this.props.progress })
    }, 0)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ progress: nextProps.progress })
  }

  componentWillUpdate () {
    LayoutAnimation.spring()
  }

  render () {
    let value = false
    let valueBalloon = false
    let label = false
    let marginTop = 0

    switch (this.props.valueStyle) {
      case 'balloon':
        valueBalloon = (
          <View style={styles.flexBox}>
            <View style={[{ flex: this.state.progress }]}>
              <View style={styles.progressBar__balloon}>
                {/* <View style={styles.progressBar__balloonArrow} /> */}
                {/* <Text style={styles.progressBar__balloonVal}>
                  {this.state.progress}%
                </Text> */}
                <Image source={require('../assets/img/progress-mascot.png')} />
              </View>
            </View>
            <View style={[{ flex: 100 - this.state.progress }]} />
          </View>
        )
        marginTop = 30

        break
      case 'none':
        break
      default:
        value = (
          <View style={styles.progressBar_mes}>
            <Text style={styles.progressBar__val}>{this.state.progress}%</Text>
          </View>
        )
        break
    }

    if (this.props.valueStyle !== 'balloon' && this.props.label) {
      marginTop = 20
      label = (
        <View style={styles.labelWrap}>
          <Text style={styles.label}>
            {this.props.label} {this.props.value && `: ${this.props.value}`}
          </Text>
        </View>
      )
    }

    const { progress } = this.state

    return (
      <View style={{ paddingTop: 30 }}>
        {valueBalloon}
        {label}
        <View
          style={[styles.flexBox, styles.progressBar, { marginTop: marginTop }]}
        >
          <View
            style={[styles.progressBar_left, { flex: this.state.progress }]}
          >
            {progress < 100 ? (
              <LinearGradient
                colors={['#FFFCFC', '#FBE2E1']}
                start={[0, 0]}
                end={[1, 1]}
                style={styles.current}
              />
            ) : (
              <View style={[styles.current, { backgroundColor: '#4CD964' }]} />
            )}
          </View>

          <View
            style={[
              styles.progressBar_right,
              { flex: 100 - this.state.progress }
            ]}
          />
        </View>
      </View>
    )
  }
}

ProgressBarClassic.defaultProps = {
  progress: 0
}

const styles = StyleSheet.create({
  current: {
    width: '100%',
    height: 20,
    borderRadius: 20,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 10,
    shadowRadius: 10
  },
  flexBox: {
    flex: 1,
    flexDirection: 'row'
  },
  progressBar: {
    overflow: 'hidden',
    height: 20,
    backgroundColor: '#E45655',
    borderRadius: 10,
    marginBottom: 5
  },
  progressBar_left: {
    backgroundColor: 'transparent',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30
  },
  progressBar_right: {
    backgroundColor: '#E45655'
  },
  progressBar_mes: {
    position: 'absolute',
    right: 0,
    paddingRight: 5,
    // lineHeight: 30,
    backgroundColor: 'rgba(0,0,0,0)',
    flexDirection: 'row'
  },
  progressBar__balloon: {
    position: 'absolute',
    right: -15,
    bottom: -30,
    backgroundColor: 'transparent',
    borderRadius: 2,
    paddingRight: 5,
    flexDirection: 'row'
  },
  progressBar__val: {
    // textAlign: 'center',
    color: '#fff'
    // lineHeight: 30,
  },
  labelWrap: {
    position: 'absolute',
    top: 0,
    left: 0.2
  },
  label: {
    color: 'rgb(0, 122, 255)',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    textAlign: 'center'
  }
})
