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
import C, { apply } from 'consistencss';
import { ScrollView } from 'react-native-gesture-handler';

const TriggerScreen = () => {
  const {
    params: { app, branchSelected, workflowSelected },
  } = useRoute<RouteProp<RootStackProps, 'Trigger'>>();
  const { goBack, navigate } = useNavigation();

  const { data: workflows } = useSWR(`/apps/${app.slug}/build-workflows`);
  const { data: branches } = useSWR(`/apps/${app.slug}/branches`);

  const [branch, setBranch] = useState('');
  const [workflow, setWorkflow] = useState('');
  const [envs, setEnvs] = useState('');

  useEffect(() => {
    if (branchSelected) {
      setBranch(branchSelected);
    }
    if (workflowSelected) {
      setWorkflow(workflowSelected);
    }
  }, [branchSelected, workflowSelected]);

  const throttledTrigger = throttle(() => {
    const environments = envs.split('\n').map((env) => {
      const [key, value] = env.split('=');
      return {
        is_expand: true,
        mapped_to: key,
        value,
      };
    });
    bitrise.post_build(app.slug, branch, workflow, environments).then(() => {
      goBack();
    });
  });

  return (
    <ScrollView>
      <Spacer horizontal={4} vertical={4}>
        <Pressable onPress={goBack} style={C.w8}>
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
                style={apply(C.bgPrimary, C.p1, C.py3, C.radius4)}
                onPress={() =>
                  navigate('Finder', { data: branches?.data, key: 'branch' })
                }>
                <TextInput.Icon style={C.textWhite} name="magnify" />
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
                style={apply(C.bgPrimary, C.p1, C.py3, C.radius4)}
                onPress={() =>
                  navigate('Finder', { data: workflows?.data, key: 'workflow' })
                }>
                <TextInput.Icon style={C.textWhite} name="magnify" />
              </Pressable>
            </TextInput.Container>
          </TextInput>
          <Spacer />
          <TextInput>
            <TextInput.Label text="Environments Variables" />
            <TextInput.Container>
              <TextInput.Icon name="shield-key" />
              <TextInput.Field
                value={envs}
                onChangeText={setEnvs}
                placeholder={'SKIP_BUILD=true \nAPI_KEY=1'}
                multiline
              />
            </TextInput.Container>
          </TextInput>
          <Spacer top={8} />
          <Button disabled={!branch || !workflow} onPress={throttledTrigger}>
            <Button.Text text="Trigger" />
            <Button.Icon name="flash" />
          </Button>
        </Spacer>
      </Spacer>
    </ScrollView>
  );
};

export default TriggerScreen;
