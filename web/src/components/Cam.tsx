// @ts-nocheck

import { CAM_URL } from '../config';

export const Cam = () => (
  <iframe height="480" width="640" title="indoor" src={CAM_URL}></iframe>
);

export default Cam;
