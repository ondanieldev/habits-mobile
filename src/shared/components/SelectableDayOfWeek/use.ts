import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { SelectableDayOfWeekProps } from '.';
import { selectableDayOfWeekStyles } from './styles';

type Styles = {
  touchable: StyleProp<ViewStyle>;
  label: StyleProp<TextStyle>;
};

export type SelectableDayOfWeekHook = (props: SelectableDayOfWeekProps) => {
  label: string;
  onPress: () => void;
  styles: Styles;
};

export const useSelectableDayOfWeek: SelectableDayOfWeekHook = props => {
  const { t } = useTranslation('common');

  const [internalIsSelected, setInternalIsSelected] = useState(
    props.defaultSelected,
  );

  const isSelected = useMemo(
    () =>
      props.isSelected !== undefined ? props.isSelected : internalIsSelected,
    [props.isSelected, internalIsSelected],
  );

  const onPress = useCallback(() => {
    const newState = !isSelected;
    setInternalIsSelected(newState);
    props.onPress?.(newState);
  }, [isSelected, props]);

  const label = useMemo(() => t(props.label), [t, props.label]);

  const styles = useMemo<Styles>(
    () => ({
      touchable: StyleSheet.compose(
        selectableDayOfWeekStyles.touchable,
        isSelected && selectableDayOfWeekStyles.touchableSelected,
      ),
      label: StyleSheet.compose(
        selectableDayOfWeekStyles.label,
        isSelected && selectableDayOfWeekStyles.labelSelected,
      ),
    }),
    [isSelected],
  );

  return {
    label,
    styles,
    onPress,
  };
};
