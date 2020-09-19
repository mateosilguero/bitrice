import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import useSWR from 'swr';
import Button from '../components/pressable/button';
import TextInput from '../components/input/textinput';
import Spacer from '../components/layout/spacer';
import Icon from '../components/addons/icon';
import { Title } from '../components/typography';
import { Pressable } from '../components/pressable';
import bitrise from '../services/bitrise';
import { RootStackProps } from '../interfaces/routing';
import { throttle } from '../utils/invokes';

const TriggerScreen = () => {
  const {
    params: { app, branchSelected, workflowSelected },
  } = useRoute<RouteProp<RootStackProps, 'Trigger'>>();
  const { goBack, navigate } = useNavigation();

  const { data: workflows } = useSWR(`/apps/${app.slug}/build-workflows`);
  const { data: branches } = useSWR(`/apps/${app.slug}/branches`);

  const [branch, setBranch] = useState('');
  const [workflow, setWorkflow] = useState('');

  useEffect(() => {
    if (branchSelected) {
      setBranch(branchSelected);
    }
    if (workflowSelected) {
      setWorkflow(workflowSelected);
    }
  }, [branchSelected, workflowSelected]);

  const throttledTrigger = throttle(() => {
    bitrise.post_build(app.slug, branch, workflow).then(() => {
      goBack();
    });
  });

  return (
    <Spacer horizontal={4} vertical={4}>
      <Pressable onPress={goBack}>
        <Icon name="arrow-left" size={28} />
      </Pressable>
      <Spacer horizontal={0} vertical={4} />
      <Title text="New build" />
      <Spacer horizontal={0} vertical={6}>
        <TextInput>
          <TextInput.Label text="Branch" />
          <TextInput.Container>
            <TextInput.Icon name="source-branch" />
            <TextInput.Field value={branch} onChangeText={setBranch} />
            <Pressable
              onPress={() =>
                navigate('Finder', { data: branches?.data, key: 'branch' })
              }>
              <TextInput.Icon name="magnify" />
            </Pressable>
          </TextInput.Container>
        </TextInput>
        <Spacer />
        <TextInput>
          <TextInput.Label text="Workflow" />
          <TextInput.Container>
            <TextInput.Icon name="network" />
            <TextInput.Field value={workflow} onChangeText={setWorkflow} />
            <Pressable
              onPress={() =>
                navigate('Finder', { data: workflows?.data, key: 'workflow' })
              }>
              <TextInput.Icon name="magnify" />
            </Pressable>
          </TextInput.Container>
        </TextInput>
        <Spacer top={8} />
        <Button disabled={!branch || !workflow} onPress={throttledTrigger}>
          <Button.Text text="Trigger" />
          <Button.Icon name="flash" />
        </Button>
      </Spacer>
    </Spacer>
  );
};

export default TriggerScreen;
