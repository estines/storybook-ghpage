import { getStorybookUI, addDecorator, configure } from '@storybook/react-native'
import { withNotes } from '@storybook/addon-ondevice-notes'

import './rn-addons'

// register addons globally
addDecorator(withNotes)

// import stories
configure(() => {
  require('./stories')
}, module)

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({})

export default StorybookUIRoot
