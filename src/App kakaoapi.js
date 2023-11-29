import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // const keyNum = "84b67f0a-5968-42bb-bdfc-4269e9cb92fc";
  const REST_API_KEY = "08d73f76a3f730c0bf7275139fe41bbf";
  const currentPage = 1;
  const listCnt = 10;
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const searchTitle = '미움받을 용기'

  const callApi = async (currentPage)=>{
    try {
      setLoading(true)

      const response = await axios.get(`https://dapi.kakao.com/v3/search/book?target=title`, {
        params:{
          query:searchTitle,
          sort:'latest'
        },
        headers:{
          Authorization: `KakaoAK ${REST_API_KEY}`
        },
      })
      console.log(response.data);
      setUserData(response.data.documents)
    } catch (error) {
      console.error("error title : " + error);
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    callApi(currentPage)
  }, []) 

  return (
    <div className="App">
      <h1>Book Recommendation of Kakao API </h1>
      {
        loading ? (<div>loading...</div>) : 
        (
          <ul>
            {
              userData.map((item, i)=>{
                return(
                  <li key={i}>
                    <div className='card'>
                      <div className="cardTitle"><a href={item.url} target='_blank'>{item.title}</a>
                      {/* <div className='cardText' dangerouslySetInnerHTML={{ __html: item.description}}>
                      </div> */}
                      <img src={item.thumbnail} alt="" />
                      </div>
                    </div>
                  </li>
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
