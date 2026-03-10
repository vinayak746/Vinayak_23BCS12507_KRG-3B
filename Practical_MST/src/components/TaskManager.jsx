import { useState } from 'react';
import useForm from '../hooks/useForm';

const TaskManager = () => {
 
  const [tasks, setTasks] = useState([]);

  
  const { values, handleChange, reset } = useForm({
    taskTitle: '',
    priority: 'Low',
  });

  const handleSubmit = (e) =>{
    e.preventDefault();
    
    if(values.taskTitle.trim() === ''){
        alert('Please enter a task title');
        return;
    }

    const newTask = {
        id:Date.now(),
        title: values.taskTitle,
        priority :values.priority,
    }
    setTasks([...tasks, newTask]);
    reset();
  }
  return(
    <div className='items-center flex flex-col p-4'>
        <h2 className='text-2xl font-bold mb-4'>Task Tracker</h2>
        <form className='space-y-4 border' onSubmit={handleSubmit}>
            <div className=''>
                <label htmlFor="taskTitle">Task Title:</label>
                <input
                    type="text"
                    id="taskTitle"
                    name="taskTitle"
                    value={values.taskTitle}
                    onChange={handleChange}
                    placeholder="Enter task title"
                    className='border p-2 rounded w-full'
                />

  
    
            </div>
            <div>
                <label htmlFor="priority">Priority:</label>
                <select
                    id="priority"
                    name="priority"
                    value={values.priority}
                    onChange={handleChange}

                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <button className='px-4 py-2 border rounded items-center' type='submit'>Add Task</button>
        </form>
        <div className='mt-4 '>
            <h3>Tasks</h3>
            {tasks.length === 0? (
                <p>No tasks added yet.</p>
            ): (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, i) => (
                            <tr key={i}>
                                <td>{task.title}</td>
                                <td>{task.priority}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
        <div>
            <button className='px-3 py-2 border rounded' onClick={() => setTasks([])}>Clear Tasks</button>
        </div>
    </div>
  )
}

export default TaskManager;