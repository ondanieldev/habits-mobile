import './i18n';

import React, { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from './src/features/auth/contexts/authContext';
import { AuthSignInView } from './src/features/auth/views/AuthSignInView';
import { AuthSignUpView } from './src/features/auth/views/AuthSignUpView';
import { NotificationService } from './src/features/notification/services/NotificationService';
import { usePreferenceScreen } from './src/features/preference/screens/PreferenceScreen/use';
import { useRoutineEditScreen } from './src/features/routine/screens/RoutineEditScreen/use';
import { useRoutineMainScreen } from './src/features/routine/screens/RoutineMainScreen/use';
import { useRoutineUpsertScreen } from './src/features/routine/screens/RoutineUpsertScreen/use';
import { ContextProvider } from './src/shared/contexts';
import { Stack } from './src/shared/navigation/stack';
import { ReduxProvider } from './src/shared/stores/ReduxProvider';
import { SplashView } from './src/shared/views/SplashView';

export function AppWrapper(): React.JSX.Element {
  useEffect(() => {
    NotificationService.setupBackgroundListener();
  }, []);

  return (
    <ReduxProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ReduxProvider>
  );
}

export function App(): React.JSX.Element {
  const { authToken, readProfileStatus } = useAuth();

  const routineMainScreen = useRoutineMainScreen();
  const routineUpsertScreen = useRoutineUpsertScreen();
  const routineEditScreen = useRoutineEditScreen();
  const preferenceScreen = usePreferenceScreen();

  if (readProfileStatus === 'pending') {
    return <SplashView />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {authToken === null ? (
          <>
            <Stack.Screen
              component={AuthSignInView}
              name={'AuthSignInScreen'}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              component={AuthSignUpView}
              name={'AuthSignUpScreen'}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen {...routineMainScreen} />
            <Stack.Screen {...routineUpsertScreen} />
            <Stack.Screen {...routineEditScreen} />
            <Stack.Screen {...preferenceScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
