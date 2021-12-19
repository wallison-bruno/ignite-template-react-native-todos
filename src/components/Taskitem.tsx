import React, { useEffect, useRef, useState } from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from "react-native";
import { Task } from "./TasksList";
import Icon from 'react-native-vector-icons/Feather'
import trashIcon from '../assets/icons/trash/trash.png'
import pen from '../assets/icons/pen/pen.png'

interface TasksProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, newTitle: string) => boolean;
}

export function Taskitem({ task, toggleTaskDone, removeTask, editTask }: TasksProps) {

    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(task.title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEdit() {
        setIsEditing(true)
    }

    function handleCancelEdit() {
        setIsEditing(false)
        setTitle(task.title)
    }

    function handleEdit() {
        editTask(task.id, title) ? true : setTitle(task.title)
        setIsEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus()
            } else {
                textInputRef.current.blur()
            }
        }
    }, [isEditing])

    return (
        <>
            <View >
                <TouchableOpacity
                    testID={`button-${task}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View
                        testID={`marker-${task}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                    >
                        {task.done && (
                            <Icon
                                name="check"
                                size={12}
                                color="#FFF"
                            />
                        )}
                    </View>

                    <TextInput
                        ref={textInputRef}
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        value={title}
                        editable={isEditing}
                        onChangeText={setTitle}
                        onSubmitEditing={handleEdit}
                    >
                    </TextInput>
                </TouchableOpacity>
            </View>

            <View style={styles.iconsContainer}>
                {isEditing ?
                    (<TouchableOpacity
                        style={{ paddingHorizontal: 15 }}
                        onPress={handleCancelEdit}
                    >
                        <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>) :
                    (<TouchableOpacity
                        style={{ paddingHorizontal: 15 }}
                        onPress={handleStartEdit}
                    >
                        <Image source={pen} />
                    </TouchableOpacity>)}


                <View style={styles.iconsDivider} />

                <TouchableOpacity
                    disabled={isEditing}
                    testID={`trash-${task}`}
                    style={{ paddingLeft: 15, marginRight: 24 }}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
                </TouchableOpacity>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: "row",

    },

    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)'
    }
})