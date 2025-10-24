import React, { useState, useEffect, useRef } from 'react';
import BT from './compoments/BT.jsx';
import NavigationMenu from './compoments/NavigationMenu.jsx';
import Banner from './compoments/Banner.jsx';
import Footer from './compoments/Footer.jsx';
import ScrollTest from './ScrollTest.jsx';
import Panel from "./compoments/Panel.jsx";
import User0008 from "./compoments/User0008.jsx";
import Policies from './compoments/Policies.jsx';


function App() {
 
  return (
    <div className="bg-white">
      <NavigationMenu />
      
      {/* Banner */}
      <Banner /> 

      <User0008/>
      <ScrollTest />
      <Policies/>
      <Footer />

      {/* Panel cố định dưới cùng */}
      <Panel />
    </div>
  );
}

export default App;