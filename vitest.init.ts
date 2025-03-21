// vitest.init.js
import {vi} from "vitest";
import '@testing-library/jest-dom';

const chromeMock = {
    storage: {
        sync: {
            get: vi.fn(),
            set: vi.fn(),
            clear: vi.fn()
        }
    },
    runtime: {
        openOptionsPage: vi.fn()
    }
}
vi.stubGlobal('chrome', chromeMock);
vi.stubGlobal('__APP_VERSION__', 'test');
