// 该组件中使用了多个useState，可以使用useReducer合并
// import React, { useState, useEffect } from "react";
import React, { useReducer, useEffect } from "react";
import "./App.css";
import apis from './apis';
import Header from "./components/Header";
import Music from "./components/Music";
import Search from "./components/Search";

const MUSIC_API_URL = "http://143.92.58.120:3000";

const initialState = {
  loading: true,
  musics: [],
  errMsg: null,
  title: null
};

// 不同情况下对state的处理
const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MUSICS_REQUEST":
      return {
        ...state,
        loading: true,
        errMsg: null,
        title: action.payload
      };
    case "SEARCH_MUSICS_SUCCESS":
      return {
        ...state,
        loading: false,
        musics: action.payload
      };
    case "SEARCH_MUSICS_FAILURE":
      return {
        ...state,
        loading: false,
        errMsg: action.error
      };
    default:
      return state;
  }
}

const App = () => {
  /* const [loading, setLoading] = useState(true);
  const [musics, setMusics] = useState([]);
  const [errMsg, setErrMsg] = useState(null); */
  /**
   * hooks useReducer
   * 接受两个参数
   *   第一个reducer，与Redux中的reducer雷同
   *   第二个是state的初始值
   */
  // 使用useReducer重写
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * hooks useEffect
   * 首次渲染和更新时（根据第二个参数中值的变化）会被调用
   * 接受两个参数，
   *   第一个想要运行的方法，
   *   第二个是一个数组，在该数组中传入一个值，如果该值改变将调用
   */
  useEffect(() => {
    fetch(MUSIC_API_URL + apis.playlist)
      .then(res => res.json())
      .then(json => {
        /* setMusics(json.playlists);
        setLoading(false); */
        dispatch({
          type: "SEARCH_MUSICS_SUCCESS",
          payload: json.playlists
        });
      });
  }, []);

  const search = serchValue => {
    /* setLoading(true);
    setErrMsg(null); */
    dispatch({
      type: "SEARCH_MUSICS_REQUEST",
      payload: serchValue
    });
    fetch(MUSIC_API_URL + apis.playlist + '?cat=' + serchValue)
      .then(res => res.json())
      .then(json => {
        /* if (json.total) {
          setMusics(json.playlists);
        } else {
          setErrMsg(json.msg);
        }
        setLoading(false); */
        if (json.total) {
          dispatch({
            type: "SEARCH_MUSICS_SUCCESS",
            payload: json.playlists
          });
        } else {
          dispatch({
            type: "SEARCH_MUSICS_FAILURE",
            error: json.msg
          });
        }
      });
  }

  const { musics, errMsg, loading, title } = state;

  return (
    <div className="App">
      <Header header="网易云歌单" />
      <Search search={search} />
      <p className="App-intro">{title ? `${title} ` : ''}网易云歌单</p>
      <div className="musics">
        {loading && !errMsg ? (
          <span>加载中...</span>
        ) : errMsg ? (
          <div className="errorMessage">{errMsg}</div>
        ) : (
              musics.map((music, index) => (
                <Music key={`${index}-${music.name}`} music={music} />
              ))
            )}
      </div>
    </div>
  );
}

export default App;
