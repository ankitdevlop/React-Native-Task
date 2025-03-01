import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native'
import React  from 'react'


function Loader(props) {
    const { loading = false } = props
    return (
        <>
            {loading &&
                <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text style={styles.loadingText}>Loading Products...</Text>
              </View>
            }
        </>
    )
}

export default Loader

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})