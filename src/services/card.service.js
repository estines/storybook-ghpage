import axios from 'axios'
const auth = {
  username: 'pkey_test_59vpuimfcow6y5nochg',
  password: ''
}

const create = async data => {
  try {
    const { number, cvc, month, year, name } = data
    const card = {
      name,
      number,
      expiration_month: parseInt(month),
      expiration_year: parseInt(year),
      security_code: parseInt(cvc)
    }
    console.log(card, 'card...')
    const res = await axios.post(
      'https://vault.omise.co/tokens',
      { card },
      { auth }
    )
    const { id: card_token } = res.data
    await axios.post('/card', { card_token: card_token })
    return res.data
  } catch (err) {
    throw err
  }
}

const remove = async card => {
  try {
    const res = await axios.delete(`/card/${card}`)
    return res.data
  } catch (err) {
    throw err
  }
}

const list = async () => {
  try {
    const cards = await axios.get('/user-account/card')
    return cards.data.cards
  } catch (err) {
    throw err
  }
}

export default {
  create,
  remove,
  list
}
