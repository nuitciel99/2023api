import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // const keyNum = "84b67f0a-5968-42bb-bdfc-4269e9cb92fc";
  const REST_API_KEY = "08d73f76a3f730c0bf7275139fe41bbf";
  const currentPage = 1;
  const listCnt = 10;
  const [userData, setUserData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTitle, setSearchTitle] = useState('')
  // const searchTitle = '미움받을 용기'

  const callApi = async (searchTitle)=>{
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

  const searchBtn = ()=>{
    callApi(searchTitle)
  }

  const handlerKeyPress = (e)=>{
    if(e.key == "Enter"){
      callApi(searchTitle)
    }
  }

  useEffect(()=>{
    callApi(searchTitle)
  }, []) 

  return (
    <div className="App">
      <h1>Book Recommendation of Kakao API </h1>
      {
        loading ? (<div>loading...</div>) : 
        (
          <div className="container className='d-flex justify-content-center'">
            <div className="row mb-5">
              <div className="col d-flex gap-1">
                <input type="text" className='form-control' onChange={(e)=>{setSearchTitle(e.target.value)}} onKeyPress={handlerKeyPress} />
                <button className='btn btn-primary' style={{width:'100px'}} onClick={searchBtn}>Search</button>
              </div>
            </div>
            <ul>
              {
                userData.map((item, i)=>{
                  return(
                    <li key={i} >
                      <div className='card'>
                        <div className="cardTitle"><a href={item.url} target='_blank'>{item.title}</a>
                        {/* <div className='cardText' dangerouslySetInnerHTML={{ __html: item.description}}>
                        </div> */}
                        <a href={item.url}><img src={item.thumbnail} alt="" /></a>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )
      }
    </div>
  );
}

export default App;
