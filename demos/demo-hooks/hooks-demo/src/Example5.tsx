import { useMemo, useState } from 'react'

export default function Example5() {
  const [items] = useState([
    'Hello World',
    'JSX 简介',
    '元素渲染',
    '组件 & Props',
    'State & 生命周期',
    '事件处理',
    '条件渲染',
    '列表 & Key',
    '表单',
    '状态提升',
    '组合 vs 继承',
    'React 哲学'
  ])
  const [keyword, setKeyword] = useState('')
  
  const rows = useMemo(() => {
    return items.filter(item => item.includes(keyword))
  }, [items, keyword])

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="请输入关键词"
      />
      <hr />
      <ul>
        {rows.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
