const Mock = require('mockjs')

Mock.mock('/kjsHome/getData', (req, res) => {

  return [
    {
      'bankName': '工商银行',
      'info': [
        {
          'accountNo': 'NO.1234567',
          'accountName': 'aaaa',
          'currCode': 'CNY',
          'balance': 1000.00,
          'avlBal': 400.00,
          'frzBal': 600.00
        },
        {
          'accountNo': 'NO.1234567',
          'accountName': 'aaaa',
          'currCode': 'CNY',
          'balance': 1000.00,
          'avlBal': 400.00,
          'frzBal': 600.00
        },
        {
          'accountNo': 'NO.1234567',
          'accountName': 'aaaa',
          'currCode': 'CNY',
          'balance': 1000.00,
          'avlBal': 400.00,
          'frzBal': 600.00
        },
      ]
    },
    {
      'bankName': '农业银行',
      'info': [
        {
          'accountNo': 'NO.1234567',
          'accountName': 'aaaa',
          'currCode': 'CNY',
          'balance': 1000.00,
          'avlBal': 400.00,
          'frzBal': 600.00
        },
        {
          'accountNo': 'NO.1234567',
          'accountName': 'aaaa',
          'currCode': 'CNY',
          'balance': 1000.00,
          'avlBal': 400.00,
          'frzBal': 600.00
        },
        {
          'accountNo': 'NO.1234567',
          'accountName': 'aaaa',
          'currCode': 'CNY',
          'balance': 1000.00,
          'avlBal': 400.00,
          'frzBal': 600.00
        },
      ]
    },
    {
      'bankName': '华夏银行',
      'info': [
        {
          'accountNo': 'NO.1234567',
          'accountName': 'aaaa',
          'currCode': 'CNY',
          'balance': 1000.00,
          'avlBal': 400.00,
          'frzBal': 600.00
        },
        {
          'accountNo': 'NO.1234567',
          'accountName': 'aaaa',
          'currCode': 'CNY',
          'balance': 1000.00,
          'avlBal': 400.00,
          'frzBal': 600.00
        },
        {
          'accountNo': 'NO.1234567',
          'accountName': 'aaaa',
          'currCode': 'CNY',
          'balance': 1000.00,
          'avlBal': 400.00,
          'frzBal': 600.00
        },
      ]
    },
  ]
})
