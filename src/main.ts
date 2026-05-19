import { sleep } from 'k6';
import { searchSlots } from './slot-search';

export const options = {
    vus: 100,
    duration: '1m',
    thresholds: {
        http_req_duration: ['p(95)<500'],
        http_req_failed: ['rate<0.01'],
    },
};


export default function () {
    searchSlots();

    sleep(1);
}

export function handleSummary(data: any) {
    const result = {
        requests:
            data.metrics.http_reqs.values.count,

        errors_percent:
            data.metrics.http_req_failed.values.rate * 100,

        avg:
            data.metrics.http_req_duration.values.avg,

        p95:
            data.metrics.http_req_duration.values['p(95)'],

        p99:
            data.metrics.http_req_duration.values['p(99)'],

        vus:
            data.metrics.vus_max.values.max,
    };

    return {
        stdout: JSON.stringify(result, null, 2),

        '/results/result.json':
            JSON.stringify(result, null, 2),
    };
}