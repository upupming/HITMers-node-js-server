# 空闲教室查询

请求：

```js
jxlarr: [
  {'lhmc':'一区主楼','lhdm':'002'},
  {'lhmc':'电机楼','lhdm':'019'},
  {'lhmc':'机械楼','lhdm':'012'},
  {'lhmc':'正心楼','lhdm':'016'},
  {'lhmc':'致知楼','lhdm':'025'},
  {'lhmc':'格物楼','lhdm':'015'},
  {'lhmc':'诚意楼','lhdm':'027'},
  {'lhmc':'管理楼','lhdm':'022'},
  {'lhmc':'理学楼','lhdm':'018'},
  {'lhmc':'土木楼','lhdm':'006'},
  {'lhmc':'二区主楼','lhdm':'033'},
  {'lhmc':'东配楼','lhdm':'032'},
  {'lhmc':'西配楼','lhdm':'042'},
  {'lhmc':'车库楼','lhdm':'043'},
  {'lhmc':'交通学院','lhdm':'037'},
  {'lhmc':'青年公寓','lhdm':'044'}
]


url: 'https://weixin.hit.edu.cn/app/kxjscx/kxjscxapp/getKxjs',
method: 'POST',
header: {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
},
data: {
  info: JSON.stringify({
    lhdm: buildingCode, // 例如：正心楼为 '016'
    rq: date // 例如：2018-09-16
  })
}
```

返回值：

```js
{
  isSuccess: true,
  module: {
    jsArr: [
      {
        cddm, // 教室代码，例如：'0230'
        cdmc, // 教室名称，例如：'正心120'
      },
      // ...
    ],
    ksjsArr: [
      {
        cddm: "0234", 
        cdmc: "正心203"
        jc, // 将每天分为 6 个区间段（1-2节、3-4节、5-6节、7-8节、9-10节、11-12节），取值范围：1——6，表示当天教室被占用
        lhdm: "016"
        lhmc: "正心楼"
        xiaoqudm: "1"
        xiaoqumc: "一校区"
        xqj: "1"
      },
      // ...
    ]
  }
}
```