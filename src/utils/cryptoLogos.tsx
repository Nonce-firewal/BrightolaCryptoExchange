import React from 'react';

// Cryptocurrency logo URLs from reliable CDN sources
export const CRYPTO_LOGOS: Record<string, string> = {
  // Major cryptocurrencies - using CoinGecko assets which are more reliable
  'BTC': 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  'ETH': 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  'USDT': 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
  'SOL': 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
  'BNB': 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
  'ADA': 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
  'MATIC': 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
  'DOGE': 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
  'XRP': 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
  'DOT': 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
  'AVAX': 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
  'LINK': 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
  'UNI': 'https://assets.coingecko.com/coins/images/12504/large/uniswap-uni.png',
  'LTC': 'https://assets.coingecko.com/coins/images/2/large/litecoin.png',
  
  // Meme coins and others
  'SHIB': 'https://assets.coingecko.com/coins/images/11939/large/shiba.png',
  'PEPE': 'https://assets.coingecko.com/coins/images/29850/large/pepe-token.jpeg',
  
  // Additional popular coins
  'TRX': 'https://assets.coingecko.com/coins/images/1094/large/tron-logo.png',
  'ATOM': 'https://assets.coingecko.com/coins/images/1481/large/cosmos_hub.png',
  'FTM': 'https://assets.coingecko.com/coins/images/4001/large/Fantom.png',
  'NEAR': 'https://assets.coingecko.com/coins/images/10365/large/near_icon.png',
  'ALGO': 'https://assets.coingecko.com/coins/images/4380/large/download.png',
  'VET': 'https://assets.coingecko.com/coins/images/1077/large/vechain.png',
  'ICP': 'https://assets.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png',
  'HBAR': 'https://assets.coingecko.com/coins/images/3688/large/hbar.png',
  'APT': 'https://assets.coingecko.com/coins/images/26455/large/aptos_round.png',
  'ARB': 'https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg',
  'OP': 'https://assets.coingecko.com/coins/images/25244/large/Optimism.png',
  'MANA': 'https://assets.coingecko.com/coins/images/878/large/decentraland-mana.png',
  'SAND': 'https://assets.coingecko.com/coins/images/12129/large/sandbox_logo.jpg',
  'CRO': 'https://assets.coingecko.com/coins/images/7310/large/cypto.png',
  'LDO': 'https://assets.coingecko.com/coins/images/13573/large/Lido_DAO.png',
  'MKR': 'https://assets.coingecko.com/coins/images/1364/large/Mark_Maker.png',
  'AAVE': 'https://assets.coingecko.com/coins/images/12645/large/AAVE.png',
  'CRV': 'https://assets.coingecko.com/coins/images/12124/large/Curve.png',
  'COMP': 'https://assets.coingecko.com/coins/images/10775/large/COMP.png',
  'SUSHI': 'https://assets.coingecko.com/coins/images/12271/large/512x512_Logo_no_chop.png',
  '1INCH': 'https://assets.coingecko.com/coins/images/13469/large/1inch-token.png',
  'BAT': 'https://assets.coingecko.com/coins/images/677/large/basic-attention-token.png',
  'ENJ': 'https://assets.coingecko.com/coins/images/1102/large/enjin-coin-logo.png',
  'CHZ': 'https://assets.coingecko.com/coins/images/8834/large/Chiliz.png',
  'THETA': 'https://assets.coingecko.com/coins/images/2538/large/theta-token-logo.png',
  'FIL': 'https://assets.coingecko.com/coins/images/12817/large/filecoin.png',
  'ETC': 'https://assets.coingecko.com/coins/images/453/large/ethereum-classic-logo.png',
  'XLM': 'https://assets.coingecko.com/coins/images/100/large/Stellar_symbol_black_RGB.png',
  'XMR': 'https://assets.coingecko.com/coins/images/69/large/monero_logo.png',
  'EOS': 'https://assets.coingecko.com/coins/images/738/large/eos-eos-logo.png',
  'IOTA': 'https://assets.coingecko.com/coins/images/692/large/IOTA_Swirl.png',
  'NEO': 'https://assets.coingecko.com/coins/images/480/large/NEO_512_512.png',
  'DASH': 'https://assets.coingecko.com/coins/images/19/large/dash-logo.png',
  'ZEC': 'https://assets.coingecko.com/coins/images/486/large/circle-zcash-color.png',
  'QTUM': 'https://assets.coingecko.com/coins/images/684/large/qtum.png',
  'ONT': 'https://assets.coingecko.com/coins/images/3447/large/ONT.png',
  'ZIL': 'https://assets.coingecko.com/coins/images/2687/large/Zilliqa-logo.png',
  'ICX': 'https://assets.coingecko.com/coins/images/1060/large/icon-icx-logo.png',
  'NANO': 'https://assets.coingecko.com/coins/images/756/large/nano-coin-logo.png',
  'DGB': 'https://assets.coingecko.com/coins/images/63/large/digibyte.png',
  'RVN': 'https://assets.coingecko.com/coins/images/3412/large/ravencoin.png',
  'SC': 'https://assets.coingecko.com/coins/images/289/large/siacoin.png',
  'DCR': 'https://assets.coingecko.com/coins/images/329/large/decred.png',
  'LSK': 'https://assets.coingecko.com/coins/images/385/large/Lisk_Symbol_-_Blue.png',
  'STEEM': 'https://assets.coingecko.com/coins/images/399/large/steem.png',
  'WAVES': 'https://assets.coingecko.com/coins/images/425/large/waves.png',
  'STRAX': 'https://assets.coingecko.com/coins/images/12635/large/stratis.png',
  'KMD': 'https://assets.coingecko.com/coins/images/1003/large/komodo.png',
  'ARK': 'https://assets.coingecko.com/coins/images/445/large/ark.png',
  'PIVX': 'https://assets.coingecko.com/coins/images/1169/large/PIVX.png',
  'NXT': 'https://assets.coingecko.com/coins/images/34/large/nxt.png',
  'SYS': 'https://assets.coingecko.com/coins/images/1464/large/syscoin.png',
  'VIA': 'https://assets.coingecko.com/coins/images/1120/large/viacoin.png',
  'XEM': 'https://assets.coingecko.com/coins/images/242/large/NEM_WC_Logo_200px.png',
  'USDC': 'https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
  'TUSD': 'https://assets.coingecko.com/coins/images/3449/large/tusd.png',
  'PAX': 'https://assets.coingecko.com/coins/images/6013/large/Pax_Dollar.png',
  'GUSD': 'https://assets.coingecko.com/coins/images/5992/large/gemini-dollar-gusd.png',
  'BUSD': 'https://assets.coingecko.com/coins/images/9576/large/BUSD.png',
  'DAI': 'https://assets.coingecko.com/coins/images/9956/large/4943.png',
  'RSR': 'https://assets.coingecko.com/coins/images/8365/large/rsr.png',
  'AMPL': 'https://assets.coingecko.com/coins/images/4708/large/Ampleforth.png',
  'UMA': 'https://assets.coingecko.com/coins/images/10951/large/UMA.png',
  'REN': 'https://assets.coingecko.com/coins/images/3139/large/REN.png',
  'LRC': 'https://assets.coingecko.com/coins/images/913/large/LRC.png',
  'KNC': 'https://assets.coingecko.com/coins/images/947/large/kyber-logo.png',
  'ZRX': 'https://assets.coingecko.com/coins/images/863/large/0x.png',
  'MLN': 'https://assets.coingecko.com/coins/images/605/large/melon.png',
  'ANT': 'https://assets.coingecko.com/coins/images/681/large/JelZ58cv_400x400.png',
  'AXS': 'https://assets.coingecko.com/coins/images/13029/large/axie_infinity_logo.png',
  'SLP': 'https://assets.coingecko.com/coins/images/10366/large/SLP.png',
  'ILV': 'https://assets.coingecko.com/coins/images/14468/large/ILV.JPG',
  'GALA': 'https://assets.coingecko.com/coins/images/12493/large/GALA-COINGECKO.png',
  'CHR': 'https://assets.coingecko.com/coins/images/5000/large/Chromia.png',
  'ALICE': 'https://assets.coingecko.com/coins/images/14375/large/alice_logo.jpg',
  'TLM': 'https://assets.coingecko.com/coins/images/14676/large/kY-C4o7RThfWrDQsLdM4hylnpHOcWOccbzAsYIIpWxks.png',
  'WAXP': 'https://assets.coingecko.com/coins/images/1372/large/waxp_logo.png',
  'FLOW': 'https://assets.coingecko.com/coins/images/13446/large/5f6294c0c7a8cda55cb1c936_Flow_Wordmark.png',
  'IMX': 'https://assets.coingecko.com/coins/images/17233/large/immutableX-symbol-BLK-RGB.png',
  'GMT': 'https://assets.coingecko.com/coins/images/25085/large/GMT_icon.png',
  'GST': 'https://assets.coingecko.com/coins/images/25157/large/GST_logo.png',
  'APE': 'https://assets.coingecko.com/coins/images/24383/large/apecoin.jpg',
  'LOOKS': 'https://assets.coingecko.com/coins/images/22173/large/circle-black-256.png',
  'BLUR': 'https://assets.coingecko.com/coins/images/28453/large/blur.png'
};

// Fallback function to get logo URL
export const getCryptoLogo = (symbol: string): string => {
  const logo = CRYPTO_LOGOS[symbol.toUpperCase()];
  if (logo) {
    return logo;
  }
  
  // Fallback to a generic crypto icon for unknown tokens
  return `https://assets.coingecko.com/coins/images/1/large/bitcoin.png`;
};

// Component for crypto logo with fallback
export const CryptoLogo: React.FC<{
  symbol: string;
  size?: number;
  className?: string;
}> = ({ symbol, size = 40, className = '' }) => {
  const [imageError, setImageError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const logoUrl = getCryptoLogo(symbol);
  
  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };
  
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  
  if (imageError) {
    // Fallback to gradient circle with symbol
    return (
      <div 
        className={`bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-white font-bold text-sm">
          {symbol.substring(0, 2)}
        </span>
      </div>
    );
  }
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-700 rounded-full animate-pulse"
          style={{ width: size, height: size }}
        />
      )}
      <img
        src={logoUrl}
        alt={`${symbol} logo`}
        className={`rounded-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ width: size, height: size }}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default CryptoLogo;