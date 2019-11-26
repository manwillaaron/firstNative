import React, { Component, Fragment } from 'react';
import { RNCamera } from 'react-native-camera';
import styles from './scanStyle'
import {
    TouchableOpacity,
    Text,
    StatusBar,
    ScrollView,
    View,
    ActivityIndicator
} from 'react-native';


const Scan = (props) => {
    const { camera, cameraResult, clickAgain, takePicture, activeCamera, googleVisionDetetion, loading } = props
    return (
        <View style={styles.scrollViewStyle}>
            <Fragment>
                <StatusBar barStyle="dark-content" />
                {!camera && !cameraResult &&
                    <View style={styles.cardView} >

                        <TouchableOpacity onPress={activeCamera} style={styles.buttonTouchable}>
                            <Text style={styles.buttonTextStyle}>scan</Text>
                        </TouchableOpacity>

                    </View>
                }
                {!googleVisionDetetion && loading &&
                    <View style={styles.SpinnerStyle}>
                        <ActivityIndicator size={props.size || 'large'} />
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Wait i am fetching data....</Text>
                    </View>
                }
                {/* When Google Vision returns response successfully */}
                {googleVisionDetetion &&
                    <Fragment>
                        <Text style={styles.textTitle1}>Result !</Text>

                        <View style={googleVisionDetetion ? styles.scanCardView : styles.cardView} >
                            <ScrollView>

                                {googleVisionDetetion.webDetection.webEntities.map((data, index) => {
                                    return (
                                        <View key={index} style={{ borderWidth: 2, borderColor: 'black', margin: 10 }}>
                                            <Text>entityId : {data.entityId}</Text>
                                            <Text>score : {data.score}</Text>
                                            <Text numberOfLines={1}>description: {data.description}</Text>
                                        </View>

                                    )
                                })
                                }
                            </ScrollView>
                        </View>

                        <TouchableOpacity onPress={clickAgain} style={styles.buttonTouchable}>
                            <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

                {/* React Native camera View */}
                {camera &&
                    <View style={styles.container}>
                        <RNCamera
                            ref={ref => {
                                this.camera = ref;
                            }}
                            style={styles.preview}
                            type={RNCamera.Constants.Type.back}
                            flashMode={RNCamera.Constants.FlashMode.off}
                            iosCameraPermissionOptions={{
                                title: 'Permission to use camera',
                                message: 'We need your permission to use your camera',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            androidRecordAudioPermissionOptions={{
                                title: 'Permission to use audio recording',
                                message: 'We need your permission to use your audio',
                                buttonPositive: 'Ok',
                                buttonNegative: 'Cancel',
                            }}
                            onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                console.log(barcodes);
                            }}
                        />
                        {/* Click here for taking picture  */}
                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => takePicture(this.camera)} style={styles.capture}>
                                <Text style={{ fontSize: 14 }}> SNAP </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            </Fragment>
        </View>

    );

}



export default Scan;