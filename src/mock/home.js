import { Random } from 'mockjs'

export const getInfo = req => {
  // const body = JSON.parse(req.body)
  // if (body.phoneNumber === '11111111111' && body.password === '111111') {
  return {
    status: true,
    script: '获取个人信息成功',
    data: {
      id: 1,
      phoneNumber: '11111111111',
      qqNumber: '',
      name: '张三',
      avatar: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3348455303,840512329&fm=26&gp=0.jpg',
      gender: 1,
      identity: 0,
      birthday: '2020-1-10',
      age: 1,
      createTime: '2020-1-10  12:12:12'
    }
  }
  // } else if (body.phoneNumber === '22222222222' && body.password === '222222') {
  // return {
  //   status: true,
  //   script: "获取个人信息成功",
  //   data: {
  //     id: 1,
  //     phoneNumber: "22222222222",
  //     name: "刘融",
  //     avatar: "https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3348455303,840512329&fm=26&gp=0.jpg",
  //     gender: 1,
  //     hospital: "精神病院",
  //     department: "精神科",
  //     position: "小护士",
  //     identity: 1,
  //     skill: "剪指甲",
  //     introduction: "有点神经质",
  //     createTime: "2020-1-10  12:12:12"
  //   }
  // }
  // }
}

export const resetPassword = req => {
  const body = JSON.parse(req.body)
  if (body.newPassword === '222222') {
    return {
      status: true,
      script: '更新密码成功，请重新登录',
      data: {}
    }
  } else {
    return {
      status: false,
      script: '更新密码失败',
      data: {}
    }
  }
}

export const uploadFile = req => {
  return {
    status: true,
    script: '文件上传成功',
    data: {
      url: 'https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3348455303,840512329&fm=26&gp=0.jpg'
    }
  }
}

export const updateInfo = req => {
  return {
    status: true,
    script: '编辑个人信息成功',
    data: {}
  }
}

export const getHealthData = req => {
  return {
    status: true,
    script: '获取首页健康数据成功',
    data: {
      itemNameList: ['体重', '身高', '血压', '血脂(总胆固醇)', '血糖', '肺活量', '睡眠', '排泄物', '皮肤病'],
      itemData: [
        {
          id: 1,
          healthItemId: 1,
          name: '体重',
          data: 75.70,
          unit: '公斤',
          icon: 'weight',
          time: '2020-01-01 10:10:10',
          isAssign: true
        },
        {
          id: 2,
          healthItemId: 2,
          name: '身高',
          data: 173,
          unit: '厘米',
          icon: 'height',
          time: '2020-01-01 10:10:10',
          isAssign: false
        },
        {
          id: 3,
          healthItemId: 3,
          name: '血压',
          data: [60, 100],
          unit: '毫米汞柱',
          icon: 'strength',
          time: '2021-02-01 10:10:10',
          isAssign: true
        },
        {
          id: 4,
          healthItemId: 4,
          name: '血脂(总胆固醇)',
          data: 75.70,
          unit: '毫摩尔/升',
          icon: 'fat',
          time: '2021-06-02 10:10:10',
          isAssign: true
        },
        {
          id: 5,
          healthItemId: 5,
          name: '血糖',
          data: 10,
          unit: '毫摩尔/升',
          icon: 'surgar',
          time: '2021-06-02 10:10:10',
          isAssign: true
        },
        {
          id: 6,
          healthItemId: 6,
          name: '肺活量',
          data: 4000,
          unit: '毫升',
          icon: 'lung',
          time: '2021-06-02 10:10:10',
          isAssign: false
        },
        {
          id: 7,
          healthItemId: 7,
          name: '睡眠',
          data: '10:10:10',
          unit: '',
          icon: 'sleep',
          time: '2021-06-02 10:10:10',
          isAssign: true
        },
        {
          id: 8,
          healthItemId: 8,
          name: '排泄物',
          data: '[图片]',
          unit: '',
          icon: 'shit',
          time: '2021-06-02 10:10:10',
          isAssign: false
        },
        {
          id: 9,
          healthItemId: 9,
          name: '皮肤病',
          data: '[图片]',
          unit: '',
          icon: 'allergy',
          time: '2021-06-02 10:10:10',
          isAssign: false
        }
      ]
    }
  }
}

