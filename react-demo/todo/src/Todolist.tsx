import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

type Todo = {
    id : number;
    text : string;
    check : boolean;
};

const TodoList : React.FC = () => {
    const title : string = "To Do";
    const [todos, setTodos] = useState<Todo[]>([
        {id : 1, text : 'study', check : false},
        {id : 2, text : 'sleep', check : false},
        {id : 3, text : 'meeting', check : false}
    ]);

    const [newTodo, setNewTodo] = useState<string>('');

    const [showDetail, setShowDetail] = useState<boolean>(false);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    const handleCheckedChange = (itemId : number) => {
        setTodos((prevItems)=>
            prevItems.map((item)=>
            item.id === itemId ? {...item, check : !item.check} : item)
        )
    }

    const addTodo = () => {
        if (newTodo.trim() !== '') {
            setTodos([...todos, {id : Date.now(), text : newTodo, check : false}]);
            setNewTodo('');
        }
    }

    const removeTodo = (id : number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleTodoClick = (todo : Todo) => {
        setShowDetail(true);
        setSelectedTodo(todo);
    }

    const handleCloseDetail = () => {
        setShowDetail(false);
    }

    return (
        <div>
            <h1>{title}</h1>
            <p></p>

            <div className="container">
                <div>
                    <input type="text"
                    placeholder="할 일 입력"
                    style={{marginRight : '10px', writingMode : 'horizontal-tb'}} 
                    onChange={(e)=> setNewTodo(e.target.value)}
                    />
                    <Button variant="warning" onClick={addTodo}>추가</Button>
                </div>

                <p></p>


                <div className="board">
                    <ul>
                        {
                            todos.map((todo, i)=>(
                                <li key={todo.id}>
                                    <input type="checkbox" 
                                    onChange={()=>{
                                        handleCheckedChange(todo.id);
                                    }} />
                                    <span onClick={() => {handleTodoClick(todo)}}>
                                        {
                                            todo.check ? 
                                            <del>{todo.text}</del>
                                            : <span>{todo.text}</span>
                                        }
                                        
                                    </span>
                                    
                                    <button
                                    onClick={()=> {
                                        removeTodo(todo.id);
                                    }}
                                    className="delbutton">
                                        삭제
                                        </button>
                                    
                                </li>
                            ))
                        }
                    </ul>
                </div>
            
                
            </div>
        </div>
        
    )
}

export default TodoList;