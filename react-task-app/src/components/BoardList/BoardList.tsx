import React, {FC, useRef, useState} from 'react'
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';
import { FiLogIn, FiPlusCircle } from 'react-icons/fi';
import SideForm from './SideForm/SideForm';
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoardList.css';
import clsx from 'clsx';
import { GoSignOut } from 'react-icons/go';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { app } from '../../firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { removeUser, setUser } from '../../store/slices/userSlice';
import { useAuth } from '../../hooks/useAuth';


type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>
}

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId
}) => {
  const dispatch = useTypedDispatch();

  const {boardArray} = useTypedSelector(state => state.boards)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const {isAuth} = useAuth();
  console.log(isAuth);

  const handleLogin = () => {
    signInWithPopup(auth, provider)
    .then(userCredential => {
      console.log(userCredential)
      dispatch(
        setUser({
          email: userCredential.user.email,
          id: userCredential.user.uid,
        })
      )
    })
    .catch(error => {
      console.log(error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      dispatch(
        removeUser()
      )
    })
    .catch((error) => {
      console.log(error);
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
    })
  }

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    
  }

  return (
    <div className={container}>
      <div className={title}>
        게시판:
      </div>
      {boardArray.map((board, index) => (
        <div key={board.boardId}
        onClick={() => setActiveBoardId(boardArray[index].boardId)} 
          className={
            clsx(
              {
                [boardItemActive]:
                boardArray.findIndex(b => b.boardId === activeBoardId) === index,
              },
              {
                [boardItem]:
                boardArray.findIndex(b => b.boardId === activeBoardId) !== index
              }
            )
          }
        >
          <div>
            {board.boardName}
          </div>
        </div>
      ))}
      <div className={addSection}>
        {
          isFormOpen ?
            <SideForm inputRef={inputRef} setIsFormOpen={setIsFormOpen}/> 
          :
            <FiPlusCircle className={addButton} onClick={handleClick}/>
        }

        { isAuth 
        ?
        <GoSignOut className={addButton} onClick={handleSignOut} />
        :
        <FiLogIn className={addButton} onClick={handleLogin} />
      }

      </div>
    </div>
  )
}

export default BoardList