export const getHealthDetailData = req => {
  return {
    status: true,
    script: '获得详细健康数据成功',
    data: [
      // {
      //       id:1,
      //       detailData:{
      //           itemData:{
      //               id:1,
      //               name:"体重",
      //               unit:"公斤",
      //               icon: 'weight',
      //               type:0, // 0表示文字，1表示图片，2表示区域图，3表示饼图
      //               record:1, //0表示历史记录，1表示当日记录
      //               statistics:1, //0表示需要统计，1表示不需要统计
      //               dataType:0, //0表示float，1代表datetime，2表示picture
      //               newRecordName:['体重'],
      //               isAssign:true,
      //           },
      //           recordData:[
      //               {
      //                   id:1,
      //                   data:[80],
      //                   createTime:'2021-07-04 12:02:02'
      //               },
      //               {
      //                   id:2,
      //                   data:[81],
      //                    createTime:'2021-07-04 14:02:02'
      //               },
      //               {
      //                   id:3,
      //                   data:[82],
      //                   createTime:'2021-07-04 16:02:02'
      //               },
      //           ],
      //         possibleState: '非常健康',
      //         adviceColor:'green',
      //         advice:'没有建议'
      //       }
      // },
      //  {
      //       id:1,
      //       detailData:{
      //           itemData:{
      //               id:2,
      //               name:"身高",
      //               unit:"厘米",
      //               icon: 'height',
      //               type:0, // 0表示文字，1表示图片，2表示区域图，3表示饼图
      //               record:0, //0表示历史记录，1表示当日记录
      //               statistics:0, //0表示需要统计，1表示不需要统计
      //               dataType:0, //0表示float，1代表datetime，2表示picture
      //               newRecordName:['身高'],
      //               isAssign:true,
      //           },
      //           recordData:[
      //               {
      //                   id:1,
      //                   data:[172],
      //                   createTime:'2021-07-04 12:02:02'
      //               },
      //               {
      //                   id:2,
      //                   data:[173],
      //                    createTime:'2021-07-03 14:02:02'
      //               },
      //               {
      //                   id:3,
      //                   data:[174],
      //                   createTime:'2021-07-02 16:02:02'
      //               },
      //           ],
      //         possibleState: '非常健康',
      //         adviceColor:'green',
      //         advice:'没有建议'
      //       }
      //   },
      // {
      //       id:1,
      //       detailData:{
      //           itemData:{
      //               id:3,
      //               name:"血压",
      //               unit:"毫米汞柱",
      //               icon: 'strength',
      //               type:2, // 0表示文字，1表示图片，2表示区域图，3表示饼图
      //               record:1, //0表示历史记录，1表示当日记录
      //               statistics:0, //0表示需要统计，1表示不需要统计
      //               dataType:0, //0表示float，1代表datetime，2表示picture
      //               newRecordName:['舒张压','收缩压'],
      //               isAssign:true,
      //           },
      //           recordData:[
      //               {
      //                   id:1,
      //                   data:[175.2,223],
      //                   createTime:'2021-06-24 12:02:02'
      //               },
      //               {
      //                   id:2,
      //                   data:[175,224],
      //                    createTime:'2021-06-24 14:02:02'
      //               },
      //               {
      //                   id:3,
      //                   data:[175.2,227],
      //                   createTime:'2021-06-24 16:02:02'
      //               },
      //           ],
      //         possibleState: '血压偏高',
      //         adviceColor:'red',
      //         advice:'注意身体'
      //       }
      //   },
      //  {
      //       id:1,
      //       detailData:{
      //           itemData:{
      //               id:4,
      //               name:"血脂",
      //               unit:"毫摩尔/升",
      //               icon: 'fat',
      //               type:4, // 0表示文字，1表示图片，2表示区域图，3表示饼图,4代表折线图
      //               record:1, //0表示历史记录，1表示当日记录
      //               statistics:0, //0表示需要统计，1表示不需要统计
      //               dataType:0, //0表示float，1代表datetime，2表示picture
      //               newRecordName:['总胆固醇'],
      //               isAssign:true,
      //           },
      //           recordData:[
      //               {
      //                   id:1,
      //                   data:[80],
      //                   createTime:'2021-07-04 12:02:02'
      //               },
      //               {
      //                   id:2,
      //                   data:[81],
      //                    createTime:'2021-07-04 14:02:02'
      //               },
      //               {
      //                   id:3,
      //                   data:[82],
      //                   createTime:'2021-07-04 16:02:02'
      //               },
      //           ],
      //         possibleState: '非常健康',
      //         adviceColor:'green',
      //         advice:'没有建议'
      //       }
      //   },
      // {
      //     id:1,
      //     detailData:{
      //         itemData:{
      //             id:5,
      //             name:"血糖",
      //             unit:"毫摩尔/升",
      //             icon: 'surgar',
      //             type:4, // 0表示文字，1表示图片，2表示区域图，3表示饼图,4代表折线图
      //             record:1, //0表示历史记录，1表示当日记录
      //             statistics:0, //0表示需要统计，1表示不需要统计
      //             dataType:0, //0表示float，1代表datetime，2表示picture
      //             newRecordName:['血糖'],
      //             isAssign:true,
      //         },
      //         recordData:[
      //             {
      //                 id:1,
      //                 data:[80],
      //                 createTime:'2021-07-04 12:02:02'
      //             },
      //             {
      //                 id:2,
      //                 data:[81],
      //                  createTime:'2021-07-04 14:02:02'
      //             },
      //             {
      //                 id:3,
      //                 data:[82],
      //                 createTime:'2021-07-04 16:02:02'
      //             },
      //         ],
      //       possibleState: '非常健康',
      //       adviceColor:'green',
      //       advice:'没有建议'
      //     }
      // },
      //  {
      //       id:1,
      //       detailData:{
      //           itemData:{
      //               id:6,
      //               name:"肺活量",
      //               unit:"毫升",
      //               icon: 'lung',
      //               type:0, // 0表示文字，1表示图片，2表示区域图，3表示饼图,4代表折线图
      //               record:0, //0表示历史记录，1表示当日记录
      //               statistics:1, //0表示需要统计，1表示不需要统计
      //               dataType:0, //0表示float，1代表datetime，2表示picture
      //               newRecordName:['肺活量'],
      //               isAssign:true,
      //           },
      //           recordData:[
      //               {
      //                   id:1,
      //                   data:[4234],
      //                   createTime:'2021-07-04 12:02:02'
      //               },
      //               {
      //                   id:2,
      //                   data:[4231],
      //                    createTime:'2021-07-03 14:02:02'
      //               },
      //               {
      //                   id:3,
      //                   data:[3823],
      //                   createTime:'2021-07-02 16:02:02'
      //               },
      //           ],
      //         possibleState: '非常健康',
      //         adviceColor:'green',
      //         advice:'没有建议'
      //       }
      //   },
      // {
      //   id: 1,
      //   detailData: {
      //     itemData: {
      //       id: 7,
      //       name: '睡眠',
      //       unit: '无',
      //       icon: 'sleep',
      //       type: 3, // 0表示文字，1表示图片，2表示区域图，3表示饼图,4表示折线图
      //       record: 0, // 0表示历史记录，1表示当日记录
      //       statistics: 1, // 0表示需要统计，1表示不需要统计
      //       dataType: 1, // 0表示float，1代表datetime，2表示picture
      //       newRecordName: ['入睡时间', '睡醒时间'],
      //       isAssign: true
      //     },
      //     recordData: [
      //       {
      //         id: 1,
      //         data: ['2021-07-03 23:11:23', '2021-07-04 06:30:24'],
      //         createTime: '2021-07-04 12:02:02'
      //       },
      //       {
      //         id: 2,
      //         data: ['2021-07-01 23:11:23', '2021-07-02 03:30:24'],
      //         createTime: '2021-07-03 12:02:02'
      //       },
      //       {
      //         id: 3,
      //         data: ['2021-06-30 23:11:23', '2021-07-01 06:30:24'],
      //         createTime: '2021-07-02 12:02:02'
      //       }
      //     ],
      //     possibleState: '非常健康',
      //     adviceColor: 'green',
      //     advice: '没有建议'
      //   }
      // }
      {
        id: 11,
        detailData: {
          itemData: {
            id: 9,
            name: '排泄物',
            unit: '无',
            icon: 'sleep',
            type: 1, // 0表示文字，1表示图片，2表示区域图，3表示饼图,4表示折线图
            record: 0, // 0表示历史记录，1表示当日记录
            statistics: 0, // 0表示需要统计，1表示不需要统计
            dataType: 2, // 0表示float，1代表datetime，2表示picture
            newRecordName: ['排泄物照片'],
            isAssign: true
          },
          recordData: [
            {
              id: 1,
              data: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=199412028,2333531255&fm=26&gp=0.jpg', 'https://th.bing.com/th/id/OIP.hoRufpMOOSBsZE43KScOwAHaHa?w=221&h=220&c=7&o=5&dpr=2&pid=1.7', 'https://th.bing.com/th/id/OIP.F__-JRrRzHl83qYKjNKBVQHaDn?w=317&h=170&c=7&o=5&dpr=2&pid=1.7'],
              createTime: '2021-07-04 12:02:02'
            },
            {
              id: 2,
              data: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=199412028,2333531255&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=199412028,2333531255&fm=26&gp=0.jpg'],
              createTime: '2021-07-03 12:02:02'
            },
            {
              id: 3,
              data: ['https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=199412028,2333531255&fm=26&gp=0.jpg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=199412028,2333531255&fm=26&gp=0.jpg'],
              createTime: '2021-07-02 12:02:02'
            }
          ],
          possibleState: '非常健康',
          adviceColor: 'green',
          advice: '没有建议'
        }
      }
    ]
  }
}

