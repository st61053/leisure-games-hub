import React, { useEffect } from 'react';
import TabNavigator from './TabNavigator';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import UserLoginForm from '@/user/components/UserLoginForm';
import { getUser } from '@/user/api/getUser';
import { StatusBar } from 'react-native';

const RootNavigator = () => {

    const jwt = useAppSelector((state: RootState) => state.user.jwt);
    const userId = useAppSelector((state: RootState) => state.user.loginUserId);

    const dispatch = useAppDispatch();


    useEffect(() => {
        if (!userId) return;
        dispatch(getUser(userId));
    }, [userId]);

    return (
        <GluestackUIProvider mode="light">
            <>
                <StatusBar barStyle="dark-content" translucent={true} />
                {jwt ? <TabNavigator /> : <UserLoginForm />}
            </>

        </GluestackUIProvider>
    )

};

export default RootNavigator;
