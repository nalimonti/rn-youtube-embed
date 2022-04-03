import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Embed from 'rn-youtube-embed';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>
      <Embed
        videoId="NgruXqvWdp4"
        posterUrl="https://img.youtube.com/vi/NgruXqvWdp4/0.jpg"
        playerVars={{

        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
