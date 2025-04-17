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

type TDeleteTaskAction = {
    boardId: string;
    listId: string;
    taskId: string;
}

type TDeleteBoardAction = {
    boardId: string;
 }

type TSortAction = {
    boardIndex: number;
    droppableIdStart: string;
    droppableIdEnd: string;
    droppableIndexStart: number;
    droppableIndexEnd: number;
    draggableId: string;
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

        deleteBoard: (state, {payload}: PayloadAction<TDeleteBoardAction>) => {
            state.boardArray = state.boardArray.filter(
                board => board.boardId !== payload.boardId
            )
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

        updateTask: (state, {payload}: PayloadAction<TAddTaskAction>) => {
            state.boardArray = state.boardArray.map(board =>
                board.boardId === payload.boardId?
                {
                    ...board,
                    lists: board.lists.map(list =>
                        list.listId === payload.listId
                        ?
                        {
                            ...list,
                            tasks: list.tasks.map(task => 
                                task.taskId === payload.task.taskId
                                ? payload.task
                                : task
                            )
                        }
                        :
                        list
                    )
                }
                :
                board
            )
        },

        deleteTask: (state, {payload}: PayloadAction<TDeleteTaskAction>) => {
            state.boardArray = state.boardArray.map(board => 
                board.boardId === payload.boardId
                ?
                {
                    ...board,
                    lists: board.lists.map(list =>
                        list.listId === payload.listId
                        ? {
                            ...list,
                            tasks: list.tasks.filter(
                                task => task.taskId !== payload.taskId
                            )
                        }
                        : list
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
        },

        sort: (state, {payload}: PayloadAction<TSortAction>) => {
            // same list
            if (payload.droppableIdStart === payload.droppableIdEnd) {
                const list = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdStart 
                )

                //1. 특정 인덱스의 아이템 몇 개를 배열에서 삭제, 잘라서,
                //-> 특정 아이템들을 배열로 리턴해줌, 
                const card = list?.tasks.splice(payload.droppableIndexStart, 1);
                //2. 🧬 splice 다시 이어준다.
                list?. tasks.splice(payload.droppableIndexEnd, 0, ...card!);
            }

            // other list
            if (payload.droppableIdStart !== payload.droppableIdEnd) {
                const listStart = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdStart
                )
                const card = listStart!.tasks.splice(payload.droppableIndexStart, 1);

                const listEnd = state.boardArray[payload.boardIndex].lists.find(
                    list => list.listId === payload.droppableIdEnd
                )
                listEnd?.tasks.splice(payload.droppableIndexEnd, 0, ...card!);
            }
        }
    }
})

export const { sort, addBoard, deleteBoard, deleteList, updateTask, deleteTask, setModalActive, addList, addTask } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;