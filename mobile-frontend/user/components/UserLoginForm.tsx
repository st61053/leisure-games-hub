import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { Keyboard, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { HStack } from "@/components/ui/hstack";
import { Image } from "@/components/ui/image"
import { Text } from "@/components/ui/text"
import Login from "./Login";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import Register from "./Register";
const logo = require('../../assets/sz-logo.png');

enum FormType {
    LOGIN = "LOGIN",
    REGISTER = "REGISTER",
}

const UserLoginForm = () => {

    const [formType, setFormType] = React.useState<FormType>(FormType.LOGIN);

    const formMap = {
        [FormType.LOGIN]: <Login />,
        [FormType.REGISTER]: <Register onRegister={() => setFormType(FormType.LOGIN)} />,
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <VStack style={{
                backgroundColor: "#EDEDED",
                height: "100%",
                paddingTop: 58,
            }}>
                <HStack style={{ alignItems: "center", left: -10, paddingHorizontal: 24 }} space="lg">
                    <Image
                        size="lg"
                        source={logo}
                        alt="sz-logo"
                    />
                    <VStack>
                        <Heading size="2xl">
                            Captain Hub
                        </Heading>
                        <Heading size="md" className="text-typography-600">
                            Druhý běh
                        </Heading>
                    </VStack>
                </HStack>
                <VStack space="lg"
                    style={{
                        flex: 1,

                        backgroundColor: "#fff",
                        borderTopRightRadius: 24,
                        borderTopLeftRadius: 24,
                        marginTop: 16,
                        borderWidth: 1,
                        borderColor: "#D4D4D4",
                    }}
                >
                    <ScrollView contentContainerStyle={{ paddingBottom: 300, paddingHorizontal: 24 }}>
                        {formMap[formType]}
                        <Box style={{
                            display: "flex",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            gap: 16,
                        }}>
                            <Text className="text-typography-600">
                                {`${formType === FormType.LOGIN ? "Don't have account?" : "Already have account?"}`}
                            </Text>
                            <Button
                                variant="link"
                                size="xl"
                                onPress={() => {
                                    setFormType(formType === FormType.LOGIN ? FormType.REGISTER : FormType.LOGIN);
                                }}
                            >
                                <ButtonText className="text-typography-600" size="md">{`${formType === FormType.LOGIN ? "Sing up" : "Sing in"}`}</ButtonText>
                            </Button>
                        </Box>
                    </ScrollView>
                </VStack>

            </VStack>
        </TouchableWithoutFeedback>
    )
}

export default UserLoginForm