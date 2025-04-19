const defaultScopes = ['config', 'deps']
/** @type {import('cz-git').UserConfig} */
module.exports = {
  prompt: {
    useEmoji: false,
    scopes: [...defaultScopes],
    allowEmptyScopes: false,
    defaultFooterPrefix: 'Azure Boards',
    issuePrefixes: [
      {
        name: 'Azure Boards',
        value: 'AB#',
      },
    ],
    formatMessageCB: ({ defaultMessage, footer }) => {
      if (!footer) {
        return defaultMessage
      }

      const lines = defaultMessage.split('\n')
      lines.pop()
      return lines.join('\n') + '\nRefs: ' + footer.replace(/\s/g, '')
    },
  },
}
