import './App.scss'
import { Select, Progress } from '@douyinfe/semi-ui'
import { useEffect, useState } from 'react'
import { http } from './utils/http'

function App () {
  //设置请求地址
  const [reqAddress, setReqAddress] = useState('')
  //设置人数
  const [number, setNumber] = useState(0)

  // 获取实时人数的方法
  const getNumber = async function (value) {
    const res = await http.get(`/${value}`)
    setNumber(res.data.number)
  }



  // useEffect(() => {
  //   //当数据存在开启轮询
  //   if (reqAddress) {
  //     timer()
  //   }
  // }, [reqAddress])

  var timerfUN = function () {
    console.log('11')
  }

  var timer = window.setInterval(() => {
    // getNumber('yyy')
    console.log('1111')
  }, 5000)
  //切换选择框的回调
  const onSelect = (value) => {
    // console.log(value)
    // debugger
    setReqAddress(value)

    // if (timer) {
    //   window.clearInterval(timer)
    //   timer = false
    //   console.log(timer, '111')
    // } else {
    //   //创建定时器
    //   var timer = window.setInterval(() => {
    //     getNumber(value)
    //   }, 5000)
    //   console.log(timer, '221')
    // }

    window.clearInterval(timer)


  }

  // 获取管理处信息
  const [address, setAddress] = useState([])
  useEffect(() => {
    async function getAddress () {
      const res = await http.get('/address')
      console.log(res)
      setAddress(res.data)
    }
    getAddress()
  }, [])

  const list = address.map(item => ({ value: item.value, label: item.address }))

  return (
    <div className="App">
      <div className='title'>实时就餐人数展示</div>
      <div className='main-top'>
        {/* 昨日数据看板 */}
        {/* 用餐人数 */}
        <div className='pe-number'>
          <div className='number'>{number}</div>
          <div className='ren'>人</div>
        </div>
        {/* 管理处选择 */}
        <div className='selectForm'>
          <div className='selectForm-title'>管理处选择</div>
          <div className='select-title'>管理处：</div>
          <div><Select placeholder='请选择管理处' style={{ width: 300 }} optionList={list} onSelect={onSelect}>
          </Select>
          </div>
        </div>
        {/* 餐厅状态 */}
        <div className='pe-status'>
          <div className='pe-status-title'>
            当前承载状态
          </div>
          <div className='progress'>
            <div className='status-text'>较多</div>
            <Progress
              percent={66}
              type="circle"
              width={200}
              strokeWidth={8}
              style={{ margin: 5 }}
              stroke="var(--semi-color-warning)"
              // var(--semi-color-danger) 红
              //var(--semi-color-success) 绿
              aria-label="disk usage"
            />
          </div>
        </div>
      </div>
      <div className='logo'>
      </div>
    </div>
  )
}

export default App
