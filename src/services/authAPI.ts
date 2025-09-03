import { publicAPI } from './publicAPI';
import { privateAPI } from './privateAPI';

/**
 * Auth API Types
 */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface RegisterResponse {
  success: true;
  message: string;
}

export interface LoginResponse {
  success: true;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface RefreshResponse {
  success: true;
  data: {
    access_token: string;
  };
}

export interface LogoutResponse {
  success: true;
  message: string;
}

export interface DashboardResponse {
  success: boolean;
  data: {
    dashboard: {
      user_id: number;
      sleep_summary: {
        last_night_score: number;
        last_night_duration: number;
        last_night_quality: string;
        week_average: number;
        month_average: number;
        total_sleep_this_week: number;
        sleep_goal_progress: number;
        last_sleep_session: string;
        consistency_score: number;
      };
      device_status: {
        device_id: string;
        device_name: string;
        status: string;
        battery_level: number;
        current_pump_angle: number;
        last_heartbeat: string;
        firmware_version: string;
        wifi_strength: number;
        is_online: boolean;
      };
      recent_alerts: Array<{
        id: number;
        type: string;
        priority: string;
        title: string;
        message: string;
        is_read: boolean;
        created_at: string;
      }>;
      quick_stats: {
        total_nights_tracked: number;
        average_sleep_duration: number;
        best_sleep_score: number;
        total_snore_events: number;
        sleep_efficiency: number;
        consistency_streak: number;
      };
      weekly_progress: {
        current_week: Array<{
          date: string;
          day: string;
          sleep_duration: number;
          sleep_score: number;
          has_data: boolean;
          quality: string;
        }>;
        sleep_goal: number;
        goal_achievement_rate: number;
        weekly_trend: string;
        improvement_from_last: number;
      };
      recommendations: Array<{
        id: number;
        category: string;
        title: string;
        description: string;
        priority: string;
      }>;
      upcoming_alarms: Array<{
        id: number;
        alarm_time: string;
        next_trigger: string;
        label: string;
        is_enabled: boolean;
        smart_wake: boolean;
      }>;
      environment_data: {
        current_temperature: number;
        current_humidity: number;
        air_quality: string;
        noise_level: number;
        light_level: string;
        optimal_for_sleep: boolean;
        recommendations: string[];
      };
      last_updated: string;
    };
    settings: {
      sleep_goal: number;
      week_start_day: number;
      display_units: string;
      show_recommendations: boolean;
      show_alerts: boolean;
      dashboard_layout: string;
      theme: string;
      language: string;
    };
    widgets: Array<{
      widget_id: string;
      type: string;
      title: string;
      position: { row: number; column: number; width: number; height: number };
      is_enabled: boolean;
      last_updated: string;
    }>;
  };
}

/**
 * Auth API Service
 */
export const authAPI = {
  /**
   * 사용자 회원가입
   */
  signup: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await publicAPI.post('/api/v1/auth/signup', data);
    return response.data;
  },

  /**
   * 사용자 로그인
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await publicAPI.post('/api/v1/auth/login', data);
    return response.data;
  },

  /**
   * 토큰 갱신
   */
  refresh: async (): Promise<RefreshResponse> => {
    const response = await privateAPI.post('/api/v1/auth/refresh');
    return response.data;
  },

  /**
   * 로그아웃
   */
  logout: async (): Promise<LogoutResponse> => {
    const response = await privateAPI.post('/api/v1/auth/logout');
    return response.data;
  },

  /**
   * 대시보드 데이터 조회
   */
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await privateAPI.get('/api/v1/dashboard');
    return response.data;
  },

  /**
   * 기기 상태 조회
   */
  getDeviceStatus: async (deviceId: string): Promise<{
    success: boolean;
    data: {
      device_id: string;
      status: string;
      firmware_version: string;
      last_seen: string;
      wifi_rssi: number;
      battery_level: number;
      is_setup_complete: boolean;
    };
  }> => {
    const response = await privateAPI.get(`/api/v1/devices/${deviceId}`);
    return response.data;
  },
};

export default authAPI;