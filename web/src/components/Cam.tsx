// @ts-nocheck


export const Cam: React.FC<{ options: any }> = ({ options }) => (
  <iframe height="480" width="640" title="indoor" src={options.url}></iframe>
);

export default Cam;
