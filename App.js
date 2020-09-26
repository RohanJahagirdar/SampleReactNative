/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Permissions, { PERMISSIONS, check, request, PermissionStatus, RESULTS, requestMultiple, checkMultiple } from 'react-native-permissions';

const App: () => React$Node = () => {
    
  (async () => {await getPermissions()})();


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

async function getPermissions() {

  let audioRecPermissionStatus: PermissionStatus = RESULTS.GRANTED;
  
  const permissionCamera = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  
  const permissionAudio = PERMISSIONS.ANDROID.RECORD_AUDIO;

  let cameraPermissionStatus = await check(permissionCamera);
  console.log('1. Post check cameraPermissionStatus', cameraPermissionStatus);
  console.log('2. Post check permissionCamera', permissionCamera);

  if (cameraPermissionStatus !=  RESULTS.GRANTED) {
    cameraPermissionStatus = await request(permissionCamera);
  }
  console.log('3. Post request permission cameraPermissionStatus', cameraPermissionStatus);

  if (Platform.OS === 'android') {
    audioRecPermissionStatus = await check(permissionAudio);
    if (audioRecPermissionStatus !== RESULTS.GRANTED) {
      audioRecPermissionStatus = await request(permissionAudio);
      console.log('4. Post request permission audioRecPermissionStatus', audioRecPermissionStatus);
    }
  }

  if (cameraPermissionStatus === RESULTS.GRANTED
    && audioRecPermissionStatus === RESULTS.GRANTED) {
    console.log('5. Audio both granted');
    this.setState({ cameraDisabled: false });
  } else {
    console.log('Nothing is granted. Handle rejection by displaying alert box.');
    Alert.alert(
      'Camera',
      'Go to Settings to enable access to the Camera.',
      [
        {
          text: 'Go Back',
          onPress: () => this.props.navigation?.goBack?.(),
        },
        {
          text: 'Go to settings',
          onPress: () => Permissions.openSettings(),
        },
      ],
      { cancelable: false },
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
