import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "@/app/hooks";
import { IRegistrationData } from "../types";
import { HStack } from "@/components/ui/hstack";
import { registerUser } from "../api/registerUser";

interface IRegisterProps {
    onRegister: () => void;
}

const Register = ({ onRegister }: IRegisterProps) => {

    const dispatch = useAppDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
        },
    })

    const onSubmit = async (data: any) => {
        if (!isValid) {
            return;
        }
        await dispatch(registerUser({
            attributes: {
                username: data.username,
                firstname: data.firstName,
                lastname: data.lastName,
                email: data.email,
                password: data.password,
            }
        } as IRegistrationData));
        onRegister();
    };

    const [showPassword, setShowPassword] = React.useState(false)
    const handleState = () => {
        setShowPassword((showState) => {
            return !showState
        })
    }

    const passwordValue = watch("password");

    return (
        <FormControl>
            <VStack space="sm"
                style={{
                    display: "flex",
                    marginTop: 20,
                }}>
                <Heading size="xl" className="text-typography-800">Registration</Heading>

                <VStack space="xs">
                    <Text className="text-typography-600">Username*</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input size="lg"
                                isInvalid={!!errors.username}
                                style={{
                                    backgroundColor: "#fff",
                                    borderRadius: 12,
                                    height: 48,
                                }}
                            >
                                <InputField
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    type="text"
                                    keyboardType="default"
                                    placeholder="Larry"
                                />
                            </Input>
                        )}
                        name="username"
                    />

                </VStack>
                <HStack space="md">
                    <VStack space="xs" style={{ flex: 1 }}>
                        <Text className="text-typography-600">First name*</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input isInvalid={!!errors.firstName} size="lg" style={{ backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
                                    <InputField
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        type="text"
                                        keyboardType="default"
                                        placeholder="John"
                                    />
                                </Input>
                            )}
                            name="firstName"
                        />

                    </VStack>
                    <VStack space="xs" style={{ flex: 1 }}>
                        <Text className="text-typography-600">Last name*</Text>
                        <Controller
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input isInvalid={!!errors.lastName} size="lg" style={{ backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
                                    <InputField
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        type="text"
                                        keyboardType="default"
                                        placeholder="Doe"
                                    />
                                </Input>
                            )}
                            name="lastName"
                        />

                    </VStack>
                </HStack>
                <VStack space="xs">
                    <Text className="text-typography-600">Email*</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input isInvalid={!!errors.email} size="lg" style={{ backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
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
                    <Text className="text-typography-600">Password*</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                                message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
                            }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input isInvalid={!!errors.password} size="lg" style={{ backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
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
                <VStack space="xs">
                    <Text className="text-typography-600">Confirm password</Text>
                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            validate: value => value === passwordValue || "Passwords do not match",

                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input isInvalid={!!errors.confirmPassword} size="lg" style={{ backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
                                <InputField
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    type={"password"}
                                />
                            </Input>
                        )}
                        name="confirmPassword"
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
                    <ButtonText className="text-typography-0">Register</ButtonText>
                </Button>
            </VStack>
        </FormControl>
    )
}

export default Register