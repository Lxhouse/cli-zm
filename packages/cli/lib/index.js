import createCIL from './createCLI.js';
import initCreate from '@zmcli/init';
import './exception.js';
const Init = () => {
  const program = createCIL();
  initCreate(program);
  program.parse(process.argv);
};

export default Init;
