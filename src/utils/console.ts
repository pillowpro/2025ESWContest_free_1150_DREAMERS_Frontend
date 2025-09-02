import { AndroidBridge } from '../services';

// Android 로깅 브리지 인스턴스
let androidBridge: AndroidBridge | null = null;

const initAndroidBridge = () => {
  if (!androidBridge) {
    androidBridge = new AndroidBridge();
  }
  return androidBridge;
};

// 원본 console 메서드들 저장
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

// console.error를 Android 로깅으로 확장
console.error = (...args: any[]) => {
  // 원본 console.error 호출
  originalConsole.error(...args);
  
  // Android 환경에서만 로깅
  if (typeof window !== 'undefined' && window.Android) {
    try {
      const bridge = initAndroidBridge();
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      
      // 스택 트레이스에서 파일명과 라인 정보 추출
      const stack = new Error().stack;
      const stackLine = stack?.split('\n')[2] || '';
      const source = stackLine.includes('http') ? 
        stackLine.split('http')[1]?.split(' ')[0] || '' : '';
      
      bridge.logToConsole('error', message, source);
    } catch (error) {
      originalConsole.error('Failed to log to Android:', error);
    }
  }
};

// console.warn을 Android 로깅으로 확장
console.warn = (...args: any[]) => {
  originalConsole.warn(...args);
  
  if (typeof window !== 'undefined' && window.Android) {
    try {
      const bridge = initAndroidBridge();
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      
      const stack = new Error().stack;
      const stackLine = stack?.split('\n')[2] || '';
      const source = stackLine.includes('http') ? 
        stackLine.split('http')[1]?.split(' ')[0] || '' : '';
      
      bridge.logToConsole('warn', message, source);
    } catch (error) {
      originalConsole.error('Failed to log to Android:', error);
    }
  }
};

// console.info를 Android 로깅으로 확장
console.info = (...args: any[]) => {
  originalConsole.info(...args);
  
  if (typeof window !== 'undefined' && window.Android) {
    try {
      const bridge = initAndroidBridge();
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      
      const stack = new Error().stack;
      const stackLine = stack?.split('\n')[2] || '';
      const source = stackLine.includes('http') ? 
        stackLine.split('http')[1]?.split(' ')[0] || '' : '';
      
      bridge.logToConsole('info', message, source);
    } catch (error) {
      originalConsole.error('Failed to log to Android:', error);
    }
  }
};

// console.debug를 Android 로깅으로 확장 (선택사항)
console.debug = (...args: any[]) => {
  originalConsole.debug(...args);
  
  if (typeof window !== 'undefined' && window.Android) {
    try {
      const bridge = initAndroidBridge();
      const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' ');
      
      const stack = new Error().stack;
      const stackLine = stack?.split('\n')[2] || '';
      const source = stackLine.includes('http') ? 
        stackLine.split('http')[1]?.split(' ')[0] || '' : '';
      
      bridge.logToConsole('debug', message, source);
    } catch (error) {
      originalConsole.error('Failed to log to Android:', error);
    }
  }
};

// 원본 console 메서드들을 복원하는 함수
export const restoreConsole = () => {
  console.log = originalConsole.log;
  console.error = originalConsole.error;
  console.warn = originalConsole.warn;
  console.info = originalConsole.info;
  console.debug = originalConsole.debug;
};

export default {
  restoreConsole,
};