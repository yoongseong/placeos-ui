import { predictableRandomInt } from '@user-interfaces/common';
import { generateMockSpace } from '@user-interfaces/spaces';

const randomSpaceFeatures = () => {
    const f = ['Whiteboard', 'VidConf', 'Projector', 'Views'];
    const numFeatures = predictableRandomInt(f.length + 1);
    const res = [];
    for (let i = 0; i < numFeatures; i++) {
        res.push(f[predictableRandomInt(f.length)]);
    }
    return res.filter((el, i, r) => r.indexOf(el) === i).join(' ');
};

export const MOCK_SPACES = [
    { name: 'Meeting Room Kiji', map_id: 'area-01.39-status', zones: ['zone-01.TRB'] },
    { name: 'Meeting Room Uguisu', map_id: 'area-1.02-status', zones: ['lvl-01'] },
    { name: 'Meeting Room Washi', map_id: 'area-1.03-status', zones: ['lvl-01'] },
    { name: 'Meeting Room Take', map_id: 'area-1.04-status', zones: ['lvl-01'] },
    { name: 'Meeting Room Ume', map_id: 'area-1.05-status', zones: ['lvl-01'], bookable: false },
    { name: 'Meeting Room Kiku', map_id: 'area-1.06-status', zones: ['lvl-01'] },
    { name: 'Meeting Room Yuri', map_id: 'area-1.07-status', zones: ['lvl-01'] },
    { name: 'Meeting Room Ayame', map_id: 'area-1.08-status', zones: ['lvl-01'] },
    { name: 'Meeting Room Suisen', map_id: 'area-1.01-status', zones: ['lvl-01'] },
    { name: 'Meeting Room Hinagiku', map_id: 'area-1.10-status', zones: ['lvl-01'] },
].map(d => generateMockSpace({ ...d, features: randomSpaceFeatures() }));
