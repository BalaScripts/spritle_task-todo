import React from 'react'
import TodoList from './components/todoList/todoList'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'

export default function App() {
  return (
    <div>
      <Header />
      <TodoList />
      <Footer />
    </div>
  )
}
