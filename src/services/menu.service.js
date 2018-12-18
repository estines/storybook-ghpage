const menu = [
  {
    id: 1,
    img: require('../assets/img/mock_menu/teriyaki.png'),
    name: 'Teriyaki Chicken Ramen',
    description: 'Chicken noodle with Teriyaki sauce',
    price: 150
  },
  {
    id: 2,
    img: require('../assets/img/mock_menu/yakisoba.png'),
    name: 'Yakisoba ',
    description: 'Fried noodles with black sauce',
    price: 110
  },
  {
    id: 3,
    img: require('../assets/img/mock_menu/shabu_ramen.png'),
    name: 'Shabu Ramen',
    description: 'Japanese noodles with Pork slides',
    price: 160
  },
  {
    id: 4,
    img: require('../assets/img/mock_menu/mi_goreng.png'),
    name: 'Mi Goreng',
    description: 'Indonesian noodle with vegetables',
    price: 100
  }
]

const list = () => {
  return menu
}

export default {
  list
}
