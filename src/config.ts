export const config = {
    baseUrl: __ENV.BASE_URL ?? '',
};

if (!config.baseUrl) {
    throw new Error('BASE_URL is not set');
}