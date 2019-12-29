import React from "react";

const Music = ({ music }) =>
  (
    <div className="music">
      <h4 className="title">{music.name}</h4>
      <div>
        <img
          width="200"
          className="img"
          alt={`歌单名：${music.name}`}
          src={music.coverImgUrl}
        />
      </div>
      <p className="desc">({music.description})</p>
    </div>
  );

export default Music;