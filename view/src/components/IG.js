import React from 'react'
import { useEffect } from 'react'
import api from "../api/api"

function IG() {
  //讀取API 才會使用到useEffect
  useEffect(() => {
    api("Imgs").read()
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])
  return (
    <div>

    </div>
  )
}

export default IG