export default {
  snapshot: {
    navigator: '快照',
    title: '財務快照',
  },
  cashFlow: {
    navigator: '現金流管理',
    title: '現金流管理',
    subtitle: '追蹤和管理您的現金流和定期交易',
    cashFlowSetting: {
      title: '選項',
      subtitle: {
        assetCurrency: '管理幣值',
        colorConfig: '色彩偏好',
      },
      content: {
        assetCurrency: '幣值',
      },
    },
    cashFlowManager: {
      cashFlowProjection: {
        title: '現金流預測',
      },
      upcomingCashFlows: {
        title: '現金流',
        recur: '週期',
        recurTooltip: '每 {interval} 一次',
        addNewFlow: {
          title: '新增現金流',
          flowName: '名稱',
          flowType: {
            title: '收入/支出',
            income: '收入',
            expenses: '支出',
          },
          flowAmount: '金額',
          Currency: '貨幣',
          Date: '進出帳日期',
          Recurring: '週期現金流，每隔',
        },
      },
    },
  },
  prediction: {
    navigator: '財務預測',
    title: '財務預測',
  },
  settings: {
    navigator: '設定',
    title: '設定',
  },
  help: {
    navigator: '幫助',
    title: '幫助',
  },
  common: {
    save: '儲存',
    cancel: '取消',
    timeDelta: {
      yearsAgo: '年前',
      monthsAgo: '個月前',
      weeksAgo: '週前',
      daysAgo: '天前',
      hoursAgo: '小時前',
      minutesAgo: '分鐘前',
      secondsAgo: '秒前',
      justNow: '剛剛',
    },
    interval: {
      day: '{per} 日',
      week: '{per} 週',
      month: '{per} 個月',
      quarter: '{per} 季',
      year: '{per} 年',
    },
    unit: {
      day: '日',
      week: '週',
      month: '月',
      quarter: '季',
      year: '年',
    },
  },
  assetManager: {
    navigator: '資產管理',
    title: '資產管理',
    subtitle: '管理您的資產、帳戶和金融機構',
    myAssets: {
      title: '我的資產',
      name: '名稱',
      type: '類型',
      institution: '機構',
      balance: '餘額',
      lastUpdated: '最後更新',
      actions: '操作',
      assetTypes: {
        cash: {
          name: '現金',
          color: 'indigo-darken-3',
        },
        stock: {
          name: '股票',
          color: 'teal-darken-3',
        },
        crypto: {
          name: '加密貨幣',
          color: 'deep-orange-darken-3',
        },
      },
    },
    addNewAsset: {
      title: '新增資產',
      description: '新增一個金融帳戶、資產或負債',
      action: '新增資產',
    },
    addInstitution: {
      title: '新增機構',
      description: '連接到新的銀行或金融機構',
      action: '新增機構',
      name: '機構名稱',
      website: '網站',
      actions: '操作',
    },
    importAssets: {
      title: '匯入資產',
      description: '從 CSV 匯入資產或連接到外部服務',
      action: '匯入資料',
    },
    flowPathManagement: {
      title: '流路管理',
      description: '定義資金如何在您的帳戶之間流動以及每條路徑的相關成本。',
      instruction: {
        title: '什麼是流路？',
        description: '流路定義了資金如何在您的帳戶之間移動。每條路徑可能有相關成本，例如交易費用、匯率差或時間延遲。準確定義這些有助於 Nexus Finance 更精確地模擬您的財務流動。',
      },
      action: '新增流路',
    },
  },
  home: {
    title: '歡迎使用 Nexus Finance',
    description: '您的全方位財務管理解決方案。',
  },
  about: {
    title: '關於 Nexus Finance',
    navigator: '關於',
    copyRight: {
      title: '版權聲明',
    },
  },
}
