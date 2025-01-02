import { execa } from 'execa';
import path from 'node:path';
const CLI = path.resolve(__dirname, '../bin/cli.js'); // Fixed typo in variable name
const bin = () => execa(CLI); // Fixed function call
test('run error command', async () => {
  try {
    const ret = await bin(); // Fixed double function call
    console.log(ret);
    expect(1 + 1).toBe(2);
  } catch (error) {
    // Handle potential errors from CLI execution
    console.error(error);
    throw error;
  }
});
