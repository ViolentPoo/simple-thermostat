export interface Setpoint {
    hide?: boolean;
}
export type Setpoints = Record<string, Setpoint>;
export default function parseSetpoints(setpoints: Setpoints | false, attributes: any, entityDomain?: string): {
    percentage?: undefined;
    humidity?: undefined;
    target_temp_low?: undefined;
    target_temp_high?: undefined;
    temperature?: undefined;
} | {
    percentage: any;
    humidity?: undefined;
    target_temp_low?: undefined;
    target_temp_high?: undefined;
    temperature?: undefined;
} | {
    humidity: any;
    percentage?: undefined;
    target_temp_low?: undefined;
    target_temp_high?: undefined;
    temperature?: undefined;
} | {
    target_temp_low: any;
    target_temp_high: any;
    percentage?: undefined;
    humidity?: undefined;
    temperature?: undefined;
} | {
    temperature: any;
    percentage?: undefined;
    humidity?: undefined;
    target_temp_low?: undefined;
    target_temp_high?: undefined;
};
