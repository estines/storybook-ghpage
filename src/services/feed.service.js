const mock_data = [
  {
    note: 'Probably the best burger in Bangkok I guess..',
    img:
      'https://www.tasteofhome.com/wp-content/uploads/2017/10/exps28800_UG143377D12_18_1b_RMS-696x696.jpg'
  },
  {
    note: 'Almost perfect I guess.. ',
    img:
      'https://www.chatelaine.com/wp-content/uploads/2017/05/Bibimbap-homemade-burgers.jpg'
  },
  {
    note: 'The meat smells kind of weird but ok in general',
    img:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGU8ZrjZuZeEr-ayTEMT6oA6_7RKmZYXiq6pYJEFi74ToEv98KoA'
  },
  {
    note: 'ข้าวมันไก่อร่อยมาก',
    img: 'https://i.ytimg.com/vi/vbmN4pWruMg/maxresdefault.jpg'
  }
]

const list = () => {
  return [...mock_data, ...mock_data, ...mock_data, ...mock_data]
}

export default {
  list
}
