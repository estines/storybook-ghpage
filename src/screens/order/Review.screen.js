import React, { Component, Fragment } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native'
import { LinearGradient } from 'expo'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import StarRating from 'react-native-star-rating'
import { TextField } from 'react-native-material-textfield'
import { connect } from 'react-redux'

// components
import GalleryPicker from '../../components/modals/GalleryPicker.component'
import CircleMenuButton from '../../components/CircleMenuBtn.component'
import Spinner from '../../components/Spinner.component'

// services
import ImageService from '../../services/image.service'
import ReviewService from '../../services/review.service'

import ErrorHandler from '../../libs/error'

class ReviewScreen extends Component {
  state = {
    show: '',
    rating: 0,
    note: '',
    galleryVisible: false,
    images: [],
    loading: false
  }

  onSelectImage = async data => {
    const { images } = this.state
    const target = await images.find(i => i === data.uri)
    if (target) {
      const new_images = await images.filter(i => i !== data.uri)
      this.setState({
        images: new_images
      })
    } else {
      const new_images = [...images, data.uri]
      console.log(new_images, 'new_images...')
      this.setState({
        images: new_images
      })
    }
  }

  openGallery = () => {
    this.setState({
      galleryVisible: true
    })
  }

  renderImages = () => {
    const { images } = this.state
    return images.map((image, index) => {
      return <Image source={{ uri: image }} style={styles.image} />
    })
  }

  cancel = () => {
    this.props.navigation.popToTop()
  }

  renderBody = () => {
    const { show, rating, note, images } = this.state
    const {
      restaurant: { name }
    } = this.props
    if (show === 'rate') {
      return (
        <Fragment>
          <View style={styles.br} />
          <Text style={styles.subTitle}>Earn 1 stamp</Text>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.br} />
          <StarRating
            disabled={false}
            maxStars={5}
            rating={rating}
            starSize={27}
            fullStarColor="#FF3B30"
            emptyStarColor="#CECECE"
            containerStyle={{ width: '80%' }}
            selectedStar={rating => this.setState({ rating })}
          />
          <View style={styles.br} />
          <View style={styles.br} />
          {images && images.length > 0 ? (
            <View style={styles.imagePreview}>{this.renderImages()}</View>
          ) : null}

          <Text style={styles.label}>
            Tell Us Why <Text style={styles.optional}>(Optional)</Text>
          </Text>
          <TextField
            multiline
            placeholder="What’s your feedback?"
            containerStyle={styles.input}
            maxLength={200}
            value={note}
            onChangeText={note => this.setState({ note })}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.textCount}>{note.length}/200</Text>
          <View style={styles.br} />
          <View style={styles.row}>
            <CircleMenuButton openGallery={this.openGallery} />
            <TouchableOpacity style={styles.circleBtn} onPress={this.done}>
              <AntDesign name="arrowright" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Image
            source={require('../../assets/icon/smile.png')}
            style={styles.icon}
          />
          <View style={styles.br} />
          <Text style={styles.title}>Please rate our food &</Text>
          <Text style={styles.title}>Get stamps in return</Text>
          <View style={styles.br} />
          <TouchableOpacity
            style={{ width: '60%' }}
            onPress={() => this.setState({ show: 'rate' })}
          >
            <LinearGradient
              style={styles.submitBtn}
              colors={['#EE805F', '#E9685F', '#E8615F']}
              start={[0, 0]}
              end={[1, 0]}
            >
              <Text style={styles.submitBtnText}>Let’s DO it !</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelBtn} onPress={this.cancel}>
            <Text style={styles.cancelText}>No, Thanks</Text>
          </TouchableOpacity>
        </Fragment>
      )
    }
  }

  close = () => {
    this.props.navigation.navigate('HomeScreen')
  }

  done = async () => {
    try {
      const { rating, note, images: localImages } = this.state
      const {
        restaurant,
        navigation: {
          state: {
            params: { orderId }
          }
        }
      } = this.props
      this.setState({ loading: true })
      const images = await ImageService.upload(localImages)
      const body = {
        rating,
        note,
        images,
        restaurantId: restaurant.id,
        orderId
      }
      await ReviewService.create(body)
      this.setState({ loading: false })
      this.props.navigation.navigate('FinishReview')
    } catch (error) {
      this.setState({ loading: false })
      ErrorHandler(error)
    }
  }

  render () {
    const { galleryVisible, images, loading } = this.state
    return (
      <ScrollView style={{ flex: 1 }} scrollEnabled={false}>
        <ImageBackground
          source={require('../../assets/img/review-bg.png')}
          style={styles.screen}
        >
          <View style={[styles.sec]} />
          <View style={[styles.first]} />
          <View style={styles.card}>
            <TouchableOpacity style={styles.closeBtn} onPress={this.close}>
              <MaterialIcons name="close" size={30} color="#FFF" />
            </TouchableOpacity>
            {this.renderBody()}
          </View>
        </ImageBackground>
        <GalleryPicker
          onClose={() => this.setState({ galleryVisible: false })}
          visible={galleryVisible}
          onSelect={this.onSelectImage}
          multiple
          selected={images}
        />
        <Spinner visible={loading} />
      </ScrollView>
    )
  }
}

const mapState = state => state.cart
export default connect(mapState)(ReviewScreen)

const { height: HEIGHT } = Dimensions.get('window')

const styles = StyleSheet.create({
  imagePreview: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginHorizontal: 5
  },
  row: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  circleBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#9ED14A',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  textCount: {
    alignSelf: 'flex-end'
  },
  input: {
    width: '100%',
    marginTop: -10
  },
  optional: {
    color: '#7E7E7E',
    fontSize: 14
  },
  label: {
    fontSize: 18,
    alignSelf: 'flex-start'
  },
  closeBtn: {
    backgroundColor: '#E5E5EA',
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 20
  },
  sec: {
    width: '80%',
    borderRadius: 0,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  first: {
    width: '90%',
    borderRadius: 0,
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cancelBtn: {
    width: '60%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#EE805F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  submitBtnText: {
    color: '#FFF'
  },
  submitBtn: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#EE805F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10
  },
  br: {
    marginVertical: 10
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 23
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: '100%',
    padding: '10%',
    paddingVertical: 80,
    alignItems: 'center'
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '5%',
    height: HEIGHT
  }
})
