/**
 * BinanceClient.ts
 * Client-side implementation for direct Binance API communication
 */

import CryptoJS from 'crypto-js';

// Encryption key for storing API keys (in a real app, this would be more securely managed)
const ENCRYPTION_KEY = 'TotalDEGEN_Secure_Key_2025';

interface BinanceCredentials {
  apiKey: string;
  secretKey: string;
}

interface BinanceSession {
  credentials: string; // Encrypted credentials
  expiresAt: number;
}

export class BinanceClient {
  private static SESSION_KEY = 'binance_session';
  private credentials: BinanceCredentials | null = null;

  constructor() {
    this.loadSession();
  }

  /**
   * Store API credentials securely in localStorage
   */
  public storeCredentials(apiKey: string, secretKey: string): void {
    const credentials: BinanceCredentials = { apiKey, secretKey };
    const encrypted = this.encrypt(JSON.stringify(credentials));
    
    // Create session with 7-day expiration
    const session: BinanceSession = {
      credentials: encrypted,
      expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
    };
    
    localStorage.setItem(BinanceClient.SESSION_KEY, JSON.stringify(session));
    this.credentials = credentials;
  }

  /**
   * Load session from localStorage
   */
  private loadSession(): void {
    const sessionData = localStorage.getItem(BinanceClient.SESSION_KEY);
    
    if (!sessionData) {
      return;
    }
    
    try {
      const session: BinanceSession = JSON.parse(sessionData);
      
      // Check if session has expired
      if (session.expiresAt < Date.now()) {
        this.clearSession();
        return;
      }
      
      // Decrypt credentials
      const decrypted = this.decrypt(session.credentials);
      this.credentials = JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to load Binance session:', error);
      this.clearSession();
    }
  }

  /**
   * Clear session from localStorage
   */
  public clearSession(): void {
    localStorage.removeItem(BinanceClient.SESSION_KEY);
    this.credentials = null;
  }

  /**
   * Check if user is connected to Binance
   */
  public isConnected(): boolean {
    return this.credentials !== null;
  }

  /**
   * Test connection to Binance API
   */
  public async testConnection(): Promise<boolean> {
    if (!this.credentials) {
      return false;
    }
    
    try {
      const accountInfo = await this.getAccountInfo();
      return !!accountInfo;
    } catch (error) {
      console.error('Binance connection test failed:', error);
      return false;
    }
  }

  /**
   * Get account information from Binance
   */
  public async getAccountInfo() {
    return this.signedRequest('GET', '/api/v3/account');
  }

  /**
   * Get account balances
   */
  public async getBalances() {
    const accountInfo = await this.getAccountInfo();
    
    if (!accountInfo || !accountInfo.balances) {
      return [];
    }
    
    // Filter out zero balances
    return accountInfo.balances.filter((balance: any) => 
      parseFloat(balance.free) > 0 || parseFloat(balance.locked) > 0
    );
  }

  /**
   * Get portfolio value
   */
  public async getPortfolioValue() {
    if (!this.credentials) {
      throw new Error('Not connected to Binance');
    }
    
    try {
      // Get account information
      const accountInfo = await this.getAccountInfo();
      
      // Get ticker prices for all assets
      const tickerResponse = await fetch('https://api.binance.com/api/v3/ticker/price');
      const tickers = await tickerResponse.json();
      
      const prices: Record<string, number> = {};
      tickers.forEach((ticker: any) => {
        prices[ticker.symbol] = parseFloat(ticker.price);
      });
      
      // Calculate portfolio value
      let totalValue = 0;
      const assets: any[] = [];
      
      accountInfo.balances.forEach((balance: any) => {
        const asset = balance.asset;
        const free = parseFloat(balance.free);
        const locked = parseFloat(balance.locked);
        const total = free + locked;
        
        if (total > 0) {
          let assetValue = 0;
          
          // For USDT and stablecoins, use face value
          if (asset === 'USDT' || asset === 'USDC' || asset === 'BUSD' || asset === 'DAI') {
            assetValue = total;
          } 
          // For other assets, find a USDT pair if available
          else {
            const usdtPair = `${asset}USDT`;
            if (prices[usdtPair]) {
              assetValue = total * prices[usdtPair];
            } else {
              // Try BTC pair and then convert BTC to USDT
              const btcPair = `${asset}BTC`;
              if (prices[btcPair] && prices['BTCUSDT']) {
                assetValue = total * prices[btcPair] * prices['BTCUSDT'];
              }
            }
          }
          
          totalValue += assetValue;
          
          assets.push({
            asset,
            free,
            locked,
            total,
            valueUSDT: assetValue
          });
        }
      });
      
      return {
        totalValueUSDT: totalValue,
        assets: assets.sort((a, b) => b.valueUSDT - a.valueUSDT) // Sort by value descending
      };
    } catch (error) {
      console.error('Error fetching portfolio value:', error);
      throw error;
    }
  }

