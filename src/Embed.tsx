import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import WebView, { WebViewMessageEvent, WebViewProps } from 'react-native-webview';
import { Image, View } from 'react-native';
import { embedHTML, PlayerVars } from './utils';

type Props = {
  webViewProps?: WebViewProps;
  videoId: string;
  posterUrl?: string;
  height?: number;
  width?: number;
  playerVars?: PlayerVars;
}

const Embed = (props: Props) => {
  const ref = useRef<WebView>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded && ref?.current && props.videoId)
      ref?.current?.injectJavaScript(`player.cueVideoById("${props.videoId}")`)
  }, [ props.videoId, loaded ])

  const _onMessage = useCallback(({ nativeEvent }: WebViewMessageEvent) => {
    try {
      const data = JSON.parse(nativeEvent.data);
      const { loaded } = data;
      if (loaded) setLoaded(true);
    } catch (e) {}
  }, [])

  const html = useMemo(
    () => embedHTML(props.videoId, props.playerVars),
    [ props.videoId, props.playerVars ]
  )

  return (
    <View style={[
      { flexDirection: 'row', justifyContent: 'center' },
      props.height && props.width ? {} : { flex: 1 }
    ]}>
      <View style={[
        { position: 'relative' },
        props.height && props.width ? { height: props.height, width: props.width } : { flex: 1 }
      ]}>
        <WebView
          ref={ref}
          javaScriptEnabled={true}
          source={{ html }}
          {...(props.webViewProps || {})}
          style={{ backgroundColor: 'transparent' }}
          onMessage={_onMessage}
        />
        {
          !loaded && props.posterUrl && (
            <Image
              source={{ uri: props.posterUrl }}
              resizeMode="cover"
              style={{ height: '100%', width: '100%', position: 'absolute', flex: 1 }}
            />
          )
        }
      </View>
    </View>
  )
}

export default Embed;
