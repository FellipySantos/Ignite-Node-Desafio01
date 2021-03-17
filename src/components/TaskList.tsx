import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare, FiSearch} from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [search, setSearchTask] = useState('');

  function handleCreateNewTask() {
    if(!!newTaskTitle){
      const task = {
        id: uuidv4(),
        title: newTaskTitle,
        isComplete: false
      }

      setTasks(oldState => [...oldState, task]);
    }
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    const completTasks = tasks.map(task=> task.id === id ?{
      ...task,
      isComplete: true
    } : task);
    setTasks(completTasks);
  }

  function handleRemoveTask(id: number) {
    const removeTasks = tasks.filter(task=> task.id !== id);
    setTasks(removeTasks);
  }

  function handleSearchTask(){
    if(!search) return;
    const searchTasks = tasks.filter(task=> task.title.includes(search.toLowerCase()))
    setSearchTask('')
    setTasks(searchTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button id="Inserir" type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
          <input 
            type="text" 
            placeholder="Pesquisar tarefa" 
            onChange={(e) => setSearchTask(e.target.value)}
            value={search}
          />
          <button id="Pesquisar" type="submit" onClick={handleSearchTask}>
            <FiSearch size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}