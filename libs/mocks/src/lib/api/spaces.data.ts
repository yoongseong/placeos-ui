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
    { name: 'Meeting Room Kiji', map_id: 'area-02.09-status_1_', zones: ['bld-01_lvl-01'] },
    { name: 'Meeting Room Kurumi', map_id: 'area-02.05-status', zones: ['bld-01_lvl-01'] },
    { name: 'NTT Innovation CoE', map_id: 'area-02.10-status_1_', zones: ['bld-01_lvl-01'] },
    { name: 'Meeting Room Take', map_id: 'area-02.15-status', zones: ['bld-01_lvl-01'] },
    { name: 'Meeting Room Ume', map_id: 'area-02.37-status', zones: ['bld-01_lvl-01'], bookable: false },
    { name: 'Hot Desk 01', map_id: 'area-02.48-status', zones: ['bld-01_lvl-01'] },
    { name: 'Hot Desk 02', map_id: 'area-02.49-status', zones: ['bld-01_lvl-01'] },
    { name: 'Hot Desk 03', map_id: 'area-02.47-status', zones: ['bld-01_lvl-01'] },
].map(d => generateMockSpace({ ...d, features: randomSpaceFeatures() }));
