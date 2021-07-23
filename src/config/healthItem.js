export default {
  1: {
    name: '体重',
    icon: 'weight',
    unit: '公斤',
    recordDataTemplate: ['体重'],
    type: 0, // 0表示文字，1表示图片，2表示区域图，3表示饼图
    record: 1, // 0表示历史记录，1表示当日记录
    statistics: 1, // 0表示需要统计，1表示不需要统计
    dataType: 1, // 0表示float，1代表datetime，2表示picture
    standard: `正常:18.5<=BM\n体重过低:BMI<=18.5\n超重:23≤BMI\n肥胖:25≤BMI\n
    BMI:体重千克数除以身高米数的平方得出的数字`
  },
  2: {
    name: '身高',
    icon: 'weight',
    unit: '厘米',
    recordDataTemplate: ['身高'],
    standard: `正常:18.5<=BM\n体重过低:BMI<=18.5\n超重:23≤BMI\n肥胖:25≤BMI\n
    BMI:体重千克数除以身高米数的平方得出的数字`
  },
  3: {
    name: '血压',
    icon: 'strength',
    unit: '毫米汞柱',
    recordDataTemplate: ['收缩压', '舒张压'],
    standard: `正常:18.5<=BM\n体重过低:BMI<=18.5\n超重:23≤BMI\n肥胖:25≤BMI\n
    BMI:体重千克数除以身高米数的平方得出的数字`
  },
  4: {
    name: '血脂(总胆固醇)',
    icon: 'fat',
    unit: '毫摩尔/升',
    recordDataTemplate: ['血脂(总胆固醇)'],
    standard: `正常:18.5<=BM\n体重过低:BMI<=18.5\n超重:23≤BMI\n肥胖:25≤BMI\n
    BMI:体重千克数除以身高米数的平方得出的数字`
  },
  5: {
    name: '血糖',
    icon: 'surgar',
    unit: '毫摩尔/升',
    recordDataTemplate: ['血糖'],
    standard: `正常:18.5<=BM\n体重过低:BMI<=18.5\n超重:23≤BMI\n肥胖:25≤BMI\n
    BMI:体重千克数除以身高米数的平方得出的数字`
  },
  6: {
    name: '肺活量',
    icon: 'lung',
    unit: '毫升',
    recordDataTemplate: ['肺活量'],
    standard: `正常:18.5<=BM\n体重过低:BMI<=18.5\n超重:23≤BMI\n肥胖:25≤BMI\n
    BMI:体重千克数除以身高米数的平方得出的数字`
  },
  7: {
    name: '睡眠',
    icon: 'sleep',
    unit: '',
    recordDataTemplate: ['睡眠'],
    standard: `正常:18.5<=BM\n体重过低:BMI<=18.5\n超重:23≤BMI\n肥胖:25≤BMI\n
    BMI:体重千克数除以身高米数的平方得出的数字`
  },
  8: {
    name: '排泄物',
    icon: 'shit',
    type: 'image'
  },
  9: {
    name: '皮肤病',
    icon: 'allergy',
    type: 'image'
  }
}