export const getHealthStatisticsData = req => {
  // return {
  //   status: true,
  //   script: '获得统计健康数据成功',
  //   data: {
  //     statisticsData: {
  //       startTime: '2021-01-12 12:02:02',
  //       endTime: '2021-01-14 12:02:02',
  //       type: 1, // 0表示柱状图，1代表折线图
  //       statisticsName: [
  //         {
  //           name: '最高',
  //           data: '78公斤'
  //         },
  //         {
  //           name: '最低',
  //           data: '78公斤'
  //         }
  //       ]
  //     },
  //     allRecordData: [
  //       {
  //         id: 1,
  //         data: [80],
  //         createTime: '2021-01-12 12:02:02'
  //       },
  //       {
  //         id: 2,
  //         data: [82],
  //         createTime: '2021-01-13 12:02:02'
  //       },
  //       {
  //         id: 3,
  //         data: [84],
  //         createTime: '2021-01-14 12:02:02'
  //       },
  //       {
  //         id: 34,
  //         data: [77],
  //         createTime: '2021-01-15 12:02:02'
  //       }
  //     ]
  //   }
  // }
  return {
    status: true,
    script: '获得统计健康数据成功',
    data: {
      statisticsData: {
        startTime: '2021-01-12 12:02:02',
        endTime: '2021-01-14 12:02:02',
        type: 0, // 0表示柱状图，1代表折线图
        statisticsName: [
          {
            name: '平均清醒时长',
            data: '7小时'
          },
          {
            name: '平均睡眠时长',
            data: '7小时'
          },
          {
            name: '平均入睡时间',
            data: '11:30'
          },
          {
            name: '平均清醒时间',
            data: '6:30'
          }
        ]
      },
      allRecordData: [
        {
          id: 1,
          data: ['2021-07-03 23:11:23', '2021-07-04 06:30:24'],
          createTime: '2021-07-04 12:02:02'
        },
        {
          id: 2,
          data: ['2021-07-01 20:11:23', '2021-07-02 04:30:24'],
          createTime: '2021-07-03 12:02:02'
        },
        {
          id: 3,
          data: ['2021-06-30 22:11:23', '2021-07-01 08:30:24'],
          createTime: '2021-07-02 12:02:02'
        }
      ]
    }
  }
}

export const getChatList = req => {
  const num1 = parseInt(Math.random() * 20 + 1)
  const num2 = parseInt(Math.random() * 20 + 1)
  const data = {}
  const generateChatList = (num) => {
    const returnData = []
    for (let i = 0; i < num; i++) {
      returnData.push({
        id: Random.integer(0, 30),
        userOrDoctorId: Random.integer(0, 100000),
        name: Random.cname(),
        avatar: 'https://i.loli.net/2017/08/21/599a521472424.jpg',
        possibleDisease: Random.ctitle(2, 10),
        notReadNum: Random.integer(0, 5),
        chat: Random.cparagraph()
      })
    }
    return returnData
  }
  data.isAssign = generateChatList(num1)
  data.notAssign = generateChatList(num2)
  return {
    status: true,
    script: '获取聊天列表成功',
    data
  }
}
