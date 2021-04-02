import React, { FC, MutableRefObject, useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import Header from '../../components/layout/screen-header';
import { Label } from '../../components/typography';
import Icon from '../../components/addons/icon';
import Row from '../../components/layout/row';
import Spacer from '../../components/layout/spacer';
import Alert from '../../components/layout/modal';
import bitrise from '../../services/bitrise';
import C, { apply } from 'consistencss';
import { BitriseBuild, BitriseApp } from '../../interfaces/bitrise';
import { throttle } from '../../utils/invokes';
import { mutate } from 'swr';
import Button from '../../components/pressable/button';
import ListItem from '../../components/list';

interface Props {
  app: BitriseApp;
  build: BitriseBuild;
  pinned?: boolean;
  setPinned?: (b: boolean) => void;
  navigate: (s: string) => void;
  scroll?: MutableRefObject<ScrollView | null>;
}

const BuildHeader: FC<Props> = ({
  app,
  build,
  scroll,
  pinned = false,
  setPinned,
  navigate,
}) => {
  const [showModal, setShowModal] = useState(false);

  const isBuilding = build?.status === 0;

  const abort = throttle(() => {
    bitrise.abort_build(app.slug, build.slug).then(() => {
      mutate(`/apps/${app.slug}/builds/${build.slug}`, {
        ...build,
        status: 3,
      });
    });
  });

  const rebuild = throttle(() => {
    bitrise
      .post_build(
        app.slug,
        build.original_build_params.branch,
        build.original_build_params.workflow_id,
        build.original_build_params.environments,
      )
      .finally(() => navigate('Builds'));
  });

  return (
    <Header>
      <Label
        style={apply(C.wHalf)}
        numberOfLines={1}
        text={`#${build?.build_number} - ${build?.triggered_workflow}`}
      />
      <Row>
        {isBuilding && setPinned && (
          <Pressable onPress={() => setPinned(!pinned)}>
            <Icon
              name="pin"
              size={24}
              style={pinned ? C.textSecondary : C.textPrimary}
            />
          </Pressable>
        )}
        {scroll && (
          <>
            <Spacer />
            <Pressable onPress={() => scroll.current?.scrollTo({ y: 0 })}>
              <Icon
                name="format-vertical-align-top"
                size={24}
                style={C.textPrimary}
              />
            </Pressable>
            <Spacer />
            <Pressable onPress={() => scroll.current?.scrollToEnd()}>
              <Icon
                name="format-vertical-align-bottom"
                size={24}
                style={C.textPrimary}
              />
            </Pressable>
          </>
        )}
        <Spacer />
        {isBuilding ? (
          <Pressable onPress={() => setShowModal(true)}>
            <Icon name="cancel" size={24} style={C.textWarning} />
          </Pressable>
        ) : (
          <Pressable onPress={() => setShowModal(true)}>
            <Icon name="restart" size={24} style={C.textPrimaryDark} />
          </Pressable>
        )}
      </Row>
      <Alert visible={showModal}>
        <ListItem>
          <ListItem.Content style={apply(C.itemsCenter, C.pt4)}>
            <ListItem.Title
              style={C.alignCenter}
              text={
                isBuilding
                  ? `Abort #${build.build_number} - ${build.triggered_workflow} ?`
                  : `Trigger ${build.original_build_params.workflow_id} from ${build.original_build_params.branch} ?`
              }
            />
            <Row style={C.py4}>
              <Pressable style={C.mr4} onPress={() => setShowModal(false)}>
                <Button.Text text="Cancel" style={C.textError} />
              </Pressable>
              <Pressable
                onPress={() => {
                  (isBuilding ? abort : rebuild)();
                  setShowModal(false);
                }}>
                <Button.Text
                  text={isBuilding ? 'Abort' : 'Trigger !'}
                  style={C.textPrimary}
                />
              </Pressable>
            </Row>
          </ListItem.Content>
        </ListItem>
      </Alert>
    </Header>
  );
};

export default BuildHeader;
