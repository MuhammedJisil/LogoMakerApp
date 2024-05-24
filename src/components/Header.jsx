import React from 'react'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

function Header({DownloadIcon}) {
  return (
    <div className='p-4 shadow-sm border flex justify-between items-center'>
      <img width="170px" src="/logo.png" alt="logo" />
      <Button className="flex gap-2 items-center" onClick={() => DownloadIcon(Date.now())}> 
      <Download className='w-4 h-4'/>Download</Button>
      </div>
  )
}

export default Header