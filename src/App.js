import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const keyNum = "84b67f0a-5968-42bb-bdfc-4269e9cb92fc";
  const currentPage = 1;
  const listCnt = 10;
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)

  const callApi = async (currentPage)=>{
    try {
      setLoading(true)

      const response = await axios.get(`http://api.kcisa.kr/openapi/API_CNV_060/request?serviceKey=${keyNum}&numOfRows=${listCnt}&pageNo=${currentPage}`)
      setUserData(response.data.response.body.items.item)
    } catch (error) {
      console.error("error title : " + error);
    }finally{
      setLoading(false)
    }
    // axios.get(`http://api.kcisa.kr/openapi/API_CNV_060/request?serviceKey=${keyNum}&numOfRows=${listCnt}&pageNo=${currentPage}`)
    //       .then((response)=>{
    //         console.log(response);
    //         setUserData(response.data.response.body.items.item)
    //       })
    //       .catch((error)=>{
    //         console.log(error);
    //       })
  }

  useEffect(()=>{
    callApi(currentPage)
  }, [])

  return (
    <div className="App">
      <h1>recommendation of tour API </h1>
      {
        loading ? (<div>loading...</div>) : 
        (
          <ul>
            {
              userData.map((item, i)=>{
                return(
                  <li key={i}>{item.title}</li>
                )
              })
            }
          </ul>
        )
      }
    </div>
  );
}

export default App;
