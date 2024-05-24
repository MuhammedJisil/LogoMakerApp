import './App.css'
import Header from './components/Header'
import SideNav from './components/SideNav'
import IconController from './components/IconController'
import BackgroundController from './components/BackgroundController'
import React, {useState} from 'react'
import LogoPreview from './components/LogoPreview'
import { UpdateStorageContext } from './context/UpdateStorageContext'

function App() {
  const [selectedIndex, setSelectedIndex] = useState();
  const [updateStorage, setUpdateStorage] = useState({});
  const [downloadIcon, setDownloadIcon] = useState();

  return (
    <UpdateStorageContext.Provider value={{updateStorage, setUpdateStorage}}>
    <>
    <Header DownloadIcon={setDownloadIcon}/>

    <div className='w-64 fixed'>
        <SideNav selectedIndex={(value) => setSelectedIndex(value)}/>
    </div>

    <div className="ml-64 grid grid-cols-1 md:grid-cols-6 fixed">
      <div className='md:col-span-2 rounded h-screen shadow-sm p-5 overflow-auto'>
       {selectedIndex==0 ?<IconController/>: <BackgroundController/>}
      </div>
      <div className='md:col-span-3'>
        <LogoPreview downloadIcon={downloadIcon}/>
      </div>
      <div className='bg-blue-200 w-50 flex justify-center items-center'>
        ADS HERE 🤞🤞
      </div>
     </div>
    </>
    </UpdateStorageContext.Provider>
  )
}

export default App