import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "@/app/hooks";
import { loginUser } from "../api/loginUser";
import { ILoginData } from "../types";

const Login = () => {

    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: any) => {
        dispatch(loginUser({
            attributes: {
                email: data.email,
                password: data.password,
            }
        } as ILoginData));
    };

    const [showPassword, setShowPassword] = React.useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    return (
        <FormControl>
            <VStack space="sm"
                style={{
                    display: "flex",
                    marginTop: 20,
                }}>
                <Heading size="xl" className="text-typography-800">Login</Heading>

                <VStack space="xs">
                    <Text className="text-typography-600">Email</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input size="lg" style={{ backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
                                <InputField
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    type="text"
                                    keyboardType="email-address"
                                    textContentType="emailAddress"
                                    placeholder="example@gmail.com"
                                />
                            </Input>
                        )}
                        name="email"
                    />

                </VStack>
                <VStack space="xs">
                    <Text className="text-typography-600">Password</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input size="lg" style={{ backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
                                <InputField
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    type={showPassword ? "text" : "password"}
                                />
                                <InputSlot style={{ paddingRight: 16 }} onPress={handleState}>
                                    <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                                </InputSlot>
                            </Input>
                        )}
                        name="password"
                    />
                </VStack>
                <Button
                    variant="solid"
                    size="xl"
                    style={{
                        marginTop: 16,
                        height: 52,
                        borderRadius: 12,
                    }}
                    onPress={handleSubmit(onSubmit)}
                >
                    <ButtonText className="text-typography-0">Log in</ButtonText>
                </Button>
                <Box style={{
                    paddingVertical: 12,
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                }}>
                    <Button
                        variant="link"
                        size="xs"
                    >
                        <ButtonText className="text-typography-600" size="sm">Forgotten password?</ButtonText>
                    </Button>
                </Box>
                <Box style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    flexDirection: "row",
                }}>
                    <Divider style={{ width: "42%", backgroundColor: "#4D4D4D" }} />
                    <Box style={{
                        display: "flex",
                        width: "16%",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}>
                        <Text size="xs" style={{ color: "#4D4D4D" }} className="text-typography-600">OR</Text>
                    </Box>
                    <Divider style={{ width: "42%", backgroundColor: "#4D4D4D" }} />
                </Box>
                <Button
                    variant="outline"
                    size="xl"
                    style={{
                        marginTop: 16,
                        borderRadius: 12,
                        height: 48
                    }}
                >
                    <Ionicons name="logo-discord" size={24} color="#4D4D4D" style={{ paddingRight: 4 }} />
                    <ButtonText className="text-typography-600" size="sm">Continue with Discord</ButtonText>
                </Button>
            </VStack>
        </FormControl>
    )
}

export default Login