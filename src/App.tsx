import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { Container } from 'react-bootstrap';

interface taskList {
  name: string;
}

export function App() {
  const [toDoList, setToDoList] = useState<taskList[]>([]);
  const [task, setTask] = useState<taskList>({
    name: '',
  });

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setToDoList([...toDoList, { ...task }]);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const deleteTask = (
    name: string,
    event: MouseEvent<HTMLButtonElement>,
  ): void => {
    setToDoList(toDoList.filter(item => item.name !== name));
  };

  return (
    <>
      <Container>
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Nome da tarefa"
            name="name"
            defaultValue={task.name}
            onChange={handleInput}
          />
          <button type="submit">Adicionar Tarefa</button>
        </form>
        <ul>
          {toDoList.map(item => (
            <li key={item.name}>
              Nome da Tarefa: {item.name}
              <button
                type="button"
                onClick={event => deleteTask(item.name, event)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
