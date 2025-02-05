import React, { useState, useEffect } from 'react';
import { v4 as getKey } from 'uuid';
import { isThisWeek, isThisMonth, isPast, getDate, addHours } from 'date-fns';

import { StyleSheet, FlatList, View } from 'react-native';
import { useUserContext } from '../../Contexts/userContext';
import SingleTask from './SingleTask';
import TaskForm from './TaskForm';

const TaskList = ({ item }) => {
  return <SingleTask item={item} />;
};

const ListHeader = () => {
  return (
    <View>
      <TaskForm />
    </View>
  );
};

const TaskSummary = () => {
  const { user } = useUserContext();

  return (
    <View style={styles.listContainer}>
      <FlatList
        keyExtractor={() => getKey()}
        data={user ? user.tasks : []}
        renderItem={TaskList}
        ListHeaderComponent={<ListHeader />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: '86.5%'
  }
});

export default TaskSummary;
