import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBoard, IList, ITask } from "../../types";

type TBoardsState = {
    modalActive: boolean;
    boardArray: IBoard[]
}

type TAddBoardAction = {
    board: IBoard;
}

type TDeleteListAction = {
    boardId: string;
    listId: string;
}

type TAddListAction = {
    boardId: string;
    list: IList;
 }

type TAddTaskAction = {
    boardId: string;
    listId: string;
    task: ITask;
}

const initialState: TBoardsState = {
    modalActive: false,
    boardArray: [
        {
            boardId: 'board-0',
            boardName: "first post",
            lists: [
                {
                    listId: "list-0",
                    listName: "list 1",
                    tasks: [
                        {
                            taskId: "task-0",
                            taskName: "Task 1",
                            taskDescription: "Description",
                            taskOwner: "jino"
                        },
                        {
                            taskId: "task-1",
                            taskName: "Task 2",
                            taskDescription: "Description",
                            taskOwner: "jino"
                        }
                    ]
                },
                {
                    listId: "list-1",
                    listName: "list 2",
                    tasks: [
                        {
                            taskId: "task-3",
                            taskName: "Task 3",
                            taskDescription: "Description",
                            taskOwner: "jino"
                        }
                    ]
                }
            ]
        }
    ]
}

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard: (state, {payload}: PayloadAction<TAddBoardAction>) => {
            state.boardArray.push(payload.board);
        },

        addList: (state, {payload}: PayloadAction<TAddListAction>) => {
            state.boardArray.map(board =>
                board.boardId === payload.boardId
                ? {...board, lists: board.lists.push(payload.list)}
                : board
            )
        },

        addTask: (state, {payload}: PayloadAction<TAddTaskAction>) => {
            state.boardArray.map(board => 
                board.boardId === payload.boardId
                ? {
                    ...board,
                    lists: board.lists.map(list=>
                        list.listId === payload.listId
                        ? {
                           ...list,
                           tasks: list.tasks.push(payload.task) 
                        }
                        :list
                    )
                }
                : board
            )
        },

        deleteList: (state, {payload}: PayloadAction<TDeleteListAction>) => {
            state.boardArray = state.boardArray.map(
                board =>
                    board.boardId === payload.boardId
                    ?
                    {
                        ...board,
                        lists: board.lists.filter(
                            list => list.listId !== payload.listId
                        )
                    }
                    :
                    board
            )
        },

        setModalActive: (state, {payload}: PayloadAction<boolean>) => {
            state.modalActive = payload;
        }
    }
})

export const { addBoard, deleteList, setModalActive, addList, addTask } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;