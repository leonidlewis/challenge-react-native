import React, { useEffect, useState } from 'react';
import { View, Text, WebSocket } from 'react-native';

const MarketScreen = () => {
  const [marketData, setMarketData] = useState({});

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:443/ws/bnbusdt');
    ws.onopen = () => {
      ws.send(JSON.stringify({
        method: "SUBSCRIBE",
        params: ["btcusdt@aggTrade"],
        id: 1
      }));
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMarketData(data);
    };

    return () => ws.close();
  }, []);

  return (
    <View>
      <Text>Market Data: {JSON.stringify(marketData)}</Text>
    </View>
  );
};

export default MarketScreen;
