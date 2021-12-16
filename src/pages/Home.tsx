import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTesk: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks([...tasks, newTesk])
  }

  function handleToggleTaskDone(id: number) {
    const list = tasks.map(item => {
      if (item.id === id) {
        return {
          id: item.id,
          title: item.title,
          done: !item.done
        }
      } else {
        return item
      }
    })
    setTasks(list);
  }

  function handleRemoveTask(id: number) {
    const list = tasks.filter(item => {
      if (item.id !== id) {
        return item
      }
    })
    setTasks(list);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})