import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Animated, Platform, Text } from 'react-native';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme/ThemeProvider';


const ConnectionStatusStrip: React.FC = () => {

    const [isOffline, setIsOffline] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const slideAnim = useRef(new Animated.Value(50)).current;
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const insets = useSafeAreaInsets();
    const isMounted = useRef(true);
    const autoHideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
    const { theme } = useTheme();

    const animateSuccess = useCallback(() => {
        // First fade out
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.1,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                ]),
            ]),
        ]).start();
    }, [fadeAnim, scaleAnim]);

    // Handle visibility changes
    useEffect(() => {
        if (isOffline && !isVisible) {
            setShowSuccess(false);
            setIsVisible(true);
        } else if (!isOffline && isVisible) {
            setShowSuccess(true);
            animateSuccess();
            // Auto hide after 3 seconds
            if (autoHideTimer.current) {
                clearTimeout(autoHideTimer.current);
            }
            autoHideTimer.current = setTimeout(() => {
                if (isMounted.current) {
                    setIsVisible(false);
                    setShowSuccess(false);
                }
            }, 3000);
        }
    }, [isOffline, isVisible, animateSuccess]);

    // Handle animation
    useEffect(() => {
        if (!isMounted.current) return;

        Animated.timing(slideAnim, {
            toValue: isVisible ? 0 : 50,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isVisible, slideAnim]);

    // Handle mount state
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
            if (autoHideTimer.current) {
                clearTimeout(autoHideTimer.current);
            }
        };
    }, []);

    // Handle network state
    useEffect(() => {
        const checkNetworkState = (state: NetInfoState) => {
            if (!isMounted.current) return;
            console.log('Network state changed:', state);
            const offline = !state.isConnected || !state.isInternetReachable;
            setIsOffline(offline);
        };

        const setupNetworkListener = async () => {
            try {
                const state = await NetInfo.fetch();
                if (isMounted.current) {
                    console.log('Initial network state:', state);
                    checkNetworkState(state);
                }
            } catch (error) {
                console.error('Error fetching network state:', error);
            }
        };

        setupNetworkListener();
        const unsubscribe = NetInfo.addEventListener(checkNetworkState);

        return () => {
            unsubscribe();
        };
    }, []);



    if (!isVisible) return null;

    const bottomInset = insets?.bottom ?? (Platform.OS === 'ios' ? 34 : 0);

    return (
        <SafeAreaView>
            <View style={[styles.overlay, { paddingBottom: bottomInset }]}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            transform: [
                                { translateY: slideAnim },
                                { scale: scaleAnim }
                            ],
                            opacity: fadeAnim,
                            backgroundColor: showSuccess ? theme.colors.internetStripOn : theme.colors.internetStripOff,
                        },
                    ]}>
                    <View style={styles.content}>
                        <Text style={[styles.text, { color: theme.colors.background }]}>
                            {showSuccess ? 'Internet connection restored' : 'You are offline'}
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        bottom: 5,
        left: 0,
        right: 0,
        zIndex: 999999,
        elevation: 999999,
    },
    container: {
        position: 'relative',
        left: 0,
        right: 0,
        zIndex: 999999,
        elevation: 999999,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
    },
    text: {
        color: '#FFFFFF',
        textAlign: 'center',
    },

});

export default ConnectionStatusStrip; 