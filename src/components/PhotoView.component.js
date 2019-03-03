import React, { Component } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import ImageView from 'react-native-image-view'

const WIDTH = Dimensions.get('window').width

export default class PhotoView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 0,
      modalVisible: false,
      imageHeights: []
    }
    this.sources = this.props.sources
    this.pagePrevious = undefined
    this.isScrolling = false
  }

  componentWillMount () {
    let imageHeights = []
    this.sources.map((url, index) => {
      Image.getSize(url, (width, height) => {
        imageHeights[index] = height
        this.setState({
          imageHeights: imageHeights
        })
      })
    })
  }

  getPagedPhotoView () {
    return this.sources.map((url, index) => {
      const size = this.props.showOriginalCover ? 'original' : 'thumbnail'
      const uri = `https://orderking.s3.amazonaws.com/images/${size}/${url}`
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => this._onPressScrollView(index)}
        >
          <View
            style={{
              width: this.props.width || WIDTH,
              height: this.props.height
            }}
          >
            <Image
              style={{
                height: this.props.height,
                width: this.props.width || 'auto'
              }}
              source={{ uri }}
              resizeMode={'cover'}
            />
          </View>
        </TouchableWithoutFeedback>
      )
    })
  }

  getStackVerticalPhotoView () {
    return this.sources.map((url, index) => {
      return (
        <TouchableWithoutFeedback key={index}>
          <View style={{ height: this.state.imageHeights[index] }}>
            <Image
              style={{
                flex: 1,
                marginTop: index !== 0 ? this.props.modalImageGap : 0,
                resizeMode: 'contain'
              }}
              source={{ uri: url }}
              resizeMode={'contain'}
            />
          </View>
        </TouchableWithoutFeedback>
      )
    })
  }

  getIndicators () {
    return this.sources.map((url, index) => {
      return this.getIndicatorViews(index)
    })
  }

  getIndicatorViews (index) {
    return (
      <View
        key={index}
        style={{
          backgroundColor:
            this.state.page === index
              ? this.props.styleIndicatorColorSelected
              : this.props.styleIndicatorColor,
          borderRadius: this.props.styleIndicatorBorderRadius,
          borderWidth: this.props.styleIndicatorBorderWidth,
          borderColor: this.props.styleIndicatorBorderColor,
          height: this.props.styleIndicatorHeight,
          marginHorizontal: this.props.styleIndicatorGap,
          width: this.props.styleIndicatorWidth
        }}
      />
    )
  }

  _onScroll = e => {
    let offset = e.nativeEvent.contentOffset
    if (offset) {
      const width = this.props.width || WIDTH
      let page = Math.round(offset.x / width)
      if (page === this.pagePrevious) {
        return
      }
      this.pagePrevious = page
      if (this.state.page !== page) {
        this.setState({ page: page })
      }
    }
  }

  _onPressScrollView = targetImage => {
    if (this.isScrolling) {
      return
    }
    this.setState({
      modalVisible: true,
      targetImage
    })
  }

  _onPressBtnCloseModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  _onRequestClose = () => {}

  render () {
    const { targetImage } = this.state
    const images = this.props.sources.map(s => ({
      source: {
        uri: `https://orderking.s3.amazonaws.com/images/original/${s}`
      },
      width: WIDTH,
      resizeMode: 'contain'
    }))

    return (
      <View style={{ height: this.props.height }}>
        <ScrollView
          bounces={false}
          centerContent={true}
          horizontal={true}
          onScroll={this._onScroll}
          pagingEnabled={true}
          style={{
            height: this.props.height,
            backgroundColor: this.props.styleBackgroundColor
          }}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={256}
          directionalLockEnabled={true}
          onScrollBeginDrag={() => {
            this.isScrolling = true
          }}
          onScrollEndDrag={() => {
            this.isScrolling = false
          }}
        >
          {this.getPagedPhotoView()}
        </ScrollView>
        <View
          style={[
            {
              backgroundColor: 'transparent',
              top: this.props.height - this.props.styleIndicatorBoardHeight,
              height: this.props.styleIndicatorBoardHeight
            },
            styles.indicatorBoardDefault
          ]}
        >
          {this.getIndicators()}
        </View>
        <ImageView
          images={images}
          imageIndex={targetImage}
          isVisible={this.state.modalVisible}
          backgroundColor="#000"
          onClose={() => this.setState({ modalVisible: false })}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  indicatorBoardDefault: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0
  }
})

PhotoView.defaultProps = {
  modalHeader: '',
  modalHeaderClose: 'Close',
  modalImageGap: 6,
  sources: [],
  styleModalHeader: {},
  styleModalHeaderClose: {},
  styleBackgroundColor: 'rgba(0, 0, 0, 1)',
  styleIndicatorBoardHeight: 20,
  styleIndicatorBoardBackgroundColor: 'rgba(0, 0, 0, .7)',
  styleIndicatorBorderColor: 'rgba(0, 0, 0, .0)',
  styleIndicatorBorderWidth: 0,
  styleIndicatorBorderRadius: 5,
  styleIndicatorColor: 'rgba(110, 110, 110, .7)',
  styleIndicatorColorSelected: 'rgba(255, 255, 255, .8)',
  styleIndicatorGap: 5,
  styleIndicatorHeight: 10,
  styleIndicatorWidth: 10,
  showOriginalCover: false
}
