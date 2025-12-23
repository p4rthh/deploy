import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

(Symbol as any).dispose ??= Symbol('Symbol.dispose');

export class TemporaryDirectory implements Disposable {
	public readonly path: string;

	constructor(prefix: string = 'metacall-test-') {
		this.path = mkdtempSync(join(tmpdir(), prefix));
	}

	[Symbol.dispose]() {
		try {
			rmSync(this.path, { recursive: true, force: true });
		} catch (err) {
			console.error(`Failed to clean up temp dir ${this.path}:`, err);
		}
	}
}
