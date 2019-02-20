import React from 'react';
import { View, ActivityIndicator } from 'react-native';


const LoadingBox = ({ size }) => {
    return (
        <View style={styles.loadingBarStyle}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    ); 
};

const styles = {
    loadingBarStyle : {
        flex: 1,
        justifyContents: 'center',
        alignItems : 'center'
    }
}

export { LoadingBox };