export default {
  snapshot: {
    navigator: 'Snapshot',
    title: 'Financial Snapshot',
  },
  cashFlow:{
    navigator:  'Cash Flow',
    title: 'Cash Flow Management',
  },
  prediction:{
    navigator:  'Prediction',
    title: 'Financial Prediction',
  },
  settings: {
    navigator: 'Settings',
    title: 'Settings',
  },
  help: {
    navigator: 'Help',
    title: 'Help',
  },
  common: {
    save: 'Save',
    cancel: 'Cancel',
    timeDelta: {
      yearsAgo: 'years ago',
      monthsAgo: 'months ago',
      weeksAgo: 'weeks ago',
      daysAgo: 'days ago',
      hoursAgo: 'hours ago',
      minutesAgo: 'minutes ago',
      secondsAgo: 'seconds ago',
      justNow: 'just now',
    },
  },
  assetManager: {
    navigator: 'Asset Manager',
    title: 'Asset Management',
    subtitle: 'Manage your assets, accounts, and financial institutions',
    myAssets: {
      title: 'My Assets',
      name: 'Name',
      type: 'Type',
      institution: 'Institution',
      balance: 'Balance',
      lastUpdated: 'Last Updated',
      actions: 'Actions',
      assetTypes: {
        cash: {
          name: 'Cash',
          color: 'indigo-darken-3',
        },
        stock: {
          name: 'Stock',
          color: 'teal-darken-3',
        },
        crypto: {
          name: 'Crypto',
          color: 'deep-orange-darken-3',
        },
      },
    },
    addNewAsset: {
      title: 'Add New Asset',
      description: 'Add a new financial account, asset or liability',
      action: 'Add Asset',
    },
    addInstitution: {
      title: 'Add Institution',
      description: 'Connect to a new bank or financial institution',
      action: 'Add Institution',
    },
    importAssets: {
      title: 'Import Assets',
      action: 'Import Data',
      description: 'Import assets from CSV or connect to external service',
    },
    flowPathManagement: {
      title: 'Flow Path Management',
      description: 'Define how money can flow between your accounts and the associated costs for each path.',
      instruction: {
        title: 'What are flow paths?',
        description: 'Flow paths define how money moves between your accounts. Each path can have associated costs like transaction fees, exchange rate spreads, or time delays. Defining these accurately helps Nexus Finance model your financial flows more precisely.',
      },
      action: 'Add Flow Path',
    },
  },
  home: {
    title: 'Welcome to Nexus Finance',
    description: 'Your all-in-one financial management solution.',
  },
  about: {
    title: 'About Nexus Finance',
    navigator: 'About',
    copyRight: {
      title: 'Notice of Copyright',
    },
  },
}
