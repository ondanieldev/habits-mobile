import { DateTimePicker } from '../../../../shared/components/DateTimePicker';
import { DayOfWeekInput } from '../../../../shared/components/DayOfWeekInput';
import { Divider } from '../../../../shared/components/Divider';
import { Form } from '../../../../shared/components/Form';
import { TextButton } from '../../../../shared/components/TextButton';
import { TextInput } from '../../../../shared/components/TextInput';
import { NotificationSwitchGroup } from '../../../profile/components/NotificationSwitchGroup';
import { Task } from '../../interfaces/Task';
import { useCreateHabitForm } from './use';
import { useCreateHabitFormTranslation } from './useTranslation';

export interface CreateHabitFormProps {
  editingHabit?: Task;
}

export const CreateHabitForm: React.FC<CreateHabitFormProps> = props => {
  const { buttonText, daysOfWeekLabel, formatTime, nameLabel, timeLabel } =
    useCreateHabitFormTranslation();

  const { form, onSubmit } = useCreateHabitForm(props);

  return (
    <Form form={form}>
      <TextInput form={form} label={nameLabel} name="name" />

      <Divider />

      <DateTimePicker
        mode="time"
        name="time"
        form={form}
        baseTextInputProps={{ label: timeLabel }}
        formatDisplayedValue={formatTime}
      />

      <Divider />

      <DayOfWeekInput form={form} label={daysOfWeekLabel} name="daysOfWeek" />

      <Divider />

      <NotificationSwitchGroup form={form} />

      <Divider />

      <TextButton onPress={form.handleSubmit(onSubmit)}>
        {buttonText}
      </TextButton>
    </Form>
  );
};
