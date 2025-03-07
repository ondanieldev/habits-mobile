import { ActivityIndicator, View } from 'react-native';

import { Container } from '../../../../shared/components/Container';
import { IconButton } from '../../../../shared/components/IconButton';
import { colors } from '../../../../shared/styles/globalStyles';
import { ItemData } from '../../interfaces/ItemData';
import { ReminderItem, ReminderItemProps } from '../ReminderItem';
import { reminderListIconProps } from './data';
import { reminderListStyles } from './styles';
import { useReminderList } from './use';

export interface ReminderListProps {
  reminderList: ItemData[];
  defaultReminderItemProps?: Partial<ReminderItemProps>;
  isLoading?: boolean;
}

export const ReminderList: React.FC<ReminderListProps> = props => {
  const {
    currentReminder,
    hasNextReminder,
    hasPrevReminder,
    handleNextReminder,
    handlePrevReminder,
  } = useReminderList(props);

  if (!currentReminder) {
    return <></>;
  }

  if (props.isLoading) {
    return (
      <View style={reminderListStyles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.primary} animating />
      </View>
    );
  }

  return (
    <Container style={reminderListStyles.container}>
      <IconButton
        iconProps={reminderListIconProps.prev}
        buttonProps={{
          disabled: !hasPrevReminder,
          onPress: handlePrevReminder,
        }}
      />

      <ReminderItem
        {...props.defaultReminderItemProps}
        data={currentReminder}
      />

      <IconButton
        iconProps={reminderListIconProps.next}
        buttonProps={{
          disabled: !hasNextReminder,
          onPress: handleNextReminder,
        }}
      />
    </Container>
  );
};
