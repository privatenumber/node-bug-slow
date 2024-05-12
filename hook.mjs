import { isMainThread } from 'worker_threads';
import module from 'module';

if (isMainThread) {
	module.register(import.meta.url, import.meta.url);
}

export const load = async (
	url,
	context,
	nextLoad,
) => {
	if (url.endsWith('/file.mjs')) {
		return {
			shortCircuit: true,
			format: 'module',
			source: 'import assert from"assert";const startTime=Date.now();console.log("start time:",Date.now()-startTime);try{assert.ok(false)}finally{console.log("end time:",Date.now()-startTime)}',
		};
	}
	return await nextLoad(url, context);
};

