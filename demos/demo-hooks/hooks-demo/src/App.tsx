import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'

import Example1 from './Example1'
import Example2 from './Example2'
import Example3 from './Example3'
import Example4 from './Example4'
import Example5 from './Example5'
import Example6 from './Example6'
import Example7 from './Example7'
import Example8 from './Example8'
import Example9 from './Example9'

export default function App() {
  const items = [
    {
      name: 'Example1',
      path: '/example1',
      element: <Example1 />
    },
    {
      name: 'Example2',
      path: '/example2',
      element: <Example2 />
    },
    {
      name: 'Example3',
      path: '/example3',
      element: <Example3 />
    },
    {
      name: 'Example4',
      path: '/example4',
      element: <Example4 />
    },
    {
      name: 'Example5',
      path: '/example5',
      element: <Example5 />
    },
    {
      name: 'Example6',
      path: '/example6',
      element: <Example6 />
    },
    {
      name: 'Example7',
      path: '/example7',
      element: <Example7 />
    },
    {
      name: 'Example8',
      path: '/example8',
      element: <Example8 />
    },
    {
      name: 'Example9',
      path: '/example9',
      element: <Example9 />
    }
  ]

  return (
    <BrowserRouter>
      <header className="links">
        {items.map(item => (
          <NavLink
            to={item.path}
            className={({ isActive }) => (isActive ? 'active' : '')}
            key={item.path}
          >
            {item.name}
          </NavLink>
        ))}
      </header>
      <hr />
      <main className="main">
        <Routes>
          {items.map(item => (
            <Route path={item.path} element={item.element} key={item.path} />
          ))}
        </Routes>
      </main>
    </BrowserRouter>
  )
}
