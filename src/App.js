import './App.scss'
import { Select, Progress } from '@douyinfe/semi-ui'
import { useEffect, useState } from 'react'
import { http } from './utils/http'

function App () {

  //设置请求地址
  const [reqAddress, setReqAddress] = useState('')
  //设置人数
  const [number, setNumber] = useState(0)

  useEffect(() => {
    // 获取实时人数的方法
    const getNumber = async function () {
      const res = await http.get(`/${reqAddress}`)
      setNumber(res.data.number)
    }
    //当数据存在开启轮询
    if (reqAddress) {
      var timer = setInterval(() => {
        getNumber()
      }, 3000)
    }

    //清除上一个useEffect实现切换管理处清除定时器
    return () => {
      clearInterval(timer)
    }
  }, [reqAddress])


  //切换选择框的回调
  const onSelect = (value) => {
    setReqAddress(value)
  }

  // 获取管理处信息
  const [address, setAddress] = useState([])
  useEffect(() => {
    async function getAddress () {
      const res = await http.get('/address')
      // console.log(res)
      setAddress(res.data)
    }
    getAddress()
  }, [])

  const list = address.map(item => ({ value: item.value, label: item.address }))

  //百分比进度条计算
  //设置仓库存储基准值
  const baseNumber = 450 //测试数据，实际从后台获取
  const percent = (number / baseNumber) * 100

  //进度条颜色变化
  const progressColor = () => {
    if (percent < 50) {
      return "var(--semi-color-success)"
    } else if (percent >= 50 && percent <= 75) {
      return "var(--semi-color-warning)"
    } else if (percent > 75) {
      return "var(--semi-color-danger)"
    }
  }

  const [progressText, setProgressText] = useState('空闲')

  //文字颜色变化

  const [TextclassName, setTextclassName] = useState('status-text-success')

  const className = () => {
    if (percent < 50) {
      setTextclassName('status-text-success')
    } else if (percent >= 50 && percent <= 75) {
      setTextclassName('status-text-waring')
    } else if (percent > 75) {
      setTextclassName('status-text-danger')
    }
  }

  //文字变化
  const changeText = () => {
    if (percent < 50) {
      setProgressText('空闲')
    } else if (percent >= 50 && percent <= 75) {
      setProgressText('较多')
    } else if (percent > 75) {
      setProgressText('拥挤')
    }
  }




  useEffect(() => {
    progressColor()
    changeText()
    className()
  }, [percent])








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
          <div className='progress' >
            <div className={TextclassName}>{progressText}</div>
            <Progress
              percent={percent}
              type="circle"
              width={200}
              strokeWidth={8}
              style={{ margin: 5 }}
              stroke={progressColor()}
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
