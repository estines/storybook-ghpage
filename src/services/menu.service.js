const options = [
  {
    id: 1,
    name: 'Noodle',
    required: true,
    options: [
      { id: 1, name: 'Rice Noodle', price: 0 },
      { id: 2, name: 'Black Noodle', price: 10 },
      { id: 3, name: 'Ramen Noodle', price: 20 },
      { id: 4, name: 'Instant Noodle', price: 30, highlight: true }
    ]
  },
  {
    id: 2,
    name: 'Soup',
    required: true,
    options: [
      { id: 5, name: 'Egg', price: 0, highlight: true },
      { id: 6, name: 'Miso', price: 5 },
      { id: 7, name: 'Chicken', price: 20.25 }
    ]
  },
  {
    id: 3,
    name: 'Topping',
    multiple: true,
    options: [
      { id: 8, name: 'Pork Slides', price: 0 },
      { id: 9, name: 'Fish Flakes', price: 5 },
      { id: 10, name: 'Grilled Chicken', price: 20 },
      { id: 11, name: 'Beef Slides', price: 30, highlight: true },
      { id: 12, name: 'Seaweeds', price: 10 }
    ]
  }
]

const gallery = [
  'https://img.taste.com.au/_8hW157z/w720-h480-cfill-q80/taste/2017/08/ramen-129052-2.jpg',
  'http://seonkyounglongest.com/wp-content/uploads/2018/04/shoyu-ramen-1.jpg',
  'https://i.ytimg.com/vi/aafmrrx7Bh4/maxresdefault.jpg'
]

const menu = [
  {
    id: 1,
    img: require('../assets/img/mock_menu/teriyaki.png'),
    name: 'Teriyaki Chicken Ramen',
    description: 'Chicken noodle with Teriyaki sauce',
    price: 150,
    estimated_time: '10 - 15 mins',
    options,
    gallery
  },
  {
    id: 2,
    img: require('../assets/img/mock_menu/yakisoba.png'),
    name: 'Yakisoba ',
    description: 'Fried noodles with black sauce',
    price: 110,
    estimated_time: '10 - 15 mins',
    options,
    gallery
  },
  {
    id: 3,
    img: require('../assets/img/mock_menu/shabu_ramen.png'),
    name: 'Shabu Ramen',
    description: 'Japanese noodles with Pork slides',
    price: 160,
    estimated_time: '10 - 15 mins',
    options,
    gallery
  },
  {
    id: 4,
    img: require('../assets/img/mock_menu/mi_goreng.png'),
    name: 'Mi Goreng',
    description: 'Indonesian noodle with vegetables',
    price: 100,
    estimated_time: '10 - 15 mins',
    options,
    gallery
  }
]

const list = () => {
  return menu
}

export default {
  list
}