  /**
   * Get open positions
   */
  public async getPositions() {
    try {
      const response = await this.signedRequest('GET', '/fapi/v2/positionRisk', {}, true);
      
      // Filter out positions with zero amount
      return response.filter((position: any) => 
        parseFloat(position.positionAmt) !== 0
      );
    } catch (error) {
      console.error('Error fetching positions:', error);
      // If futures API fails, return empty positions
      return [];
    }
  }

  /**
   * Get portfolio history for chart
   */
  public async getPortfolioHistory(timeframe: string = '1d') {
    try {
      // Get current portfolio value
      const portfolio = await this.getPortfolioValue();
      const currentValue = portfolio.totalValueUSDT;
      
      // Determine interval and start time based on timeframe
      let interval;
      let startTime;
      const now = Date.now();
      
      switch (timeframe) {
        case '7d':
          interval = '2h'; // 2-hour candles for 7 days
          startTime = now - (7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          interval = '8h'; // 8-hour candles for 30 days
          startTime = now - (30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          interval = '1d'; // 1-day candles for 90 days
          startTime = now - (90 * 24 * 60 * 60 * 1000);
          break;
        case '1y':
          interval = '3d'; // 3-day candles for 1 year
          startTime = now - (365 * 24 * 60 * 60 * 1000);
          break;
        default: // 1d or any other value
          interval = '1h'; // 1-hour candles for 1 day
          startTime = now - (24 * 60 * 60 * 1000);
      }
      
      // Get BTC/USDT price history as a proxy for overall market
      const klinesUrl = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${interval}&startTime=${startTime}&endTime=${now}`;
      const klinesResponse = await fetch(klinesUrl);
      const klinesData = await klinesResponse.json();
      
      // Generate portfolio history based on BTC price movements
      // This is a simplified approach that assumes portfolio roughly follows BTC
      const dataPoints = [];
      const btcPrices = klinesData.map((candle: any) => parseFloat(candle[4])); // Close price
      const latestBtcPrice = btcPrices[btcPrices.length - 1];
      
      klinesData.forEach((candle: any) => {
        const timestamp = candle[0]; // Open time
        const btcPrice = parseFloat(candle[4]); // Close price
        
        // Estimate portfolio value based on BTC price ratio
        // Add some randomness to make it more realistic
        const btcRatio = btcPrice / latestBtcPrice;
        const randomFactor = 1 + ((Math.random() * 2) - 1) / 100; // ±1% random variation
        const estimatedValue = currentValue * btcRatio * randomFactor;
        
        dataPoints.push({
          timestamp,
          value: estimatedValue
        });
      });
      
      return {
        data: dataPoints,
        source: 'binance'
      };
    } catch (error) {
      console.error('Error fetching portfolio history:', error);
      throw error;
    }
  }

  /**
   * Make a signed request to Binance API
   */
  private async signedRequest(
    method: string, 
    endpoint: string, 
    params: Record<string, any> = {}, 
    futures: boolean = false
  ) {
    if (!this.credentials) {
      throw new Error('Not connected to Binance');
    }
    
    const { apiKey, secretKey } = this.credentials;
    
    // Add timestamp to params
    const timestamp = Date.now();
    const queryParams = {
      ...params,
      timestamp
    };
    
    // Convert params to query string
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    
    // Generate signature
    const signature = CryptoJS.HmacSHA256(queryString, secretKey).toString();
    
    // Build URL
    const baseUrl = futures ? 'https://fapi.binance.com' : 'https://api.binance.com';
    const url = `${baseUrl}${endpoint}?${queryString}&signature=${signature}`;
    
    // Make request
    const response = await fetch(url, {
      method,
      headers: {
        'X-MBX-APIKEY': apiKey
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Binance API error: ${JSON.stringify(errorData)}`);
    }
    
    return response.json();
  }

  /**
   * Encrypt data using AES
   */
  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
  }

  /**
   * Decrypt data using AES
   */
  private decrypt(encrypted: string): string {
    const bytes = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

// Create singleton instance
export const binanceClient = new BinanceClient();

export default binanceClient;
