// Core
import React, { useState } from 'react';
import {
  Text,
  Spinner,
  SpinnerSize,
  DetailsList,
  PrimaryButton,
  Modal,
  Link,
  MessageBar,
  SelectionMode,
  Checkbox,
  TooltipHost
} from 'office-ui-fabric-react';
import { useId } from '@uifabric/react-hooks';

// Hooks
import { useTasksLoader } from './hooks/useTasksLoader';
import {useTasksCleaner} from './hooks/useTasksCleaner';
import { useProfile } from '../customer/hooks/useProfile';
import { useLogout } from '../customer/hooks/useLogout';
import { useTaskCleaner } from './hooks/useTaskCleaner';
import { useTaskUpdater } from './hooks/useTaskUpdater';

// Styles
import styles from './styles.module.scss';

// Components
import { TaskCreator } from './taskCreator';

export const Task = () => {
  const { tasks, loading, refetch } = useTasksLoader();
  const { authenticatedCustomer } = useProfile();
  const { logout } = useLogout();
  const { removeAllTasks } = useTasksCleaner();
  const { removeTask } = useTaskCleaner();
  const { updateTask } = useTaskUpdater();
  const [ isModalVisible, toogleModal ] = useState(false);
  const tooltipId = useId('tooltip');

  const isTasksEmpty = !!(tasks && tasks.length > 0);

  const showModal = () => {
    toogleModal(true);
  };

  const hideModal = () => {
    toogleModal(false);
  };

  const clear = () => {
    removeAllTasks();
    refetch();
  };

  const updateTaskStatus = (id, task) => {
    updateTask(id, task, refetch);
  };

  const refetchAndHide = () => {
    refetch()
      .then(({data}) => {
        if(data) {
          hideModal();
        }
      });
  }

  const profileJSX = authenticatedCustomer && (
    <Text variant='xLarge'>
      {authenticatedCustomer.firstName} {authenticatedCustomer.lastName}
    </Text>
  )

  const spinnerJSX = loading && (
    <Spinner size={SpinnerSize.large} />
  );

  const columns = [
    { key: 'resolved', name: 'resolved', fieldName: 'resolved', isResizable: false, minWidth: 40, maxWidth: 50,
      onRender: ({id, resolved}) => (
        <Checkbox defaultChecked={resolved} onChange={() => updateTaskStatus(id, {resolved: !resolved})}/>
      ),
    },
    {
      key: 'title', name: 'Title', fieldName: 'title', minWidth: 400, maxWidth: 500,
      onRender: ({title, description}) => (
        <TooltipHost
          content={description}
          id={tooltipId}
        >
          <Text aria-describedby={tooltipId}>{title}</Text>
        </TooltipHost>
      )
    },
    { key: 'edit', name: 'Edit', fieldName: 'edit', isResizable: false,
      onRender: ({id}) => (
        <Link onClick={() => { removeTask(id, refetch); }}>Remove</Link>
      ),
    }
  ];

  const tasksMessageJSX = !isTasksEmpty && tasks && (
    <MessageBar>
      We don't have a tasks!
    </MessageBar>
  );

  const tasksJSX = isTasksEmpty && (
    <DetailsList
      isHeaderVisible={false}
      columns={columns}
      items={tasks}
      selectionMode={SelectionMode.none}
    />
  );

  const taskModalJSX = (
    <Modal
      isOpen={isModalVisible}
      onDismiss={hideModal}
    >
      <TaskCreator refetch={refetchAndHide} />
    </Modal>
  )

  return (
    <section className={styles.taskManager}>
      <div className={styles.header}>
        <Text variant='xLarge'>
          Task Manager
        </Text>
        <div className={styles.controls}>
          <PrimaryButton
            text='Add Task'
            onClick={showModal}
          />
          <PrimaryButton
            text='Remove All Tasks'
            onClick={clear}
          />
        </div>
        <div className={styles.avatar}>
          {profileJSX}
          <PrimaryButton
            text='Logout'
            onClick={logout}
            className={styles.logout}
          />
        </div>
      </div>
      <div className={styles.wrap}>
        {spinnerJSX}
        {tasksJSX}
        {tasksMessageJSX}
      </div>
      {taskModalJSX}
    </section>
  )
}