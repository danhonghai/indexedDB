
import './App.css';
// import HooksUseMemo from './components/hooks/HooksUseMemo'; //useMemo
import HooksUseRef from './components/hooks/HooksUseRef';
// import HooksUseReducer from './components/hooks/HooksUseReducer'; //useReducer
// import HooksUseContext from './components/hooks/HooksUseContext'; //useContext
// import HooksExample from './components/hooks/HooksExample'; //hooks写法
// import OriginExample from './components/origin/OriginExample'; //原始写法


function App() {
  return (
    <div className="m_auto">
      {/* <OriginExample></OriginExample> */}
      {/* <HooksExample></HooksExample> */}
      {/* <HooksUseContext></HooksUseContext> */} 
      {/* <HooksUseReducer></HooksUseReducer> */}
      {/* <HooksUseMemo></HooksUseMemo> */}
      <HooksUseRef></HooksUseRef>
    </div>
  );
}

export default App;
