import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({
    children
}: LayoutProps) => {
  return (
    <div>
        <Header />
        <main>{children}</main>
        <Footer />
      
    </div>
  )
}

export default Layout
