
import './App.css';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

const finalSapceCharacters = [
  {
    id: 'gray',
    name: 'Gary Goodspeed',
  },
  {
    id: 'cato',
    name: 'Cato',
  },
  {
    id: 'knv',
    name: 'Kvn',
  }
]





function App() {

  const [characters, setCharacters] = useState(finalSapceCharacters);

  const handleEnd = (result) => {
    console.log(result);

    if (!result.destination) return;

    const items = Array.from(characters);
    console.log(items);

    const [reorderedItem] = items.splice(0, 1);
    console.log(reorderedItem);

    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items);

    setCharacters(items);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Character</h1>
        
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId='characters'>
            {(provided)=> (

        <ul 
        className='characters' 
        {...provided.droppableProps}
        ref={provided.innerRef}
        >
          {
            characters.map(({id, name}, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                <li
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}
                
                >
                  <p>
                    {name}
                  </p>
                </li>
                )}
                </Draggable>
              )
          })
          }
          {provided.placeholder}
        </ul>
        )}

          </Droppable>
        </DragDropContext>
        
      </header>
    </div>
  );
}

export default App;
