import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { TiingoData } from '../Types';
import { useDebouncedCallback } from 'use-debounce';

const MarketScreen = () => {
  const [marketData, setMarketData] = useState<TiingoData[]>([]);
  const [bufferedData, setBufferedData] = useState<TiingoData[]>([]);

  const processIncomingData = useCallback((data: TiingoData) => {
    setBufferedData(prevData => [...prevData, data])
  }, []);
  const debouncedUpdate = useDebouncedCallback(() => {
    setMarketData(prevData => [...prevData, ...bufferedData].slice(-100));
    setBufferedData([]);
  }, 1200, {maxWait: 2000});
  
  useEffect(() => {
    const ws = new W3CWebSocket('wss://api.tiingo.com/fx');

    const subscribe = {
      'eventName': 'subscribe',
      'authorization': '8807142e5bf6104744ed479094ab00f2d877f6e5',
      'eventData': {
        'thresholdLevel': 5,
      }
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(subscribe));
    };

    ws.onmessage = (e) => processIncomingData(JSON.parse(e.data as string));

    ws.onerror = (e) => {
      console.error(`WebSocket error: ${e.message}`);
    };

    return () => {
      if (ws.readyState === ws.OPEN) {
        ws.close();
      }
    };
  }, [processIncomingData]);

  useEffect(() => {
    if (bufferedData.length > 0) {
      debouncedUpdate();
    }
  }, [bufferedData, debouncedUpdate]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>
        {marketData.map((item, index) => (
            <View key={index}>
              <Text>{`${item.data[1]} | ${item.data[3]} | ${item.data[4]} | ${item.data[5]}`}</Text>
            </View>)
        )}
      </ScrollView>
    </View>
  );
};

export default MarketScreen;
