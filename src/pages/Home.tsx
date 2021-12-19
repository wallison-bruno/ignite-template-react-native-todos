import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // adicionar
  function handleAddTask(newTaskTitle: string) {
    const isEquals = tasks.find(item => {
      return item.title === newTaskTitle
    })
    if (isEquals) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    } else {
      const newTesk: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
      setTasks([...tasks, newTesk])
    }
  }

  // done
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

  // remover
  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que deseja remover esse item?', [{
      text: 'Não',
      style: 'cancel'
    },
    {
      text: 'Sim',
      onPress: () => {
        const list = tasks.filter(item => {
          if (item.id !== id) {
            return item
          }
        })
        setTasks(list);
      },
      style: 'default'
    }
    ])
  }

  // editar
  function handleEditTask(taskId: number, taskNewTitle: string) {
    const isEquals = tasks.find(item => item.title === taskNewTitle)
    if (isEquals) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return false;
    } else {
      const newTask = tasks.map(item => {
        if (taskId === item.id) {
          return {
            id: item.id,
            title: taskNewTitle,
            done: item.done
          }
        } else {
          return item
        }
      })
      setTasks(newTask)
      return true;
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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