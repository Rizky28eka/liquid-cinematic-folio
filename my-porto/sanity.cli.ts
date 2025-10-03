import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '889te60g',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
    appId: 'lucfayl2j5ga9kafn4gj7mkx',
  }
})
