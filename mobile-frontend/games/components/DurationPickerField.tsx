
import WheelPickerExpo from 'react-native-wheel-picker-expo';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { HStack } from '@/components/ui/hstack';
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent } from '@/components/ui/actionsheet';
import { Box } from '@/components/ui/box';
import { Text } from "@/components/ui/text";
import { Pressable } from '@/components/ui/pressable';
import { Clock4 } from 'lucide-react-native';

export const DurationPickerField = ({ control }: { control: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tempHours, setTempHours] = useState(0);
    const [tempMinutes, setTempMinutes] = useState(0);

    return (
        <Controller
            name="duration"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => {
                const hours = Math.floor((value ?? 0) / 60);
                const minutes = (value ?? 0) % 60;

                const handleHourChange = ({ item }: any) => {
                    setTempHours(item.value);
                    onChange(item.value * 60 + tempMinutes);
                };

                const handleMinuteChange = ({ item }: any) => {
                    setTempMinutes(item.value);
                    onChange(tempHours * 60 + item.value);
                };

                return (
                    <>
                        <Pressable
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                padding: 12,
                                backgroundColor: '#fff',
                                borderRadius: 12,
                                borderWidth: 1,
                                borderColor: '#ccc',
                                height: 48,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                            onPress={() => {
                                setTempHours(hours);
                                setTempMinutes(minutes);
                                setIsOpen(true);
                            }}
                        >
                            <Text size='lg' style={{ color: '#000' }}>
                                {value ? `${hours}:${minutes < 10 ? "0" + minutes : minutes}` : '0:00'}
                            </Text>
                            <Clock4 size={20} color={"#6D6D6D"} />
                        </Pressable>

                        <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
                            <ActionsheetBackdrop />
                            <ActionsheetContent>
                                <Box style={{ height: 3.5, width: 60, backgroundColor: "#929292", borderRadius: 16, marginTop: 4 }} />

                                <HStack space="md" style={{ justifyContent: "center" }}>
                                    <WheelPickerExpo
                                        height={250}
                                        initialSelectedIndex={tempHours}
                                        selectedStyle={{
                                            // backgroundColor: '#E0E0E0',
                                            // borderRadius: 8,
                                        }}
                                        items={Array.from({ length: 24 }, (_, i) => ({
                                            label: `${i} h`,
                                            value: i,
                                        }))}
                                        onChange={handleHourChange}
                                    />
                                    <WheelPickerExpo
                                        height={250}
                                        initialSelectedIndex={Math.floor(tempMinutes / 5)}
                                        selectedStyle={{
                                            // backgroundColor: '#E0E0E0',
                                            // borderRadius: 8,
                                        }}
                                        items={Array.from({ length: 12 }, (_, i) => {
                                            const val = i * 5;
                                            return { label: `${val} min`, value: val };
                                        })}
                                        onChange={handleMinuteChange}
                                    />
                                </HStack>
                            </ActionsheetContent>
                        </Actionsheet>
                    </>
                );
            }}
        />
    );
};
