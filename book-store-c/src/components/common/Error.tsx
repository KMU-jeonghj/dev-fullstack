import React from 'react'
import { useRouteError } from 'react-router-dom';

interface RouteError {
    statusText?: string;
    messsage?: string;
}

const Error = () => {
    const error = useRouteError() as RouteError;

  return (
    <div>
      <h1>404 페이지를 찾을 수 없습니다.</h1>
      <p>다음과 같은 오류가 발생했습니다.</p>
      <p>{error.statusText || error.messsage}</p>
    </div>
  )
}

export default Error
